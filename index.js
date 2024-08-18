const path = require('path');
const pkg = require("./package.json");
const config = require("./lib/config")(hexo);
const copyFile = require("./lib/utils").copyFile.bind(hexo);

const resourcePathsCache = new Map();

function getResourcePaths(cardConfig) {
    const cacheKey = `${cardConfig.cardType}-${cardConfig.cdn}`;
    if (resourcePathsCache.has(cacheKey)) {
        return resourcePathsCache.get(cacheKey);
    }
    const cssHref = cardConfig.cdn ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/css/${cardConfig.cardType}.css` : `/css/${pkg.name}-${cardConfig.cardType}.css`;
    const jsSrc = cardConfig.cdn ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/${cardConfig.cardType}.js` : `/js/${pkg.name}-${cardConfig.cardType}.js`;
    const result = { cssHref, jsSrc };
    resourcePathsCache.set(cacheKey, result);
    return result;
}


async function copyResources(cardConfig) {
    try {
        if (!cardConfig.cdn) {
            const cssPath = `/css/${pkg.name}-${cardConfig.cardType}.css`;
            const jsPath = `/js/${pkg.name}-${cardConfig.cardType}.js`;

            await Promise.all([
                copyFile(`${pkg.name}-${cardConfig.cardType}-css`, cssPath, path.join(__dirname, `./css/${cardConfig.cardType}.css`)),
                copyFile(`${pkg.name}-${cardConfig.cardType}-js`, jsPath, path.join(__dirname, `./js/${cardConfig.cardType}.js`)),

            ]);
            if (cardConfig.cardType === 'detailed') {
                const dataJsPath = `/js/${pkg.name}-${cardConfig.cardType}-data.js`;
                await copyFile(`${pkg.name}-${cardConfig.cardType}-data-js`, dataJsPath, path.join(__dirname, `./js/${cardConfig.cardType}-data.js`));
            }
        }
    } catch (error) {
        console.error(`Error copying resources: ${error.message}`);
    }
}


function generateCardContent(cardConfig) {
    const { cssHref, jsSrc } = getResourcePaths(cardConfig);
    const linkTag = `<link href="${cssHref}" rel="stylesheet"/>`;
    const scriptTag = `<script src="${jsSrc}"></script>`;
    let dataScriptTag = '';
    if (cardConfig.cardType === 'detailed') {
        const dataJsSrc = cardConfig.cdn ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}/js/data.js` : `/js/${pkg.name}-${cardConfig.cardType}-data.js`;
        dataScriptTag = `<script src="${dataJsSrc}"></script>`;
    }
    const initScript = `
        <script>
            initialize${cardConfig.cardType.charAt(0).toUpperCase() + cardConfig.cardType.slice(1)}MBTI(${JSON.stringify(cardConfig)});
        </script>
    `;
    return { linkTag, scriptTag, dataScriptTag, initScript };
}


function insertToHtml(layout) {
    hexo.extend.generator.register("mbti-card", function(locals) {
        config.cards.forEach((cardConfig, index) => {
            const { linkTag, scriptTag, dataScriptTag, initScript } = generateCardContent(cardConfig);
            hexo.extend.injector.register("head_end", linkTag, layout);
            hexo.extend.injector.register("body_end", scriptTag, layout);
            if (dataScriptTag) {
                hexo.extend.injector.register("body_end", dataScriptTag, layout);
            }
            hexo.extend.injector.register("body_end", initScript, layout);
        });
    });

    // 注入公共脚本
    hexo.extend.injector.register("body_end", `<script src="https://unpkg.com/modern-screenshot"></script>`, layout);
    hexo.extend.injector.register("body_end", `<script src="https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js"></script>`, layout);
}
hexo.extend.filter.register('after_init', () => {
    config.cards.forEach(cardConfig => {
        copyResources(cardConfig);
    });
});

const layouts = [...new Set(config.cards.map(card => card.layout))];
layouts.forEach(layout => {
    insertToHtml(layout);
});