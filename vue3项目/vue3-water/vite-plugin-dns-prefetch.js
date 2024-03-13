/*
 * @Descripti
 * @Author: 张泽雨
 * @Date: 2024-03-11 13:35:57
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 18:44:50
 * @FilePath: \vue3-warter\vite-plugin-dns-prefetch.js
 */
import fs from 'fs'
import { parse } from 'node-html-parser'

function dnsPrefetchPlugin() {
  return {
    name: 'vite-plugin-dns-prefetch',
    closeBundle: {
      order: 'post',
      handler() {
        const indexHtmlPath = 'dist/index.html'
        const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8')
        const root = parse(indexHtml)

        // 找到所有 <a> 和 <link> 标签,获取其 href 属性值
        const links = root.querySelectorAll('a[href], link[href]')
        const linkList = [...links].map((link) => link.getAttribute('href'))

        // 过滤掉相对路径和 data URI
        const externalLinks = linkList.filter((link) => {
          return link.startsWith('http://') || link.startsWith('https://')
        })

        // 为每个外部链接添加 dns-prefetch 标签
        const prefetchLinks = externalLinks.map((link) => {
          return `<link rel="dns-prefetch" href="${link}" crossorigin>`
        })

        // 将 prefetch 标签插入到 <head> 标签内
        const head = root.querySelector('head')
        prefetchLinks.forEach((link) => {
          head.insertAdjacentHTML('beforeend', link)
        })

        // 将修改后的 HTML 写回文件
        fs.writeFileSync(indexHtmlPath, root.toString())
      }
    }
  }
}

export default dnsPrefetchPlugin
