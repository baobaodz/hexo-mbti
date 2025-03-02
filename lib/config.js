module.exports = (hexo) => {
    const cardTypeConfigs = {
        detailed: {
            enable: true,
            layout: "about",
            slide: true,
            color: ["#4298b4", "#e4ae3a", "#33a474", "#88619a", "#f25e62"],
            data: {
                'E-I': [40, 60],
                'N-S': [20, 80],
                'T-F': [20, 80],
                'J-P': [20, 80],
                'A-T': [20, 80],
            },
            tooltip: {
                showTooltipBackground: false,
            }
        },
        brief: {
            enable: false,
            type: "ENFP-A",
            style: 'classic',
            interaction: {
                slide: true,
                switch: true,
                download: true,
                resize: true,
            }

        },
        bubble: {
            enable: false,
        }
    };

    const userConfig = hexo.config.mbti_card || {};

    const cards = (userConfig.cards || []).map(card => {
        const cardType = card.cardType || 'detailed';
        return Object.assign({},
            cardTypeConfigs[cardType], {
                language: card.language || userConfig.language || 'zh',
                gender: card.gender || userConfig.gender || 'male',
                cdn: card.cdn !== undefined ? card.cdn : userConfig.cdn
            },
            card
        );
    }).filter(card => card.enable !== false);


    const finalConfig = Object.assign({}, userConfig, { cards });

    hexo.config.mbti_card = finalConfig;
    return finalConfig;
};