# jsdevin-cli 脚手架工具

## 创建项目指令
开发思路如下：
1. 创建解析create指令
2. 通过download-git-repo从代码仓库中下载模板
3. 进入目录，并且执行 `npm install`命令
4. 执行 `npm run serve`命令
5. 打开浏览器

## 创建添加组件-页面-vuex命令
开发思路如下：
1. 创建addcpn、addpage、addstore的命令
2. 准备好对应的ejs模块（`component.vue.ejs`, `vue-router.js.ejs`, `vue-store.js.ejs`, `vue-types.js.ejs`） 
3. 封装编译ejs模块的函数
4. 封装将编译后的内容，写入文件的函数
5. 将上面封装的所有代码放到一起的函数
