const { readBody } = require("./util")
function htmlRewritePlugin({app,root}){
	const inject = `
		<script>
			window.process = {}
			process.env = {
				NODE_ENV:'development'
			}
		</script>
	`
	app.use(async (ctx,next) =>{
		await next()
		if(ctx.response.is('html')){
			const html =await readBody(ctx.body)
			ctx.body = html.replace(/<head>/,`$&${inject}`)
		}
	})
}
exports.htmlRewritePlugin = htmlRewritePlugin