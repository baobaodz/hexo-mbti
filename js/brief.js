function initializeBriefMBTI(config) {
    const createHTML = (personalityType) => {

        const sildeButton = config.interaction.slide ? `
              <div class="mbti-nav-buttons">
                    <button class="mbti-nav-button prev">&lt;</button>
                    <button class="mbti-nav-button next">&gt;</button>
                </div>
            ` : '';
        const styleSwitchButton = config.interaction.switch ? `
            <div class="mbti-style-switch">
                <svg id="styleSwitchBtn" t="1723948319032" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25040" width="32" height="32">
                    <path d="M514 114.3c-219.9 0-398.9 178.9-398.9 398.8 0.1 220 179 398.9 398.9 398.9 219.9 0 398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m218.3 489v1.7c0 0.5-0.1 1-0.1 1.6 0 0.3 0 0.6-0.1 0.9 0 0.5-0.1 1-0.2 1.5 0 0.3-0.1 0.7-0.1 1-0.1 0.4-0.1 0.8-0.2 1.2-0.1 0.4-0.2 0.9-0.2 1.3-0.1 0.3-0.1 0.6-0.2 0.8-0.1 0.6-0.3 1.2-0.4 1.8 0 0.1-0.1 0.2-0.1 0.3-2.2 8.5-6.6 16.6-13.3 23.3L600.7 755.4c-20 20-52.7 20-72.6 0-20-20-20-52.7 0-72.6l28.9-28.9H347c-28.3 0-51.4-23.1-51.4-51.4 0-28.3 23.1-51.4 51.4-51.4h334c13.2 0 26.4 5 36.4 15s15 23.2 15 36.4c0 0.3-0.1 0.6-0.1 0.8z m0.1-179.5c0 28.3-23.1 51.4-51.4 51.4H347c-13.2 0-26.4-5-36.4-15s-15-23.2-15-36.4v-0.8-1.6c0-0.5 0.1-1.1 0.1-1.6 0-0.3 0-0.6 0.1-0.9 0-0.5 0.1-1 0.2-1.5 0-0.3 0.1-0.7 0.1-1 0.1-0.4 0.1-0.8 0.2-1.2 0.1-0.4 0.2-0.9 0.2-1.3 0.1-0.3 0.1-0.6 0.2-0.8 0.1-0.6 0.3-1.2 0.4-1.8 0-0.1 0.1-0.2 0.1-0.3 2.2-8.5 6.6-16.6 13.3-23.3l116.6-116.6c20-20 52.7-20 72.6 0 20 20 20 52.7 0 72.6L471 372.5h210c28.2 0 51.4 23.1 51.4 51.3z" fill="${personalityType.characterColor}" p-id="25041"></path>
                </svg>
            </div>
        ` : '';
        const briefHTML = `
            ${config.interaction.switch ? '<div class="card-flipper">' : ''}
            <div id="mbti-brief-wrapper" data-style="${config.style}">
                
                <div class="mbti-brief-header">
                    <div class="mbti-brief-personality-name">
                        ${personalityType.name} (${personalityType.type})
                    </div>
                </div>
                <div class="mbti-brief-body">
                    <div class="mbti-brief-image-container slide-transition">
                    </div>
                    <div class="mbti-brief-desc">${personalityType.desc}</div>
                </div>
                <div class="mbti-brief-footer">
                    <span class="mbti-more-button">
                        <a href="${getMoreInfoLink(personalityType)}" target="_blank">${langConfig.linkText[config.language]}</a>
                    </span>
                    ${styleSwitchButton}
                </div>
                <div class="mbti-brief-card-bg">
                    <svg height="30" viewBox="0 0 399 30" width="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400 0v16L326.316 5 94.736 20 0 0z" fill="${personalityType.characterColor}" fill-rule="evenodd">
                        </path>
                    </svg>
                </div>
                ${sildeButton}
            </div>
            ${config.interaction.switch ? '</div>' : ''}
        `;
        return briefHTML;
    }
    const languageConfig = {
        en: {
            ei: ['Extraverted', 'Introverted'],
            ns: ['Intuitive', 'Observant'],
            tf: ['Thinking', 'Feeling'],
            jp: ['Judging', 'Prospecting'],
            at: ['Assertive', 'Turbulent']
        },
        zh: {
            ei: ['外向', '内向'],
            ns: ['有远见', '现实'],
            tf: ['理性分析', '感受'],
            jp: ['评判', '展望'],
            at: ['坚决', '起伏不定']
        }
    };
    const langConfig = {
        prefix: { zh: 'ch/', en: '' },
        suffix: { zh: '人格', en: 'personality' },
        linkText: { zh: '查看更多', en: 'View More' }
    };
    const getLocalizedContent = (content) => {
        return content[config.language];
    }

    const getMBTIDimensions = (config) => {
        const lang = config.language || 'en';
        return [
            { id: 'ei', label: languageConfig[lang].ei, value: config.data['E-I'] || config.data[languageConfig[lang].ei.join('-')], color: config.color[0] },
            { id: 'ns', label: languageConfig[lang].ns, value: config.data['N-S'] || config.data[languageConfig[lang].ns.join('-')], color: config.color[1] },
            { id: 'tf', label: languageConfig[lang].tf, value: config.data['T-F'] || config.data[languageConfig[lang].tf.join('-')], color: config.color[2] },
            { id: 'jp', label: languageConfig[lang].jp, value: config.data['J-P'] || config.data[languageConfig[lang].jp.join('-')], color: config.color[3] },
            { id: 'at', label: languageConfig[lang].at, value: config.data['A-T'] || config.data[languageConfig[lang].at.join('-')], color: config.color[4] },
        ];
    }
    const calculatePersonalityType = (dimensions) => {
        const type = dimensions
            .slice(0, 4)
            .map(d => d.id[getDominantTraitIndex(d.value[1])].toUpperCase())
            .join('');
        const personalityType = personalityTypes.find(p => p.type === type);

        if (!personalityType) {
            return { type, name: '未知类型', desc: '' };
        }

        let result = {
            type,
            name: getLocalizedContent(personalityType.name),
            desc: getLocalizedContent(personalityType.desc),
        };
        result = {
            ...result,
            avatar: `${imagesHostUrl}/${result.type.toLowerCase()}-${personalityType.name.en.toLowerCase()}-s3-v1-${config.gender}.png?t=${Date.now()}`,
            // avatar: personalityType.avatar[config.gender]
        }

        if (dimensions.length > 4) {
            const atDimension = dimensions[4].value[0] < 50 ? 'A' : 'T';
            result.type += '-' + atDimension;
        }
        return result;
    };
    const getFillColor = (personalityType) => {
        const type = personalityType.type.slice(0, 4);

        const colorMap = {
            "#f9eed7": ["ISTP", "ISFP", "ESTP", "ESFP"],
            "#d9eaf0": ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
            "#d6ece3": ["INFJ", "INFP", "ENFJ", "ENFP"],
            "#e7dfea": ["INTJ", "INTP", "ENTJ", "ENTP"]
        };

        for (const [color, types] of Object.entries(colorMap)) {
            if (types.includes(type)) {
                return color;
            }
        }

        return "#ffffff"; // 默认颜色，以防没有匹配
    }


    const getCurrentPersonalityType = (personalityType) => {
        const characterColor = getFillColor(personalityType);
        container.style.setProperty('--character-color', characterColor);
        return {
            type: personalityType.type,
            name: getLocalizedContent(personalityType.name),
            desc: getLocalizedContent(personalityType.desc),
            characterColor: characterColor,
            imgUrl: getAvatarImgUrl(getCurrentStyle(), personalityType),
        };

    }
    const getCurrentStyle = () => {
        const wrapper = document.getElementById('mbti-brief-wrapper');
        return wrapper.dataset.style;
    }
    const getMoreInfoLink = (personalityType) => {
        const lang = config.language || 'en';
        return `${baseUrl}/${langConfig.prefix[lang]}${personalityType.type.slice(0,4).toLowerCase()}-${langConfig.suffix[lang]}`;

    }

    const avatarConfigs = [{
            style: 'classic',
            author: 'Sourcegraph',
            imgSuffix: 'json',
            getImgUrl: (personalityType) => `${imagesHostUrl}/avatars/classic/${personalityType.name.en.toLowerCase()}.json`
        },
        {
            style: 'illustration',
            author: 'Sourcegraph',
            imgSuffix: 'jpg',
            getImgUrl: (personalityType) => `${imagesHostUrl}/avatars/illustration/${personalityType.type.slice(0, 4).toLowerCase()}.jpg`
        }
    ];
    const getAvatarImgUrl = (style, personalityType) => {
        const avatarConfig = avatarConfigs.find(item => item.style === style);
        return avatarConfig ? avatarConfig.getImgUrl(personalityType) : null;
    }
    const switchStyle = () => {
        const wrapper = document.getElementById('mbti-brief-wrapper');
        const flipper = document.querySelector('.card-flipper');
        flipper.classList.add('flipping');

        const styles = ['classic', 'illustration'];
        const currentIndex = styles.indexOf(wrapper.dataset.style);
        const newIndex = (currentIndex + 1) % styles.length;
        const personalityType = personalityTypes.find(p => p.type === currentPersonalityType.type.slice(0, 4));
        wrapper.dataset.style = styles[newIndex];
        currentPersonalityType = {
            ...currentPersonalityType,
            imgUrl: getAvatarImgUrl(wrapper.dataset.style, personalityType),
        };
        setTimeout(() => {
            const briefImageContainer = document.querySelector('.mbti-brief-image-container');
            loadCardContent(currentPersonalityType, wrapper.dataset.style, briefImageContainer);
            flipper.classList.remove('flipping');
        }, 300);
    }
    const setBriefImageContainerHeight = () => {
        const wrapper = document.getElementById('mbti-brief-wrapper');
        const briefImageContainer = document.querySelector('.mbti-brief-image-container');

        if (wrapper && briefImageContainer) {
            const minHeight = wrapper.offsetWidth * 0.9;
            briefImageContainer.style.minHeight = `${minHeight}px`;
        }
    }


    const containerId = `mbti-${config.cardType}-container`;
    const container = document.getElementById(containerId);
    container.setAttribute('lang', config.language);
    const imagesHostUrl = 'https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti';
    const baseUrl = 'https://www.16personalities.com';
    let mbtiDimensions = [];
    let baseMBTIDimensions = [];
    let currentPersonalityType = {};
    let basePersonalityType = {};
    if (config.data && config.data.length) {
        mbtiDimensions = getMBTIDimensions(config);
        baseMBTIDimensions = JSON.parse(JSON.stringify(mbtiDimensions));
        currentPersonalityType = calculatePersonalityType(mbtiDimensions);

    } else if (config.type) {
        const personalityType = personalityTypes.find(p => p.type === config.type.slice(0, 4));
        currentPersonalityType = {
            type: config.type,
            name: getLocalizedContent(personalityType.name),
            desc: getLocalizedContent(personalityType.desc),
            // avatar: `${imagesHostUrl}/${personalityType.type.toLowerCase()}-${personalityType.name.en.toLowerCase()}-s3-v1-${config.gender}.png?t=${Date.now()}`,
        }
    }
    const personalityType = personalityTypes.find(p => p.type === currentPersonalityType.type.slice(0, 4));
    const characterColor = getFillColor(personalityType);
    container.style.setProperty('--character-color', characterColor);
    currentPersonalityType = {
        ...currentPersonalityType,
        characterColor: characterColor,
        imgUrl: getAvatarImgUrl(config.style, personalityType),
    }
    basePersonalityType = JSON.parse(JSON.stringify(currentPersonalityType));


    container.innerHTML = createHTML(currentPersonalityType);
    const wrapper = document.getElementById('mbti-brief-wrapper');
    wrapper.dataset.style = config.style;
    const briefImageContainer = document.querySelector('.mbti-brief-image-container');

    loadCardContent(currentPersonalityType, config.style, briefImageContainer);


    if (config.interaction.slide) {
        const elements = {
            wrapper: document.getElementById('mbti-brief-wrapper'),
            backgroundElement: document.querySelector('.mbti-brief-card-bg'),
            styleSwitchBtn: document.querySelector('#styleSwitchBtn'),
            navButtons: document.querySelectorAll('.mbti-nav-button')
        };

        let currentIndex = personalityTypes.findIndex(p => p.type.startsWith(currentPersonalityType.type.slice(0, 4)));

        const updatePersonalityInfo = (newIndex) => {
            currentIndex = (newIndex + personalityTypes.length) % personalityTypes.length;
            currentPersonalityType = getCurrentPersonalityType(personalityTypes[currentIndex]);

            elements.wrapper.querySelector('.mbti-brief-personality-name').textContent = `${currentPersonalityType.name} (${currentPersonalityType.type})`;
            elements.wrapper.querySelector('.mbti-brief-desc').textContent = currentPersonalityType.desc;
            elements.backgroundElement.style.backgroundColor = currentPersonalityType.characterColor;
            elements.backgroundElement.querySelector('svg path').setAttribute('fill', currentPersonalityType.characterColor);
            elements.styleSwitchBtn.querySelector('path').setAttribute('fill', currentPersonalityType.characterColor);

            const moreButton = elements.wrapper.querySelector('.mbti-more-button');
            moreButton.href = getMoreInfoLink(currentPersonalityType);
            moreButton.style.backgroundColor = currentPersonalityType.characterColor;
        };

        const animateSlide = (isNext) => {
            const briefImageContainer = document.querySelector('.mbti-brief-image-container');
            briefImageContainer.classList.add(isNext ? 'slide-out-left' : 'slide-out-right');

            setTimeout(() => {
                const newImageContainer = briefImageContainer.cloneNode(true);
                newImageContainer.classList.remove('slide-out-left', 'slide-out-right');
                newImageContainer.classList.add(isNext ? 'slide-in-right' : 'slide-in-left');
                briefImageContainer.parentNode.replaceChild(newImageContainer, briefImageContainer);

                void newImageContainer.offsetWidth;
                newImageContainer.classList.remove('slide-in-right', 'slide-in-left');

                updatePersonalityInfo(currentIndex + (isNext ? 1 : -1));
                loadCardContent(currentPersonalityType, elements.wrapper.dataset.style, newImageContainer);
            }, 500);
        };

        elements.navButtons.forEach(button => {
            button.onclick = () => animateSlide(button.classList.contains('next'));
        });
    }
    if (config.interaction.switch) {
        document.getElementById('styleSwitchBtn').addEventListener('click', switchStyle);
    }
}

