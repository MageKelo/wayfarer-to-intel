// ==UserScript==
// @name       search-wayspot
// @namespace   http://tampermonkey.net/
// @match           https://intel.ingress.com/intel?ll=*.*&z=18&pll=*,*
// @author kelo
// @updateURL  https://github.com/MageKelo/wayfarer-to-intel/blob/main/search-wayspot.js
// @downloadURL  https://github.com/MageKelo/wayfarer-to-intel/blob/main/search-wayspot.js
// @version     1.0
// @grant       none
// ==/UserScript==

(function() {
    'use strict';

    // 确保地图已加载
    if (!window.map || !L.marker) {
        alert('地图或Leaflet标记功能未加载！');
        return;
    }

    // 从URL中获取经纬度参数
    const params = new URLSearchParams(window.location.search);
    const ll = params.get('ll'); // 获取 'll' 参数，包含纬度和经度
    const latLng = ll ? ll.split(',') : [];
    const lat = parseFloat(latLng[0]); // 纬度
    const lng = parseFloat(latLng[1]); // 经度
    const option = new Object({
            fill: "#F423",
            color: "#F42",
            weight: 1,
            clickable: false 
       });

    if (lat && lng) {
       const poratl = new Object({
           lat: lat,
           lng: lng
       });
        console.log(poratl);
        var c = L.circle( poratl, 20, option ).addTo(map);

        var m = L.marker( poratl ,{ draggable: false, icon: new L.Icon.Default() }).addTo(map).on('dragend', function(e){
            var coords = e.target.getLatLng();
            c.setLatLng( coords );
        });
    }
   
})();
