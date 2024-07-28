module.exports = (hexo) => {
    hexo.config.mbti_card = Object.assign({
            cdn: false,
            hide: false,
            slide: false,
            layout: "about",
            data: {
                'E-I': [40, 60],
                'S-N': [20, 80],
                'T-F': [20, 80],
                'J-P': [20, 80],
                'A-T': [20, 80],
            },
            color: [
                "#4298b4",
                "#e4ae3a",
                "#33a474",
                "#88619a",
                "#f25e62",
            ]
        },
        hexo.config.mbti_card
    );
    return hexo.config.mbti_card;
};