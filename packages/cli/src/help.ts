import { Help, ux } from '@oclif/core';

export default class VayuHelp extends Help {
  protected async showRootHelp(): Promise<void> {
    const { bin } = this.config;

    this.log('');
    this.log(ux.colorize('cyan', '  ◆ ') + ux.colorize('bold', 'Vayu UI CLI') + ux.colorize('dim', ` v${this.config.version}`));
    this.log(ux.colorize('dim', '    Build React UIs faster'));
    this.log('');
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));

    this.log('');
    this.log(ux.colorize('bold', '  Usage'));
    this.log(`    ${ux.colorize('dim', '$')} ${ux.colorize('bold', `${bin} <command>`)} ${ux.colorize('dim', '[options]')}`);
    this.log('');

    this.log(ux.colorize('bold', '  Commands'));
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));

    const commands: Array<{ desc: string; example: string; name: string }> = [
      {
        desc: 'Set up Vayu UI in an existing project',
        example: `${bin} init`,
        name: 'init',
      },
      {
        desc: 'Create a new React project with Vayu UI pre-configured',
        example: `${bin} create`,
        name: 'create',
      },
      {
        desc: 'Add components or hooks to your project',
        example: `${bin} add button modal`,
        name: 'add',
      },
      {
        desc: 'Remove components or hooks',
        example: `${bin} remove button`,
        name: 'remove',
      },
      {
        desc: 'Update components or hooks to the latest version',
        example: `${bin} update button`,
        name: 'update',
      },
      {
        desc: 'Browse available components and hooks',
        example: `${bin} list --type component`,
        name: 'list',
      },
      {
        desc: 'Connect to your AI coding tool',
        example: `${bin} install-mcp --tool claude`,
        name: 'install-mcp',
      },
    ];

    for (const cmd of commands) {
      this.log(`    ${ux.colorize('cyan', cmd.name.padEnd(14))} ${ux.colorize('dim', cmd.desc)}`);
    }

    this.log('');
    this.log(ux.colorize('bold', '  Options'));
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));
    this.log(`    ${ux.colorize('yellow', '-h, --help')}      Show help`);
    this.log(`    ${ux.colorize('yellow', '-v, --version')}   Show version`);
    this.log('');
    this.log(ux.colorize('dim', `  Run ${ux.colorize('bold', `${bin} <command> --help`)} for details on a command.`));
    this.log('');
  }

  public async showCommandHelp(command: any): Promise<void> {
    const { bin } = this.config;
    const name = command.id || command.name;

    this.log('');
    this.log(`  ${ux.colorize('cyan', '◆ ')}${ux.colorize('bold', name)}`);
    this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));
    this.log('');

    if (command.summary || command.description) {
      this.log(`  ${command.summary || command.description}`);
      this.log('');
    }

    this.log(ux.colorize('bold', '  Usage'));
    this.log(`    ${ux.colorize('dim', '$')} ${(command.usage || `${bin} ${name}`).replace(/^\$\s*/, '')}`);
    this.log('');

    if (command.args && Object.keys(command.args).length > 0) {
      this.log(ux.colorize('bold', '  Arguments'));
      this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));
      this.log('');

      for (const [, arg] of Object.entries(command.args as Record<string, any>)) {
        const required = arg.required ? ux.colorize('red', ' (required)') : '';
        this.log(`    ${ux.colorize('yellow', arg.name)}${required}`);
        this.log(`      ${ux.colorize('dim', arg.description || '')}`);
      }
      this.log('');
    }

    if (command.flags && Object.keys(command.flags).length > 0) {
      this.log(ux.colorize('bold', '  Options'));
      this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));
      this.log('');

      for (const [, flag] of Object.entries(command.flags as Record<string, any>)) {
        const short = flag.char ? `-${flag.char}, ` : '    ';
        const label = `${short}--${flag.name}`;
        const defaultLabel = flag.default !== undefined && flag.default !== false
          ? ux.colorize('dim', ` (default: ${flag.default})`)
          : '';
        this.log(`    ${ux.colorize('yellow', label)}${defaultLabel}`);
        if (flag.description) {
          this.log(`      ${ux.colorize('dim', flag.description)}`);
        }
      }
      this.log('');
    }

    if (command.examples && command.examples.length > 0) {
      this.log(ux.colorize('bold', '  Examples'));
      this.log(ux.colorize('dim', '  ─────────────────────────────────────────────────'));
      this.log('');

      for (const example of command.examples) {
        const resolved = typeof example === 'string'
          ? example.replace(/<%= config\.bin %>/g, bin).replace(/^\$\s*/, '')
          : example.description || '';
        this.log(`    ${ux.colorize('dim', '$')} ${ux.colorize('bold', resolved)}`);
      }
      this.log('');
    }
  }
}
