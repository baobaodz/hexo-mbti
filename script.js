const mbtiDimensions = [
    { id: 'ei', label: ['外向', '内向'], value: [40, 60], color: '#4298b4' },
    { id: 'sn', label: ['有远见', '现实'], value: [50, 50], color: '#e4ae3a' },
    { id: 'tf', label: ['理性分析', '感受'], value: [50, 50], color: '#33a474' },
    { id: 'jp', label: ['评判', '展望'], value: [50, 50], color: '#88619a' },
    { id: 'at', label: ['坚决', '起伏不定'], value: [50, 50], color: '#f25e62' },
];

function createBarHTML(dimension) {
    return `
      </div>
        <div class="trait-container">
            <span class="trait-left">${dimension.label[0]}</span>
            <div class="slider-container">
                <input type="range" min="0" max="100" value="${dimension.value[0]}" class="slider" id="${dimension.id}Slider">
                <div id="${dimension.id}SliderValue" class="slider-value"></div>
            </div>
            <span class="trait-right">${dimension.label[1]}</span>
        </div>
    `;
}

function renderMBTIBars() {
    const container = document.getElementById('mbti-container');
    const barsHTML = mbtiDimensions.map(createBarHTML).join('');
    container.innerHTML = barsHTML;
}
renderMBTIBars();

function updateSliderValue(value, dimension, slider, sliderValue) {
    console.log('offsetWidth: ', slider.offsetWidth)
    const trait = value < 50 ? dimension.label[0] : dimension.label[1];
    const percentage = value < 50 ? 100 - value : value;
    sliderValue.textContent = `${trait} ${percentage}%`;
    const position = (value / 100) * slider.offsetWidth;
    sliderValue.style.left = `${position}px`;

    // sliderValue.style.transform = `translateX(${value}%)`;
}

function addSliderListeners() {
    mbtiDimensions.forEach(dimension => {
        const slider = document.getElementById(`${dimension.id}Slider`);
        const sliderValue = document.getElementById(`${dimension.id}SliderValue`);
        slider.style.setProperty('--slider-color', dimension.color);
        sliderValue.style.setProperty('--slider-color', dimension.color);

        // 触发初始化事件
        const event = new Event('input');
        slider.dispatchEvent(event);

        updateSliderValue(slider.value, dimension, slider, sliderValue);
        slider.addEventListener('input', (e) => {
            console.log(e.target.value);

            updateSliderValue(slider.value, dimension, slider, sliderValue);


        });
    });
}

addSliderListeners();