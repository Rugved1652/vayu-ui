import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import ora from "ora";
import path from "path";
import fs from "fs-extra";
import { resolveTemplate, templates } from "../registry/templates";
import { downloadAndExtractRepo, installDependencies, detectPackageManager } from "../utils/installer";

// ============================================================================
// `vayu-ui create <template>`
// ============================================================================

export default class Create extends Command {
    static summary = "Create a new project from a Vayu UI template";

    static description = `
Scaffolds a full project from a GitHub template repository.
Downloads the template, extracts it, and installs dependencies.

You can use a registered template name, a GitHub owner/repo slug,
or a full GitHub URL.

Available templates:
${templates.map((t) => `  ${t.slug.padEnd(20)} ${t.description}`).join("\n")}

Examples:
  $ vayu-ui create starter
  $ vayu-ui create dashboard --dir my-dashboard
  $ vayu-ui create Rugved1652/my-custom-template
  $ vayu-ui create landing-page --no-install
`;

    static args = {
        template: Args.string({
            name: "template",
            required: true,
            description: "Template name, GitHub owner/repo, or GitHub URL",
        }),
    };

    static flags = {
        dir: Flags.string({
            char: "d",
            description: "Custom directory name (default: template name)",
        }),
        "no-install": Flags.boolean({
            description: "Skip dependency installation after scaffolding",
            default: false,
        }),
        branch: Flags.string({
            char: "b",
            description: "Git branch to use (default: main)",
        }),
    };

    async run(): Promise<void> {
        const { args, flags } = await this.parse(Create);
        const templateInput = args.template;

        // ── 1. Resolve the template ─────────────────────────────────────────
        const resolved = resolveTemplate(templateInput);

        if (!resolved) {
            this.log("");
            this.log(chalk.red(`✖ Could not resolve template "${templateInput}".`));
            this.log("");
            this.log(chalk.dim("  Accepted formats:"));
            this.log(chalk.dim("    • Registered name:  ") + chalk.white("vayu-ui create starter"));
            this.log(chalk.dim("    • GitHub slug:      ") + chalk.white("vayu-ui create owner/repo"));
            this.log(chalk.dim("    • GitHub URL:       ") + chalk.white("vayu-ui create https://github.com/owner/repo"));
            this.log("");
            this.log(chalk.dim("  Available templates:"));
            for (const t of templates) {
                this.log(`    ${chalk.cyan(t.slug.padEnd(20))} ${chalk.dim(t.description)}`);
            }
            this.log("");
            this.exit(1);
        }

        const branch = flags.branch || resolved.branch;
        const dirName = flags.dir || resolved.name;
        const targetDir = path.resolve(process.cwd(), dirName);

        // ── 2. Check if directory already exists ────────────────────────────
        if (fs.existsSync(targetDir)) {
            this.log("");
            this.log(chalk.red(`✖ Directory "${dirName}" already exists.`));
            this.log(chalk.dim("  Choose a different name with --dir or remove the existing directory."));
            this.log("");
            this.exit(1);
        }

        // ── 3. Download and extract template ────────────────────────────────
        this.log("");
        this.log(chalk.bold(`Creating ${chalk.cyan(resolved.name)} in ${chalk.dim(dirName)}/`));
        this.log(chalk.dim(`  From: github.com/${resolved.repo} (${branch})`));
        this.log("");

        const downloadSpinner = ora({
            text: `Downloading template from ${chalk.cyan(resolved.repo)}...`,
            color: "cyan",
        }).start();

        try {
            await downloadAndExtractRepo(resolved.repo, targetDir, branch);
            downloadSpinner.succeed(chalk.green("Template downloaded and extracted"));
        } catch (error) {
            downloadSpinner.fail(chalk.red("Failed to download template"));
            this.log("");
            this.log(chalk.dim(`  Error: ${(error as Error).message}`));
            this.log(chalk.dim(`  Make sure the repo exists: https://github.com/${resolved.repo}`));
            this.log("");
            this.exit(1);
        }

        // ── 4. Install dependencies ─────────────────────────────────────────
        if (!flags["no-install"]) {
            const pkgJsonPath = path.join(targetDir, "package.json");
            if (fs.existsSync(pkgJsonPath)) {
                const pm = detectPackageManager();
                const installSpinner = ora({
                    text: `Installing dependencies via ${chalk.bold(pm)}...`,
                    color: "cyan",
                }).start();

                try {
                    const { execSync } = await import("child_process");
                    const installCmd = pm === "yarn" ? "yarn" : `${pm} install`;
                    execSync(installCmd, { stdio: "pipe", cwd: targetDir });
                    installSpinner.succeed(chalk.green("Dependencies installed"));
                } catch {
                    installSpinner.fail(chalk.yellow("Failed to install dependencies"));
                    this.log(chalk.dim(`  Run ${chalk.white(`cd ${dirName} && ${detectPackageManager()} install`)} manually`));
                }
            }
        } else {
            this.log(chalk.dim("  Skipping dependency installation (--no-install)"));
        }

        // ── 5. Done ─────────────────────────────────────────────────────────
        this.log("");
        this.log(chalk.bold.green("✓ Project created!"));
        this.log("");
        this.log(chalk.dim("  Get started:"));
        this.log(chalk.white(`    cd ${dirName}`));
        if (flags["no-install"]) {
            this.log(chalk.white(`    ${detectPackageManager()} install`));
        }
        this.log(chalk.white(`    ${detectPackageManager()} run dev`));
        this.log("");
    }
}
