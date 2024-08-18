const config = require("./lib/config")(hexo);
const ResourceManager = require('./lib/resource-manager');

function insertToHtml(layout) {
    hexo.extend.generator.register("mbti-card", function(locals) {
        config.cards.forEach((cardConfig, index) => {

            const resourceManager = new ResourceManager(hexo, cardConfig);
            const { defaultCss, defaultScripts, externalJss, renderScript } = resourceManager.generateCardContent();
            hexo.extend.injector.register('head_end', defaultCss, layout);
            hexo.extend.injector.register('body_end', defaultScripts, layout);
            hexo.extend.injector.register('body_end', externalJss, layout);
            hexo.extend.injector.register('body_end', renderScript, layout);
        });
    });
}
hexo.extend.filter.register('after_init', () => {
    config.cards.forEach(cardConfig => {
        const resourceManager = new ResourceManager(hexo, cardConfig);
        resourceManager.copyResources();
    });
});

const layouts = [...new Set(config.cards.map(card => card.layout))];
layouts.forEach(layout => {
    insertToHtml(layout);
});