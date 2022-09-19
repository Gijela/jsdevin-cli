const { promisify } = require('util')
const path = require('path')

const download = promisify(require('download-git-repo'))
const open = require('open')

const { vueRepo } = require('../config/repo-config')
const { commandSpawn } = require('../utils/terminal')
const { compile, writeToFile, createDirSync } = require('../utils/utils')

const createProjectAction = async (project) => {
  console.log('create project');
  // 1. clone项目
  await download(vueRepo, project, { clone: true })

  // 2. 执行npm install
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], {cwd: `./${project}`})

  // 3. 运行npm run serve
  commandSpawn(command, ['run', 'serve'], {cwd: `./${project}`})

  // 4. 打开浏览器
  open('http://localhost:8080/')

}

// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.编译ejs模板 result. 前提：有对应的ejs模块 /template/模板, 
  const result = await compile('vue-component.ejs', {name, lowerName: name.toLowerCase()})
  console.log(result);

  // 2.将result写入.vue文件中
  const targetPath = path.resolve(dest, `${name}.vue`)
   writeToFile(targetPath, result)
}

//  添加组件和路由
const addPageAndRoute = async (name, dest) => {
  // 1.编译ejs模板
  const data = {name, lowerName: name.toLowerCase()}
  const pageResult = await compile('vue-component.ejs', data)
  const routeResult = await compile('vue-router.ejs', data)

  // 2.写入文件
  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.vue`)
    const targetRoutePath = path.resolve(dest, 'router.js')
    writeToFile(targetPagePath, pageResult)
    writeToFile(targetRoutePath, routeResult)
  }
}


const addStoreAction = async (name, dest) => {
  // 1.遍历的过程
  const storeResult = await compile('vue-store.ejs', {})
  const typesResult = await compile('vue-types.ejs', {})

  // 2.写入文件
  if (createDirSync(dest)) {
    const targetPagePath = path.resolve(dest, `${name}.vue`)
    const targetStorePath = path.resolve(dest, 'types.js')
    writeToFile(targetPagePath, storeResult)
    writeToFile(targetStorePath, typesResult)
  }
}

module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRoute,
  addStoreAction
}