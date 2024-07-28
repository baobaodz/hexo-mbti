// 引入依赖
const fs = require('fs');
const path = require('path');

const pkg = require("./package.json");
const config = require("./lib/config")(hexo);
const copyFile = require("./lib/utils").copyFile.bind(hexo);


let cssHref = `/css/${pkg.name}.css`;
let jsSrc = `/js/${pkg.name}.js`;
if (config.cdn) {
    cssHref = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/css/index.css`;
    jsSrc = `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/index.js`;
} else {
    copyFile(`${pkg.name}-css`, cssHref, path.join(__dirname, "./css/index.css"));
    copyFile(`${pkg.name}-js`, jsSrc, path.join(__dirname, "./js/script.js"));
}

const linkTag = `<link href="${cssHref}" rel="stylesheet"/>`;
const scriptTag = `<script src="${jsSrc}"></script>`;


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
            const container = document.getElementById('mbti-container');
            const mbtiDimensions = getMBTIDimensions(${JSON.stringify(config)});
            container.innerHTML = getMBTIBars(mbtiDimensions);
            console.log('insertToHtml slide: ', ${config.slide});
            addSliderListeners(mbtiDimensions, ${config.slide});
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
    hexo.extend.injector.register("body_end", scriptTag, layout);

    if (config.hide) {
        hexo.extend.injector.register(
            "body_end",
            "<style>#widget-tree-button{opacity:0}</style>",
            layout
        );
    }
}

if (Array.isArray(config.layout)) {
    config.layout.forEach((layout) => {
        insertToHtml(layout);
    });
} else {
    insertToHtml(config.layout);
}

// 插件初始化
hexo.extend.filter.register('after_generate', function(data) {
    if (hexo.config.mbtiData) {
        // const { introversion, extraversion, sensing, intuition, feeling, thinking, judging, perceiving, assertiveness, fluctuation } = hexo.config.mbtiData;

        // const mbtiContainer = `<div class="mbti-card" id="mbti-container">

        // </div>`;
        // const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
        // const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

        // const script = `
        //      <script>
        //         ${scriptContent}
        //      </script>
        // `;
        // const css = `
        //     <style>
        //       ${cssContent}
        //     </style>
        // `;

        // const mbtiContent = mbtiContainer + script + css;

        // // 将内容注入到about页面
        // hexo.extend.injector.register('body_end', mbtiContent, 'about');
    }
});