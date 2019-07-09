const Generator = require('yeoman-generator')
const camelCase = require('lodash.camelcase')
const kebabCase = require('lodash.kebabcase')

module.exports = class extends Generator {
  writing() {
    // Get project folder name
    const projectName = this.destinationRoot().split('/').pop()
    const projectNameCamel = camelCase(projectName)
    const projectNameKebab = kebabCase(projectName)
    const className = projectNameCamel.charAt(0).toUpperCase() + projectNameCamel.slice(1)

    // File list
    const files = [
      '.gitignore',
      'jest.config.js',
      'package.json',
      'tsconfig.json',
      'tslint.json',
    ]

    // Copy files
    files.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          projectName,
          projectNameCamel,
          projectNameKebab,
          className,
        }
      )
    })

    // Script files
    this.fs.copyTpl(
      this.templatePath('src/module.ts'),
      this.destinationPath(`src/${projectNameKebab}.ts`),
      {
        projectName,
        projectNameCamel,
        projectNameKebab,
        className,
      }
    )
    this.fs.copyTpl(
      this.templatePath('src/module.test.ts'),
      this.destinationPath(`src/${projectNameKebab}.test.ts`),
      {
        projectName,
        projectNameCamel,
        projectNameKebab,
        className,
      }
    )
  }

  install() {
    this.yarnInstall([
      '@types/jest',
      'jest',
      'ts-jest',
      'typescript',
    ], { 'save-dev': true })
  }
}
