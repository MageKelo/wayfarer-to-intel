// ==UserScript==
// @name         to-intel
// @namespace    http://tampermonkey.net/
// @version      2024-10-07
// @description  try to take over the world!
// @author       Kelo
// @match        https://wayfarer.nianticlabs.com/new/review
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nianticlabs.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let originalXhrOpen = XMLHttpRequest.prototype.open;
    let lat;
    let lng;
    let button; // 定义按钮的变量

    // 创建按钮函数
    const createButton = () => {
        button = document.createElement('button');
        button.setAttribute('_ngcontent-jdt-c272', '');
        button.setAttribute('wf-button', '');
        button.className = 'wf-button';
        button.innerText = 'to intel';

        // 按钮点击事件
        button.onclick = function() {
            if (lat !== null && lng !== null) {
                const url = `https://intel.ingress.com/intel?ll=${lat},${lng}&z=18&pll=${lat},${lng}`;
                window.open(url, '_blank'); // 在新窗口打开链接
            } else {
                alert('当前没有可用的经纬度数据，请先刷新页面或访问相关页面。');
            }
        };
    };

    // 观察目标 div 并动态添加和移除按钮
    const observer = new MutationObserver(() => {
        const container = document.querySelector('.action-button-container');
        if (container && !button) { // 确保按钮不存在时才创建
            createButton();
            container.insertBefore(button, container.firstChild);
        } else if (!container && button) {
            // 如果按钮已经存在但容器不存在，则移除按钮
            button.remove();
            button = null; // 清除按钮变量
        }
    });

    // 观察 DOM 的变化
    observer.observe(document.body, { childList: true, subtree: true });

    // 拦截 XMLHttpRequest 请求
    XMLHttpRequest.prototype.open = function(method, url) {
        this.addEventListener('load', function() {
            if (url.includes('/api/v1/vault/review')) {
                const data = JSON.parse(this.responseText);
                if (data.result.lat) {
                    lat = data.result.lat;
                    lng = data.result.lng;
                }
            }
        });
        return originalXhrOpen.apply(this, arguments);
    };
})();
