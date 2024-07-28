function createBarHTML(dimension) {
    return `
      </div>
        <div class="trait-container">
            <span class="trait-left">${dimension.label[0]}</span>
            <div class="slider-container">
                <input type="range" min="0" max="100" value="${dimension.value[0]}" class="slider" id="${dimension.id}Slider" disabled>
                <div id="${dimension.id}SliderValue" class="slider-value"></div>
            </div>
            <span class="trait-right">${dimension.label[1]}</span>
        </div>
    `;
}

function getMBTIDimensions(config) {
    return [
        { id: 'ei', label: ['外向', '内向'], value: config.data['E-I'] || config.data['外向-内向'], color: config.color[0] },
        { id: 'sn', label: ['有远见', '现实'], value: config.data['S-N'] || config.data['有远见-现实'], color: config.color[1] },
        { id: 'tf', label: ['理性分析', '感受'], value: config.data['T-F'] || config.data['理性分析-感受'], color: config.color[2] },
        { id: 'jp', label: ['评判', '展望'], value: config.data['J-P'] || config.data['评判-展望'], color: config.color[3] },
        { id: 'at', label: ['坚决', '起伏不定'], value: config.data['A-T'] || config.data['坚决-起伏不定'], color: config.color[4] },
    ];
}

function getMBTIBars(mbtiDimensions) {
    return mbtiDimensions.map(createBarHTML).join('');
}

function updateSliderValue(value, dimension, slider, sliderValue) {
    console.log('offsetWidth: ', slider.offsetWidth)
    const trait = value < 50 ? dimension.label[0] : dimension.label[1];
    const percentage = value < 50 ? 100 - value : value;
    sliderValue.textContent = `${trait} ${percentage}%`;
    const position = (value / 100) * slider.offsetWidth;
    sliderValue.style.left = `${position}px`;

}

function addSliderListeners(mbtiDimensions, slide) {
    console.log('slide: ', slide);
    mbtiDimensions.forEach(dimension => {
        const slider = document.getElementById(`${dimension.id}Slider`);
        const sliderValue = document.getElementById(`${dimension.id}SliderValue`);
        slider.style.setProperty('--slider-color', dimension.color);
        sliderValue.style.setProperty('--slider-color', dimension.color);

        // 触发初始化事件
        const event = new Event('input');
        slider.dispatchEvent(event);

        updateSliderValue(slider.value, dimension, slider, sliderValue);

        if (slide) {
            slider.removeAttribute('disabled');
            slider.addEventListener('input', (e) => {
                console.log(e.target.value);

                updateSliderValue(slider.value, dimension, slider, sliderValue);


            });
        }
    });
}