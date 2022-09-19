const program = require('commander')
const {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
} = require('./actions')

const createCommends = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction)

  program
    .command('addcpn <name>')
    .description('add vue component, 例如： why addcpn HelloWorld -d src/components')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })

  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRoute(page, program.dest || `src/pages/${page.toLowerCase()}`)
    })

  program
    .command('addstore <name>')
    .description('add vue page and router config, 例如: why addpage Home [-d src/pages]')
    .action(name => {
      addStoreAction(name, program.dest || `src/store/modules/${name.toLowerCase()}`)
    })
}

module.exports = createCommends