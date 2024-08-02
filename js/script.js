function initializeMBTI(config) {
    const imagesHostUrl = 'https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti'
    const createHeaderHTML = (personalityType, showResetButton) => {
        const resetButton = showResetButton ?
            '<div class="reset-button-container"><button id="reset-mbti" class="reset-button">重置</button></div>' : '';
        return `
            <div class="mbti-header">
                <div class="personality-avatar">
                    <img src="${personalityType.avatar}" alt="${personalityType.name}">
                </div>
                <div class="personality-info">
                    <h2>${personalityType.name} (${personalityType.type})</h2>
                    <span>${personalityType.desc}</span>
                </div>
                ${resetButton}
            </div>
        `;
    }

    const createBarHTML = (dimension) => {
        return `
          </div>
            <div class="trait-container">
                <span class="trait-left">${dimension.label[0]}</span>
                <div class="slider-container">
                    <input type="range" min="0" max="100" value="${dimension.value[0]}" class="slider" id="${dimension.id}Slider" disabled>
                    <div id="${dimension.id}SliderTooltip" class="slider-tooltip"></div>
                </div>
                <span class="trait-right">${dimension.label[1]}</span>
            </div>
        `;
    }

    const getMBTIDimensions = (config) => {
        return [
            { id: 'ei', label: ['外向', '内向'], value: config.data['E-I'] || config.data['外向-内向'], color: config.color[0] },
            { id: 'sn', label: ['有远见', '现实'], value: config.data['S-N'] || config.data['有远见-现实'], color: config.color[1] },
            { id: 'tf', label: ['理性分析', '感受'], value: config.data['T-F'] || config.data['理性分析-感受'], color: config.color[2] },
            { id: 'jp', label: ['评判', '展望'], value: config.data['J-P'] || config.data['评判-展望'], color: config.color[3] },
            { id: 'at', label: ['坚决', '起伏不定'], value: config.data['A-T'] || config.data['坚决-起伏不定'], color: config.color[4] },
        ];
    }

    const getMBTIBars = (mbtiDimensions) => {
        return mbtiDimensions.map(createBarHTML).join('');
    }

    const updateSliderDisplay = (value, dimension, slider, sliderTooltip) => {
        console.log('offsetWidth: ', slider.offsetWidth)
        const trait = value < 50 ? dimension.label[0] : dimension.label[1];
        const percentage = value < 50 ? 100 - value : value;
        sliderTooltip.textContent = `${trait} ${percentage}%`;
        const position = (value / 100) * slider.offsetWidth;
        sliderTooltip.style.left = `${position}px`;
    }

    const initializeSliders = (mbtiDimensions, isSlideEnabled) => {
        mbtiDimensions.forEach(dimension => {
            const slider = document.getElementById(`${dimension.id}Slider`);
            const sliderTooltip = document.getElementById(`${dimension.id}SliderTooltip`);

            applySliderStyles(slider, sliderTooltip, dimension.color);
            updateSliderDisplay(slider.value, dimension, slider, sliderTooltip);

            if (isSlideEnabled) {
                enableSliderInteraction(slider, dimension, sliderTooltip);
            }
        });
    }

    const applySliderStyles = (slider, sliderTooltip, color) => {
        slider.style.setProperty('--slider-color', color);
        sliderTooltip.style.setProperty('--slider-color', color);
    }

    const enableSliderInteraction = (slider, dimension, sliderTooltip) => {
        slider.removeAttribute('disabled');
        let lastType = dimension.value[0] > 50 ? 1 : 0;

        slider.addEventListener('input', (e) => {
            updateSliderDisplay(e.target.value, dimension, slider, sliderTooltip);
            console.log(e.target.value);
            const index = mbtiDimensions.findIndex(d => d.id === dimension.id);
            const newValue = parseInt(e.target.value);
            mbtiDimensions[index].value[0] = newValue;
            mbtiDimensions[index].value[1] = 100 - newValue;

            const currentType = newValue > 50 ? 1 : 0;
            if (currentType !== lastType) {
                lastType = currentType;
                const personalityType = calculatePersonalityType(mbtiDimensions);
                updatePersonalityTypeDisplay(personalityType);
            }
        });
    }

    const updatePersonalityTypeDisplay = (personalityType) => {
        const headerElement = document.querySelector('.mbti-header');
        const personalityInfoElement = headerElement.querySelector('.personality-info');
        const avatarElement = headerElement.querySelector('.personality-avatar img');

        // 更新头像
        avatarElement.src = personalityType.avatar;
        avatarElement.alt = personalityType.name;

        // 更新个性类型信息
        personalityInfoElement.innerHTML = `
            <h2>${personalityType.name} (${personalityType.type})</h2>
            <span>${personalityType.desc}</span>
        `;

        // 更新或添加重置按钮
        if (config.slide) {
            document.getElementById('reset-mbti').addEventListener('click', resetMBTI);
        }
    }
    const getLocalizedContent = (content) => {
        return content[config.language];
    }

    const resetMBTI = () => {
        console.log('Resetting MBTI baseMBTIDimensions: ', baseMBTIDimensions);
        baseMBTIDimensions.forEach((dimension, index) => {
            const slider = document.getElementById(`${dimension.id}Slider`);
            const sliderTooltip = document.getElementById(`${dimension.id}SliderTooltip`);
            const initialValue = dimension.value[0];
            slider.value = initialValue;
            updateSliderDisplay(initialValue, dimension, slider, sliderTooltip);
        });
        updatePersonalityTypeDisplay(basePersonalityType);
    }

    const calculatePersonalityType = (mbtiDimensions) => {
        const type = mbtiDimensions.slice(0, 4).map(d => d.value[0] < 50 ? d.id[0].toUpperCase() : d.id[1].toUpperCase()).join('');
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

        if (mbtiDimensions.length > 4) {
            const atDimension = mbtiDimensions[4].value[0] < 50 ? 'A' : 'T';
            result.type += '-' + atDimension;
        }
        console.log('Calculated Personality Type:', result);
        return result;
    };


    const mbtiDimensions = getMBTIDimensions(config);
    const baseMBTIDimensions = JSON.parse(JSON.stringify(mbtiDimensions));
    const container = document.getElementById('mbti-container');
    const personalityType = calculatePersonalityType(mbtiDimensions);
    const basePersonalityType = JSON.parse(JSON.stringify(personalityType));
    container.innerHTML = createHeaderHTML(personalityType, config.slide) + getMBTIBars(mbtiDimensions);

    initializeSliders(mbtiDimensions, config.slide);
    if (config.slide) {
        document.getElementById('reset-mbti').addEventListener('click', () => resetMBTI());
    }
}