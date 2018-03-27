// ==UserScript==
// @name         Humble Key Restriction
// @description  Display Humble Bundle region restriction infomation on Humble's download page
// @author       Cloud
// @namespace    https://github.com/Cloud-Swift/Humble-Key-Restriction
// @version      0.2.0
// @updateURL    https://github.com/Cloud-Swift/Humble-Key-Restriction/raw/master/HKR.meta.js
// @downloadURL  https://github.com/Cloud-Swift/Humble-Key-Restriction/raw/master/HKR.user.js
// @icon         https://ske.cloudswift.me/favicon.ico
// @include      https://www.humblebundle.com/downloads*
// @grant        GM_xmlhttpRequest
// @run-at       document-end
// ==/UserScript==

/* global GM_xmlhttpRequest */

(function () {
    'use strict';

    var productsInfo = [];

    const getProductsInfo = () => {
        let splitedURL = location.href.split('downloads?key=');
        if (splitedURL.length == 2) {
            let orderID = splitedURL[1];
            let HBapiURL = `https://www.humblebundle.com/api/v1/order/${orderID}?all_tpkds=true`;
            GM_xmlhttpRequest({
                method: 'GET',
                url: HBapiURL,
                onload: (res) => {
                    if (res.status === 200) {
                        if (res.responseText != '') {
                            let productsObject = JSON.parse(res.responseText).tpkd_dict.all_tpks;
                            for (let i = 0; i < productsObject.length; i++) {
                                let product = {};
                                product.human_name = productsObject[i].human_name;
                                product.exclusive_countries = productsObject[i].exclusive_countries;
                                product.disallowed_countries = productsObject[i].disallowed_countries;
                                productsInfo.push(product);
                            }
                            /*Format [{human_name: "XXX", exclusive_countries: Array(), disallowed_countries: Array()},{},{}] */
                            insertHTML();
                        }
                    }
                },
            });
        }
    };

    const insertHTML = () => {

        let nodes = document.getElementsByClassName('key-redeemer');

        for (let i = 0; i < nodes.length; i++) {
            let info = '';
            if (productsInfo[i].exclusive_countries.length > 0) {
                info += `只能在以下地区激活：${productsInfo[i].exclusive_countries};`;
            }
            if (productsInfo[i].disallowed_countries.length > 0) {
                info += `不能在以下地区激活：${productsInfo[i].disallowed_countries}`;
            }
            nodes[i].innerHTML += `<span style='color:red; word-wrap:break-word; overflow:hidden;'>${info}</span>`;
        }
    };

    setTimeout(getProductsInfo, 3000);
})();