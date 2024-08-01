// 引入依赖
const fs = require('fs');
const path = require('path');

const pkg = require("./package.json");
const config = require("./lib/config")(hexo);
const copyFile = require("./lib/utils").copyFile.bind(hexo);
const { personalityTypes } = require('./js/data');


let cssHref = `/css/${pkg.name}.css`;
let jsSrc = `/js/${pkg.name}.js`;
let dataJsSrc = `/js/${pkg.name}-data.js`
if (config.cdn) {
    cssHref = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/css/index.css`;
    jsSrc = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/index.js`;
    dataJsSrc = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/data.js`;
} else {
    copyFile(`${pkg.name}-css`, cssHref, path.join(__dirname, "./css/index.css"));
    copyFile(`${pkg.name}-js`, jsSrc, path.join(__dirname, "./js/script.js"));
    copyFile(`${pkg.name}-data-js`, dataJsSrc, path.join(__dirname, "./js/data.js"));
}

const linkTag = `<link href="${cssHref}" rel="stylesheet"/>`;
const scriptTag = `<script src="${jsSrc}"></script>`;
const dataScriptTag = `<script src="${dataJsSrc}"></script>`;


/**
 * 插入 html 页面
 * @param {string} layout
 */
function insertToHtml(layout) {
    console.log('insertToHtml layout: ', layout);
    hexo.extend.generator.register("mbti-card", function(locals) {
        console.log('insertToHtml option: ', config);

        const mbtiContainer = `<div class="mbti-card" id="mbti-container" style="width: 600px;margin: 0 auto"></div>`

        const script = `
        <script>
            console.log('personalityTypes: ', ${JSON.stringify(personalityTypes)})
            initializeMBTI(${JSON.stringify(config)});
        </script>
        `;
        const mbtiContent = mbtiContainer + script;
        hexo.extend.injector.register(
            "body_end",
            mbtiContent,
            layout
        );
    });
    hexo.extend.injector.register("head_begin", linkTag, layout);
    hexo.extend.injector.register("body_end", dataScriptTag, layout);
    hexo.extend.injector.register("body_end", scriptTag, layout);
}

if (Array.isArray(config.layout)) {
    config.layout.forEach((layout) => {
        insertToHtml(layout);
    });
} else {
    insertToHtml(config.layout);
}