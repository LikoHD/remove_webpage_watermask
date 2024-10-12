// ==UserScript==
// @name              移除飞书网页水印 | Remove watermarks of lark
// @name:zh-CN        移除飞书网页水印
// @name:en           Remove watermarks of lark
// @description       移除飞书文档、工作台、在线学习平台、数据平台、Libra 平台、Meego 平台水印
// @description:zh-CN 移除飞书文档、工作台、在线学习平台、数据平台、Libra 平台、Meego 平台水印
// @description:en    Remove watermarks from Lark documents, workspace, e-learning platform, data platform, Libra platform, and Meego platform.
// @version           0.7.5
// @license           The Unlicense
// @author            lbb00
// @homepage          https://github.com/lbb00/remove-feishu-watermark
// @match             https://*.feishu.cn/*
// @match             https://bytedance.larkoffice.com/*
// @match             https://btm.bytedance.net/*
// @match             https://*.larksuite.com/*
// @match             https://data.bytedance.net/*
// @match             https://*.bytedance.net/*
// @match             https://elearning.larkoffice.com/*
// @match             https://libra-sg.tiktok-row.net/*
// @match             https://meego.larkoffice.com/*
// @run-at            document-start
// @grant             GM_addStyle
// @namespace https://greasyfork.org/users/793340
// @downloadURL https://update.greasyfork.org/scripts/459967/%E7%A7%BB%E9%99%A4%E9%A3%9E%E4%B9%A6%E7%BD%91%E9%A1%B5%E6%B0%B4%E5%8D%B0%20%7C%20Remove%20watermarks%20of%20lark.user.js
// @updateURL https://update.greasyfork.org/scripts/459967/%E7%A7%BB%E9%99%A4%E9%A3%9E%E4%B9%A6%E7%BD%91%E9%A1%B5%E6%B0%B4%E5%8D%B0%20%7C%20Remove%20watermarks%20of%20lark.meta.js
// ==/UserScript==

// GM_addStyle has removed from Greasemonkey v4.0
// https://groups.google.com/g/greasemonkey-users/c/KW71DL6Yjng
if (typeof GM_addStyle === 'undefined') {
    this.GM_addStyle = (aCss) => {
      'use strict'
      const head = document.getElementsByTagName('head')[0]
      if (head) {
        const style = document.createElement('style')
        style.setAttribute('type', 'text/css')
        style.textContent = aCss
        head.appendChild(style)
        return style
      }
      return null
    }
  }
  
  const bgImageNone = '{background-image: none !important;}'
  function genStyle(selector) {
    return `${selector}${bgImageNone}`
  }
  
  // global
  // GM_addStyle(genStyle('[class*="watermark"]'))
  // GM_addStyle(genStyle('[style*="pointer-events: none"]'))
  
  // 飞书文档
  GM_addStyle(genStyle('.ssrWaterMark'))
  GM_addStyle(genStyle('body>div>div>div>div[style*="position: fixed"]:not(:has(*))'))
  // firefox not support :has()
  GM_addStyle(genStyle('[class*="TIAWBFTROSIDWYKTTIAW"]'))
  
  // fixed for https://github.com/lbb00/remove-feishu-watermark/issues/3
  GM_addStyle(genStyle('body>div[style*="position: fixed"]:not(:has(*))')) // for readonly
  
  // 工作台
  GM_addStyle(genStyle('#watermark-cache-container'))
  GM_addStyle(genStyle('body>div[style*="inset: 0px;"]:not(:has(*))'))
  
  // Web 聊天
  GM_addStyle(genStyle('.chatMessages>div[style*="inset: 0px;"]'))

  // 在线学习平台
  GM_addStyle(genStyle('#watermark'))
  GM_addStyle(genStyle('div[style*="pointer-events:none"][style*="position:fixed"][style*="overflow:hidden"][style*="z-index:9999"]'))

  // 数据平台 (https://data.bytedance.net/)
  GM_addStyle(genStyle('#watermark'))
  GM_addStyle(genStyle('style[id="#watermark"]'))
  GM_addStyle('style[id="#watermark"] { display: none !important; }')

  // Libra 平台 (https://libra-sg.tiktok-row.net/)
  GM_addStyle(genStyle('#dpWmColor'))
  GM_addStyle(`
    #dpWmColor {
      opacity: 0 !important;
      display: none !important;
      background: none !important;
    }
  `)

  // M 平台
  GM_addStyle(genStyle('.brightWatermark'))
  GM_addStyle(`
    .brightWatermark {
      background-image: none !important;
    }
  `)
  GM_addStyle('style[id=".brightWatermark"] { display: none !important; }')
