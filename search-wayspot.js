// ==UserScript==
// @name         search-wayspot
// @namespace    http://tampermonkey.net/
// @version      2024-10-07
// @description  try to take over the world!
// @author       Kelo
// @match        https://intel.ingress.com/intel?ll=*.*&z=18&pll=*,*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ingress.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 获取 URL 参数
    const params = new URLSearchParams(window.location.search);
    const ll = params.get('ll'); // 获取 ll 参数
    const latLng = ll ? ll.split(',') : []; // 将经纬度分割为数组
    const lat = latLng[0]; // 纬度
    const lng = latLng[1]; // 经度
    // 查找搜索框
    const addressInput = document.querySelector('#search');

    if (addressInput) {
        // 设置默认值为 "${lat},${lng}"
        addressInput.value = `${lat},${lng}`;

        // 触发输入事件
        const inputEvent = new Event('input', {
            bubbles: true,
            cancelable: true
        });
        addressInput.dispatchEvent(inputEvent); // 触发输入事件

        // 查找表单并提交
        const form = document.querySelector('#geocode');
        if (form) {
            form.dispatchEvent(new Event('submit', { bubbles: true })); // 触发表单提交
        }
    }
})();