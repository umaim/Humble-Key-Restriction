// ==UserScript==
// @name         Humble Key Restriction
// @description  Display Humble Bundle region restriction infomation on Humble's download page
// @author       Cloud
// @namespace    https://github.com/Cloud-Swift/Humble-Key-Restriction
// @supportURL   https://github.com/Cloud-Swift/Humble-Key-Restriction/issues
// @version      1.1.0
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

    // From: https://github.com/clancy-chao/Steam-Bundle-Sites-Extension
    const localization = {
        AD: '安道尔',
        AE: '阿拉伯联合酋长国',
        AF: '阿富汗',
        AG: '安提瓜和巴布达',
        AI: '安圭拉',
        AL: '阿尔巴尼亚',
        AM: '亚美尼亚',
        AO: '安哥拉',
        AQ: '南极洲',
        AR: '阿根廷',
        AS: '美属萨摩亚',
        AT: '奥地利',
        AU: '澳大利亚',
        AW: '阿鲁巴',
        AX: '奥兰群岛',
        AZ: '阿塞拜疆',
        BA: '波斯尼亚和黑塞哥维那',
        BB: '巴巴多斯',
        BD: '孟加拉',
        BE: '比利时',
        BF: '布基纳法索',
        BG: '保加利亚',
        BH: '巴林',
        BI: '布隆迪',
        BJ: '贝宁',
        BL: '圣巴托洛缪岛',
        BM: '百慕大',
        BN: '文莱',
        BO: '玻利维亚',
        BQ: '博奈尔',
        BR: '巴西',
        BS: '巴哈马',
        BT: '不丹',
        BV: '布韦岛',
        BW: '博兹瓦纳',
        BY: '白俄罗斯',
        BZ: '伯利兹',
        CA: '加拿大',
        CC: '科科斯（基林）群岛',
        CD: '刚果（金）',
        CF: '中非共和国',
        CG: '刚果（布）',
        CH: '瑞士',
        CI: '科特迪瓦',
        CK: '库克群岛',
        CL: '智利',
        CM: '喀麦隆',
        CN: '中国',
        CO: '哥伦比亚',
        CR: '哥斯达黎加',
        CS: '塞尔维亚和黑山',
        CU: '古巴',
        CV: '佛得角',
        CW: '库拉索',
        CX: '圣诞岛',
        CY: '塞浦路斯',
        CZ: '捷克',
        DE: '德国',
        DJ: '吉布提',
        DK: '丹麦',
        DM: '多米尼克',
        DO: '多米尼加',
        DZ: '阿尔及利亚',
        EC: '厄瓜多尔',
        EE: '爱沙尼亚',
        EG: '埃及',
        EH: '西撒哈拉',
        ER: '厄立特里亚',
        ES: '西班牙',
        ET: '埃塞俄比亚',
        FI: '芬兰',
        FJ: '斐济',
        FK: '福克兰群岛',
        FM: '密克罗尼西亚',
        FO: '法罗群岛',
        FR: '法国',
        GA: '加蓬',
        GB: '英国',
        GD: '格林纳达',
        GE: '格鲁吉亚',
        GF: '法属圭亚那',
        GG: '根西',
        GH: '加纳',
        GI: '直布罗陀',
        GL: '格陵兰',
        GM: '冈比亚',
        GN: '几内亚',
        GP: '瓜德鲁普',
        GQ: '赤道几内亚',
        GR: '希腊',
        GS: '南乔治亚岛和南桑威奇群岛',
        GT: '危地马拉',
        GU: '关岛',
        GW: '几内亚比绍',
        GY: '圭亚那',
        HK: '香港',
        HM: '赫德岛和麦克唐纳群岛',
        HN: '洪都拉斯',
        HR: '克罗地亚',
        HT: '海地',
        HU: '匈牙利',
        ID: '印尼',
        IE: '爱尔兰',
        IL: '以色列',
        IM: '马恩岛',
        IN: '印度',
        IO: '英属印度洋领地',
        IQ: '伊拉克',
        IR: '伊朗',
        IS: '冰岛',
        IT: '意大利',
        JE: '泽西岛',
        JM: '牙买加',
        JO: '约旦',
        JP: '日本',
        KE: '肯尼亚',
        KG: '吉尔吉斯',
        KH: '柬埔寨',
        KI: '基里巴斯',
        KM: '科摩罗',
        KN: '圣基茨和尼维斯',
        KP: '朝鲜',
        KR: '韩国',
        KW: '科威特',
        KY: '开曼群岛',
        KZ: '哈萨克斯坦',
        LA: '老挝',
        LB: '黎巴嫩',
        LC: '圣卢西亚',
        LI: '列支敦士登',
        LK: '斯里兰卡',
        LR: '利比里亚',
        LS: '莱索托',
        LT: '立陶宛',
        LU: '卢森堡',
        LV: '拉脱维亚',
        LY: '利比亚',
        MA: '摩洛哥',
        MC: '摩纳哥',
        MD: '摩尔多瓦',
        ME: '黑山',
        MF: '法属圣马丁',
        MG: '马达加斯加',
        MH: '马绍尔群岛',
        MK: '马其顿',
        ML: '马里',
        MM: '缅甸',
        MN: '蒙古',
        MO: '澳门',
        MP: '北马里亚纳群岛',
        MQ: '马提尼克',
        MR: '毛里塔尼亚',
        MS: '蒙塞拉特',
        MT: '马耳他',
        MU: '毛里求斯',
        MV: '马尔代夫',
        MW: '马拉维',
        MX: '墨西哥',
        MY: '马来西亚',
        MZ: '莫桑比克',
        NA: '纳米比亚',
        NC: '新喀里多尼亚',
        NE: '尼日尔',
        NF: '诺福克岛',
        NG: '尼日利',
        NI: '尼加拉瓜',
        NL: '荷兰',
        NO: '挪威',
        NP: '尼泊尔',
        NR: '瑙鲁',
        NU: '纽埃',
        NZ: '新西兰',
        OM: '阿曼',
        PA: '巴拿马',
        PE: '秘鲁',
        PF: '法属波利尼西亚a',
        PG: '巴布亚新几内亚',
        PH: '菲律宾',
        PK: '巴基斯坦',
        PL: '波兰',
        PM: '圣皮埃尔和密克隆',
        PN: '皮特凯恩群岛',
        PR: '波多黎各',
        PS: '巴勒斯坦',
        PT: '葡萄牙',
        PW: '帕劳',
        PY: '巴拉圭',
        QA: '卡塔尔',
        RE: '留尼旺島',
        RO: '罗马尼亚',
        RS: '塞尔维亚',
        RU: '俄罗斯',
        RW: '卢旺达',
        SA: '沙特阿拉伯',
        SB: '所罗门群岛',
        SC: '塞舌尔',
        SD: '苏丹',
        SE: '瑞典',
        SG: '新加坡',
        SH: '圣赫勒拿、阿森松与特斯坦达库尼亚',
        SI: '斯洛文尼',
        SJ: '斯瓦尔巴群岛和扬马延岛',
        SK: '斯洛伐克',
        SL: '塞拉利昂',
        SM: '圣马力诺',
        SN: '塞内加尔',
        SO: '索马里',
        SR: '苏里南',
        SS: '南苏丹',
        ST: '圣多美和普林西比',
        SV: '萨尔瓦多',
        SX: '荷属圣马丁',
        SY: '叙利亚',
        SZ: '斯威士兰',
        TC: '特克斯和凯科斯群岛',
        TD: '乍得',
        TF: '法属南部领土',
        TG: '多哥',
        TH: '泰国',
        TJ: '塔吉克斯坦',
        TK: '托克劳',
        TL: '东帝汶',
        TM: '土库曼斯坦',
        TN: '突尼斯',
        TO: '汤加',
        TR: '土耳其',
        TT: '特立尼达和多巴哥',
        TV: '图瓦卢',
        TW: '台湾',
        TZ: '坦桑尼亚',
        UA: '乌克兰',
        UG: '乌干达',
        UM: '美国本土外小岛屿',
        US: '美国',
        UY: '乌拉圭',
        UZ: '乌兹别克斯坦',
        VA: '圣座',
        VC: '圣文森特和格林纳丁斯',
        VE: '委内瑞拉',
        VG: '英属维尔京群岛',
        VI: '美属维尔京群岛',
        VN: '越南',
        VU: '瓦努阿图',
        WF: '瓦利斯和富图纳群岛',
        WS: '萨摩亚',
        XK: '科索沃',
        YE: '也门',
        YT: '马约特',
        ZA: '南非',
        ZM: '赞比亚',
        ZW: '津巴布韦',
    };

    let productsInfo = [];

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
                                product.machine_name = productsObject[i].machine_name;
                                productsInfo.push(product);
                            }
                            /*Format [{human_name: 'XXX', exclusive_countries: Array(), disallowed_countries: Array(), machine_name: 'XXX'},{...},{...},...] */
                            insertHTML();
                        }
                    }
                },
            });
        }
    };

    const insertHTML = () => {
        let nodes = document.getElementsByClassName('key-redeemer');
        let offset = 0;

        for (let i = 0; i < nodes.length && i + offset < productsInfo.length; i++) {
            if (productsInfo[i + offset].human_name === nodes[i].children.item('heading-text').children[0].innerText) {
                nodes[i].innerHTML += `<span>Machine Name: ${productsInfo[i + offset].machine_name}</span><br/>`;
                if (productsInfo[i + offset].exclusive_countries.length === 0 && productsInfo[i + offset].disallowed_countries.length === 0) {
                    nodes[i].innerHTML += '<span style="color: #97B147">无激活限制</span>';
                } else {
                    let restrictionInfo = '';
                    if (productsInfo[i + offset].exclusive_countries.length > 0) {
                        restrictionInfo += `只能在以下地区激活：${translate(productsInfo[i].exclusive_countries)}<br/>`;
                    }
                    if (productsInfo[i + offset].disallowed_countries.length > 0) {
                        restrictionInfo += `不能在以下地区激活：${translate(productsInfo[i].disallowed_countries)}`;
                    }
                    nodes[i].innerHTML += `<span style='color:red; word-wrap:break-word; overflow:hidden;'>${restrictionInfo}</span>`;
                }
            } else {
                offset++;
            }
        }
    };

    const translate = arr => {
        return arr.map(attr => localization[attr]).reduce((a, b) => `${a}，${b}`);
    };

    window.onload = getProductsInfo;
})();