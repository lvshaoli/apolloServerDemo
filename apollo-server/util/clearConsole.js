
const {
  chalk,
  clearConsole
} = require('@vue/cli-shared-utils')

exports.generateTitle = async function (checkUpdate) {
  let title = chalk.bold.blue(`Vue CLI`)

  if (process.env.VUE_CLI_TEST) {
    title += ' ' + chalk.blue.bold('TEST')
  }
  if (process.env.VUE_CLI_DEBUG) {
    title += ' ' + chalk.magenta.bold('DEBUG')
  }


  if (checkUpdate) {


      title += `\nlog\n`
  }

  return title
}

exports.clearConsole = async function clearConsoleWithTitle (checkUpdate) {
  const title = await exports.generateTitle(checkUpdate)
  clearConsole(title)
}
