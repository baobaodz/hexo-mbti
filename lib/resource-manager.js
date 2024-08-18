const fs = require("fs");
const path = require('path');
const pkg = require('../package.json');
const resourceConfig = require('./resource-config');
const { copyFile, findRootDir } = require('./utils');

class ResourceManager {
    constructor(hexo, cardConfig) {
        this.hexo = hexo;
        this.cardConfig = cardConfig;
        this.resourceConfig = resourceConfig[cardConfig.cardType];
        this.rootDir = findRootDir(__dirname);

    }

    getResourcePaths() {
        const { cardType, cdn } = this.cardConfig;
        const basePath = cdn ? `https://cdn.jsdelivr.net/npm/${pkg.name}@${pkg.version}` : '';

        const paths = {
            cssHref: cdn ? `${basePath}/css/${this.resourceConfig.css}` : `/css/${pkg.name}-${cardType}.css`,
            jsSrcs: this.resourceConfig.js.map(js =>
                cdn ? `${basePath}/js/${js}` : `/js/${pkg.name}-${js}`
            ),
            externalJsSrcs: []
        };

        if (Array.isArray(this.resourceConfig.externalJs)) {
            this.resourceConfig.externalJs.forEach(externalJs => {
                if (externalJs.condition(this.cardConfig)) {
                    paths.externalJsSrcs.push(externalJs.src);
                }
            });
        }

        return paths;
    }

    generateCardContent() {
        const { cssHref, jsSrcs, externalJsSrcs } = this.getResourcePaths();
        const defaultCss = `<link href="${cssHref}" rel="stylesheet"/>`;
        const defaultScripts = jsSrcs.map(src => `<script src="${src}"></script>`).join('');
        const externalJss = externalJsSrcs.map(src => `<script src="${src}"></script>`).join('');
        const renderScript = `
          <script>
            initialize${this.cardConfig.cardType.charAt(0).toUpperCase() + this.cardConfig.cardType.slice(1)}MBTI(${JSON.stringify(this.cardConfig)});
          </script>
        `;
        return { defaultCss, defaultScripts, externalJss, renderScript };
    }


    async copyResources() {
        if (!this.cardConfig.cdn) {
            const boundCopyFile = copyFile.bind(this.hexo);
            const copyPromises = [];

            const cssPath = path.join(this.rootDir, `css/${this.resourceConfig.css}`);
            if (fs.existsSync(cssPath)) {
                copyPromises.push(
                    boundCopyFile(
                        `${pkg.name}-${this.cardConfig.cardType}-css`,
                        `/css/${pkg.name}-${this.cardConfig.cardType}.css`,
                        cssPath
                    )
                );
            } else {
                console.warn(`CSS file not found: ${cssPath}`);
            }

            for (const js of this.resourceConfig.js) {
                const jsPath = path.join(this.rootDir, `js/${js}`);
                if (fs.existsSync(jsPath)) {
                    copyPromises.push(
                        boundCopyFile(
                            `${pkg.name}-${js.replace('.js', '')}-js`,
                            `/js/${pkg.name}-${js}`,
                            jsPath
                        )
                    );
                } else {
                    console.warn(`JS file not found: ${jsPath}`);
                }
            }

            try {
                await Promise.all(copyPromises);
            } catch (error) {
                console.error('Error copying resources:', error);
            }
        }
    }

}

module.exports = ResourceManager;