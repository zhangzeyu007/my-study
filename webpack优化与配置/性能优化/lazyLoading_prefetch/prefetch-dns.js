/*
 * @Description:
 * @Author: 张泽雨
 * @Date: 2024-03-11 13:13:22
 * @LastEditors: 张泽雨
 * @LastEditTime: 2024-03-11 13:13:31
 * @FilePath: \my-study\webpack优化与配置\性能优化\lazyLoading_prefetch\prefetch-dns.js
 */
const DEFAULT_PREFETCH_KEYS = ["dns-prefetch"];

class PrefetchDNS {
  constructor(options) {
    this.options = Object.assign({}, options);
    this.prefetchKeys = this.options.prefetchKeys || DEFAULT_PREFETCH_KEYS;
    this.domains = this.options.domains || [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("PrefetchDNS", (compilation) => {
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tap(
        "PrefetchDNS",
        (htmlPluginData) => {
          const prefetchLinks = this.generatePrefetchLinks();
          htmlPluginData.html = htmlPluginData.html.replace(
            /(<\/head>)/i,
            `${prefetchLinks}$1`
          );
        }
      );
    });
  }

  generatePrefetchLinks() {
    return this.domains.reduce((links, domain) => {
      return (
        links +
        this.prefetchKeys
          .map((key) => `<link rel="${key}" href="${domain}" crossorigin>`)
          .join("")
      );
    }, "");
  }
}

module.exports = PrefetchDNS;
