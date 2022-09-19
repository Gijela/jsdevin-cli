#!/usr/bin/env node
const program = require('commander')

const helpOptions = require('./lib/core/help')
const createCommends = require('./lib/core/create')

// 查看版本号
program.version(require('./package.json').version)

//  帮助和可选信息
helpOptions()

// 创建其他的指令
createCommends()

program.parse(process.argv)