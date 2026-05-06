import { Command, ux } from '@oclif/core';

export default class Version extends Command {
  static description = 'Show CLI version';

  static aliases = ['v'];

  async run(): Promise<void> {
    const { version, platform, arch } = this.config;
    const nodeVersion = process.version;

    this.log('');
    this.log(ux.colorize('cyan', '  ◆ ') + ux.colorize('bold', 'Vayu UI') + ux.colorize('dim', ` v${version}`));
    this.log(ux.colorize('dim', '    Build React UIs faster'));
    this.log('');
    this.log(ux.colorize('dim', `    platform  ${platform}-${arch}`));
    this.log(ux.colorize('dim', `    node      ${nodeVersion}`));
    this.log('');
  }
}
