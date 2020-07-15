#! /usr/bin/env node
//上面一句表示在当前环境下，用node来执行此文件。
//可以运行的脚本

// 需要通过http启动一个模块，vite内部是基于Koa的


//创建服务
const createServer = require('../index')
createServer().listen(4000,() => {
	console.log('server start 4000')
})