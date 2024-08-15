function initializeBriefMBTI(config) {

    const createHTML = (personalityType) => {

        const sildeButton = config.slide ? `
              <div class="mbti-nav-buttons">
                    <button class="mbti-nav-button prev">&lt;</button>
                    <button class="mbti-nav-button next">&gt;</button>
                </div>
            ` : '';
        const langConfig = {
            prefix: { zh: 'ch/', en: '' },
            suffix: { zh: '人格', en: 'personality' },
            linkText: { zh: '查看更多', en: 'View More' }
        };

        const baseUrl = 'https://www.16personalities.com/';
        const lang = config.language || 'en';
        const url = `${baseUrl}${langConfig.prefix[lang]}${personalityType.type.slice(0,4).toLowerCase()}-${langConfig.suffix[lang]}`;

        const briefHTML = `
            <div id="mbti-brief-wrapper">

                <div class="mbti-brief-header">
                    <div class="mbti-brief-personality-name">
                        ${personalityType.name} (${personalityType.type})
                    </div>
                </div>
                <div class="mbti-brief-body">
                    <div class="mbti-brief-image slide-transition"></div>
                    <div class="mbti-brief-desc">${personalityType.desc}</div>
                </div>
                <div class="mbti-brief-footer">
                    <span class="mbti-more-button" style="background-color: ${personalityType.characterColor};">
                        <a href="${url}" target="_blank">${langConfig.linkText[lang]}</a>
                    </span>
                </div>
                <div class="mbti-brief-card-bg" style="background-color: ${personalityType.characterColor};">
                    <svg height="30" viewBox="0 0 399 30" width="100%" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" class="angular-380-connected-1 svg--connected">
                        <path d="M400 0v16L326.316 5 94.736 20 0 0z" fill="${personalityType.characterColor}" fill-rule="evenodd">
                        </path>
                    </svg>
                </div>
                ${sildeButton}
            </div>

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

    const loadLottieAnimation = (personalityType, container) => {
        fetch(personalityType.imgUrl)
            .then(response => response.json())
            .then(animationData => {
                container.innerHTML = '';
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

    const getCurrentPersonalityType = (personalityType) => {
        return {
            type: personalityType.type,
            name: getLocalizedContent(personalityType.name),
            desc: getLocalizedContent(personalityType.desc),
            characterColor: getFillColor(personalityType),
            imgUrl: `${imagesHostUrl}/avatars/classic/${personalityType.name.en.toLowerCase()}.json`,
        };

    }
    const containerId = `mbti-${config.cardType}-container`;
    const container = document.getElementById(containerId);
    container.setAttribute('lang', config.language);
    const imagesHostUrl = 'https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti';
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
    currentPersonalityType = {
        ...currentPersonalityType,
        characterColor: getFillColor(currentPersonalityType),
        imgUrl: `${imagesHostUrl}/avatars/classic/${personalityType.name.en.toLowerCase()}.json`,
    }
    basePersonalityType = JSON.parse(JSON.stringify(currentPersonalityType));

    container.innerHTML = createHTML(currentPersonalityType);
    const briefImageContainer = document.querySelector('.mbti-brief-image');
    loadLottieAnimation(currentPersonalityType, briefImageContainer);

    if (config.slide) {
        let currentIndex = personalityTypes.findIndex(p => p.type.startsWith(currentPersonalityType.type.slice(0, 4)));

        document.querySelectorAll('.mbti-nav-button').forEach(button => {
            button.onclick = () => {
                const wrapper = document.getElementById('mbti-brief-wrapper');
                const briefImageContainer = document.querySelector('.mbti-brief-image');
                const backgroundElement = document.querySelector('.mbti-brief-card-bg');
                const isNext = button.classList.contains('next');

                // 设置当前图片的移出动画
                briefImageContainer.classList.add(isNext ? 'slide-out-left' : 'slide-out-right');
                setTimeout(() => {
                    // 更新人格类型
                    currentIndex = (currentIndex + (isNext ? 1 : -1) + personalityTypes.length) % personalityTypes.length;
                    currentPersonalityType = getCurrentPersonalityType(personalityTypes[currentIndex]);

                    // 动态更新HTML元素
                    wrapper.querySelector('.mbti-brief-personality-name').textContent = `${currentPersonalityType.name} (${currentPersonalityType.type})`;
                    wrapper.querySelector('.mbti-brief-desc').textContent = currentPersonalityType.desc;

                    // 创建新的图片容器
                    const newImageContainer = briefImageContainer.cloneNode(true);
                    newImageContainer.classList.remove('slide-out-left', 'slide-out-right');
                    newImageContainer.classList.add(isNext ? 'slide-in-right' : 'slide-in-left');

                    // 替换旧的图片容器
                    briefImageContainer.parentNode.replaceChild(newImageContainer, briefImageContainer);

                    // 触发重排并开始新的动画
                    void newImageContainer.offsetWidth;
                    newImageContainer.classList.remove('slide-in-right', 'slide-in-left');

                    // 加载新的动画
                    loadLottieAnimation(currentPersonalityType, newImageContainer);

                    // 背景渐入效果
                    backgroundElement.style.backgroundColor = currentPersonalityType.characterColor;
                    backgroundElement.querySelector('svg path').setAttribute('fill', currentPersonalityType.characterColor);

                    // 更新"查看更多"按钮
                    const moreButton = wrapper.querySelector('.mbti-more-button');
                    moreButton.href = `https://www.16personalities.com/${currentPersonalityType.type.toLowerCase()}-personality`;
                    moreButton.style.backgroundColor = currentPersonalityType.characterColor;
                }, 500);
            };
        });
    }

}