const moduleReg = /^\/@modules\//
const fs = require('fs').promises
const {resolveVue} = require('./util')
function moduleResolvePlugin({app,root}){
	const vueResolved = resolveVue(root)
	app.use(async (ctx,next) =>{
		if(!moduleReg.test(ctx.path)){
			return next()
		}
		const id = ctx.path.replace(moduleReg,'')
		//应该去当前项目下查找vue对应的真实文件
		ctx.type = 'js'//设置响应类型，响应的结果是JS类型。
		const content = await fs.readFile(vueResolved[id],'utf8')
		ctx.body = content
	})
}
exports.moduleResolvePlugin = moduleResolvePlugin