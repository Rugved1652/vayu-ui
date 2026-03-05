import fs from "fs-extra";
import path from "path";
import https from "https";
import { createGunzip } from "zlib";
import { execSync } from "child_process";
import { extract as tarExtract } from "tar";
import { type RegistryItem } from "../index.js";


// ============================================================================
// Package Manager Detection
// ============================================================================

export type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

export function detectPackageManager(): PackageManager {
    const cwd = process.cwd();

    if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
    if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
    if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
    return "npm";
}

export function getInstallCommand(pm: PackageManager, packages: string[]): string {
    const pkgs = packages.join(" ");
    const commands: Record<PackageManager, string> = {
        npm: `npm install ${pkgs}`,
        yarn: `yarn add ${pkgs}`,
        pnpm: `pnpm add ${pkgs}`,
        bun: `bun add ${pkgs}`,
    };
    return commands[pm];
}

// ============================================================================
// File Installer
// ============================================================================

export interface InstallResult {
    filePath: string;
    alreadyExists: boolean;
}

export async function fetchFromGitHub(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const request = (currentUrl: string) => {
            https.get(currentUrl, (res) => {
                // Follow redirects (GitHub raw URLs may redirect)
                if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    request(res.headers.location);
                    return;
                }

                if (res.statusCode !== 200) {
                    reject(new Error(`Failed to fetch ${url}: HTTP ${res.statusCode}`));
                    return;
                }

                const chunks: Buffer[] = [];
                res.on("data", (chunk: Buffer) => chunks.push(chunk));
                res.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
                res.on("error", reject);
            }).on("error", reject);
        };
        request(url);
    });
}

export async function installItem(
    item: RegistryItem,
    options: { overwrite?: boolean } = {}
): Promise<InstallResult> {
    const cwd = process.cwd();

    // e.g. /user/their-project/src/hooks/useBatteryStatus.tsx
    const targetDir = path.join(cwd, item.targetPath);
    const targetFile = path.join(targetDir, item.fileName);
    const alreadyExists = fs.existsSync(targetFile);

    // If file exists and overwrite not forced, skip writing
    if (alreadyExists && !options.overwrite) {
        return { filePath: targetFile, alreadyExists: true };
    }

    // Construct GitHub raw URL
    const baseUrl = "https://raw.githubusercontent.com/Rugved1652/vayu-ui-docs/main";
    const sourcePath = item.type === "hook"
        ? `src/hooks/${item.fileName}`
        : `src/components/ui/${item.fileName}`;

    const url = `${baseUrl}/${sourcePath}`;

    try {
        const content = await fetchFromGitHub(url);

        // Ensure target directory exists
        await fs.ensureDir(targetDir);

        // Write the file
        await fs.writeFile(targetFile, content, "utf-8");

        return { filePath: targetFile, alreadyExists: false };
    } catch (error) {
        throw new Error(`Failed to download ${item.fileName} from GitHub.\nURL: ${url}\nError: ${(error as Error).message}`);
    }
}

// ============================================================================
// Dependency Installer
// ============================================================================

export function installDependencies(packages: string[]): void {
    if (packages.length === 0) return;

    const pm = detectPackageManager();
    const command = getInstallCommand(pm, packages);

    execSync(command, { stdio: "inherit", cwd: process.cwd() });
}

// ============================================================================
// GitHub Repo Downloader (tarball)
// ============================================================================

/**
 * Download a GitHub repo as a tarball and extract it into `targetDir`.
 * Uses the GitHub tarball API: GET /repos/{owner}/{repo}/tarball/{ref}
 */
export async function downloadAndExtractRepo(
    repo: string,
    targetDir: string,
    branch = "main"
): Promise<void> {
    const tarballUrl = `https://api.github.com/repos/${repo}/tarball/${branch}`;

    await fs.ensureDir(targetDir);

    return new Promise((resolve, reject) => {
        const request = (url: string) => {
            https.get(
                url,
                {
                    headers: {
                        "User-Agent": "vayu-ui-cli",
                        Accept: "application/vnd.github+json",
                    },
                },
                (res) => {
                    // Follow redirects (GitHub tarball API always redirects)
                    if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                        request(res.headers.location);
                        return;
                    }

                    if (res.statusCode !== 200) {
                        reject(new Error(`GitHub API returned HTTP ${res.statusCode} for ${repo}`));
                        return;
                    }

                    // Pipe: response → gunzip → tar extract
                    const extractStream = tarExtract({
                        cwd: targetDir,
                        strip: 1, // Remove the top-level directory (e.g. "owner-repo-sha/")
                    });

                    res.pipe(createGunzip()).pipe(extractStream);

                    extractStream.on("finish", resolve);
                    extractStream.on("error", reject);
                    res.on("error", reject);
                }
            ).on("error", reject);
        };

        request(tarballUrl);
    });
}