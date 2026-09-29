import {Command, ux} from '@oclif/core'

export default class Version extends Command {
  static aliases = ['v']
  static description = 'Show CLI version'

  async run(): Promise<void> {
    const {arch, platform, version} = this.config
    const nodeVersion = process.version

    this.log('')
    this.log(ux.colorize('cyan', '  ◆ ') + ux.colorize('bold', 'Vayu UI') + ux.colorize('dim', ` v${version}`))
    this.log(ux.colorize('dim', '    Build React UIs faster'))
    this.log('')
    this.log(ux.colorize('dim', `    platform  ${platform}-${arch}`))
    this.log(ux.colorize('dim', `    node      ${nodeVersion}`))
    this.log('')
  }
}
