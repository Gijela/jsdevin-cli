const path = require('path')
const fs = require('fs')

const ejs = require('ejs')

// 编译
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)

  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, {data}, {}, (err, result) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      } 
      
      resolve(result)
    })
  })
}

// 确定上一层的文件夹是否存在
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true
  } else {
    if (createDirSync(path.dirname(pathName))) {
      fs.mkdirSync(pathName)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在，如果不存在，创建对应的文件夹
  return fs.promises.writeFile(path, content)
}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}