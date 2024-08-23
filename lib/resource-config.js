module.exports = {
    common: {
        css: '',
        js: ['data.js', 'common.js'],
        externalJs: []
    },
    detailed: {
        css: 'detailed.css',
        js: ['detailed.js', ],
        externalJs: [{
            condition: (config) => config.slide,
            src: 'https://unpkg.com/modern-screenshot'
        }, ]
    },
    brief: {
        css: 'brief.css',
        js: ['brief.js', 'brief-card.js'],
        externalJs: [{
                condition: (config) => config.interaction.download,
                src: 'https://unpkg.com/modern-screenshot'
            },
            {
                condition: (config) => true,
                src: 'https://cdn.jsdelivr.net/npm/lottie-web@5.12.2/build/player/lottie.min.js'
            },
        ]
    }
};