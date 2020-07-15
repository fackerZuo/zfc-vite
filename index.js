const Koa = require('koa')
const {serveStaticPlugin} = require('./plugins/servePluginServeStaticPlugin')
const {moduleRewritePlugin} = require('./plugins/servePluginModuleRewirtePlugin')
const {moduleResolvePlugin} = require('./plugins/servePluginModuleResolvePlugin')
const {htmlRewritePlugin} = require('./plugins/servePluginHtmlRewritePlugin')
const {vuePlugin} = require('./plugins/servePluginVue')
function createServer(){
	const app  = new Koa()
	const root = process.cwd()
	const context = {
		app,
		root
	}

	const resolvePlugins = [//插件的集合.洋葱模型

		htmlRewritePlugin,
		moduleRewritePlugin,//解析import，进行重新@modules



		moduleResolvePlugin,
		//2）根据标识了@modules解析模块

		vuePlugin,


		serveStaticPlugin,//1)静态服务插件
	]
	resolvePlugins.forEach(plugin => plugin(context))
	return app
}
module.exports = createServer