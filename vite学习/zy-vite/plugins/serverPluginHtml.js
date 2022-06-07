/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2022-06-07 17:25:40
 * @LastEditors: 张泽雨
 * @LastEditTime: 2022-06-07 20:05:37
 * @FilePath: \my-study\vite学习\zy-vite\plugins\serverPluginHtml.js
 */

const { readBody } = require("./utils");
function htmlRewritePlugin({ root, app }) {
	const inject = `
	<script src="">
	 window.process = {}
	 process.env = {NODE_ENV:'development'}
	</script>
	`
}

exports.htmlRewritePlugin = htmlRewritePlugin;