class StyleHandler {
    loadContent(personalityType, container) {
        throw new Error("Method 'loadContent' must be implemented.");
    }
}
class ClassicStyleHandler extends StyleHandler {
    loadContent(personalityType, container) {
        this.loadLottieAnimation(personalityType, container);
    }
    loadLottieAnimation(personalityType, container) {
        fetch(personalityType.imgUrl)
            .then(response => response.json())
            .then(animationData => {
                container.innerHTML = '';
                container.style.minHeight = '100%';
                const animation = lottie.loadAnimation({
                    container: container,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    animationData: animationData
                });
                container.addEventListener('mouseenter', () => {
                    animation.loop = true;
                    animation.play();
                });

                container.addEventListener('mouseleave', () => {
                    animation.loop = false;
                });
                animation.addEventListener('complete', () => {
                    if (!container.matches(':hover')) {
                        animation.stop();
                    }
                });

            });
    }
}

class imgStyleHandler extends StyleHandler {
    loadContent(personalityType, container) {
        this.loadImage(personalityType, container);
    }

    loadImage(personalityType, container) {
        const prevHeight = container.offsetHeight || 200;
        container.style.minHeight = `${prevHeight}px`;
        fetch(personalityType.imgUrl)
            .then(response => response.blob())
            .then(blob => {
                container.innerHTML = '';
                const img = document.createElement('img');
                img.className = 'mbti-brief-image';
                img.src = URL.createObjectURL(blob);
                container.appendChild(img);
                container.style.minHeight = '100%';
            })
            .catch(error => {
                console.error('Error loading image:', error);
            });
    }
}
const styleHandlerFactory = {
    handlers: {
        classic: ClassicStyleHandler,
        illustration: imgStyleHandler
    },

    getHandler(style) {
        const Handler = this.handlers[style] || imgStyleHandler;
        return new Handler();
    },

    registerHandler(style, HandlerClass) {
        this.handlers[style] = HandlerClass;
    }
};

function loadCardContent(personalityType, style, briefImageContainer) {
    const handler = styleHandlerFactory.getHandler(style);
    handler.loadContent(personalityType, briefImageContainer);

}