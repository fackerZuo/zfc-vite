const { readBody } = require('./util.js')
const { parse } = require('es-module-lexer')
const MagicString = require('magic-string')
function rewriteImports(source) {
	let imports = parse(source)[0]//静态的再第一数组，动态的在第二个数组里

	/**
	 * import xxx from 'xxx'静态
	 * import()动态
	 */
	let magicString = new MagicString(source)
	if (imports.length) {
		for (let i = 0; i < imports.length; i++) {
			let { s, e } = imports[i]
			let id = source.substring(s, e)
			if (/^[^\/\.]/.test(id)) {
				id = `/@modules/${id}`//标识模块
				magicString.overwrite(s, e, id)
			}
		}
	}
	return magicString.toString()//替换后的结果返回。
}
function moduleRewritePlugin({ app, root }) {
	app.use(async (ctx, next) => {
		await next()
		if (ctx.body && ctx.response.is('js')) {
			let content = await readBody(ctx.body)
			const result = rewriteImports(content)
			ctx.body = result//将重写的内容响应到body上面
		}

	})
}
exports.moduleRewritePlugin = moduleRewritePlugin