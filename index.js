const config = require("./lib/config")(hexo);
const ResourceManager = require('./lib/resource-manager');


function insertToHtml(layout) {
    hexo.extend.generator.register("mbti-card", function(locals) {
        const resourceManager = new ResourceManager(hexo, { cardType: 'common', ...config });

        const { defaultCss, defaultScripts, externalScripts } = resourceManager.generateCardContent();
        hexo.extend.injector.register('head_end', defaultCss, layout);
        hexo.extend.injector.register('body_end', defaultScripts, layout);
        hexo.extend.injector.register('body_end', externalScripts, layout);

        config.cards.forEach((cardConfig, index) => {

            const resourceManager = new ResourceManager(hexo, cardConfig);
            const { defaultCss, defaultScripts, externalScripts } = resourceManager.generateCardContent();
            hexo.extend.injector.register('head_end', defaultCss, layout);
            hexo.extend.injector.register('body_end', defaultScripts, layout);
            hexo.extend.injector.register('body_end', externalScripts, layout);

            const renderScript = `
              <script>
                initialize${cardConfig.cardType.charAt(0).toUpperCase() + cardConfig.cardType.slice(1)}MBTI(${JSON.stringify(cardConfig)});
              </script>
            `;
            hexo.extend.injector.register('body_end', renderScript, layout);
        });
    });
}
hexo.extend.filter.register('after_init', () => {
    const commonResourceManager = new ResourceManager(hexo, { cardType: 'common', ...config });
    commonResourceManager.copyResources();
    config.cards.forEach(cardConfig => {
        const resourceManager = new ResourceManager(hexo, cardConfig);
        resourceManager.copyResources();
    });
});

const layouts = [...new Set(config.cards.map(card => card.layout))];
layouts.forEach(layout => {
    insertToHtml(layout);
});