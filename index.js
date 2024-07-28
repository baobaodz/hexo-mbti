// 引入依赖
const fs = require('fs');
const path = require('path');

// 插件初始化
hexo.extend.filter.register('after_generate', function(data) {
    if (hexo.config.mbtiData) {
        const { introversion, extraversion, sensing, intuition, feeling, thinking, judging, perceiving, assertiveness, fluctuation } = hexo.config.mbtiData;

        const mbtiContainer = `<div class="mbti-card" id="mbti-container">

        </div>`;
        const scriptContent = fs.readFileSync(path.join(__dirname, 'script.js'), 'utf8');
        const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');

        const script = `
             <script>
                ${scriptContent}
             </script>
        `;
        const css = `
            <style>
              ${cssContent}
            </style>
        `;

        const mbtiContent = mbtiContainer + script + css;

        // 将内容注入到about页面
        hexo.extend.injector.register('body_end', mbtiContent, 'about');
    }
});