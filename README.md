# hexo-mbti

一个用于在 Hexo 博客中展示 MBTI 性格测试结果的插件。

[![例图](https://s21.ax1x.com/2024/08/10/pAStFDx.png)](detailed card 效果)

`detailed card 效果`

------

[![例图](https://s21.ax1x.com/2024/08/24/pAFNK6U.png)](brief card [style:classic]效果)

`brief card [style:classic]效果`



## 功能特性

1. 展示 MBTI 性格类型结果
2. 支持中英文切换
3. 可选的滑动条交互功能
4. 性格类型头像根据性别显示
5. 可自定义颜色方案
6. 支持重置功能
7. 支持生成并下载 MBTI 卡片图片
8. 支持多种卡片类型: 详细(detailed)、简要(brief)和气泡(bubble)

## 安装

```bash
npm install hexo-mbti --save
```



## 配置

在 Hexo 的 _config.yml 文件中添加以下配置:

```yaml
mbti_card:
  language: 'zh'
  gender: 'male'
  cdn: false
  cards:
    - cardType: 'detailed'
      enable: true
      layout: "about"
      slide: true
      data:
        'E-I': [35, 65]
        'N-S': [59, 41]
        'T-F': [45, 55]
        'J-P': [62, 38]
        'A-T': [57, 43]
      color: ["#4298b4", "#e4ae3a", "#33a474", "#88619a", "#f25e62"]
      tooltip:
        showTooltipBackground: false

    - cardType: 'brief'
      enable: true
      layout: "about"
      type: "ENFP-A"
      style: 'comic'
      interaction:
      	slide: true
      	switch: true
      	download: true

    - cardType: 'bubble'
      enable: false
      layout: "about"
      size: 'small'

```

## 配置说明

#### 1、详细卡片(detailed)

```javascript
enable: 是否启用该卡片
layout: 插入卡片的页面位置
slide: 是否启用滑动条交互功能，启用slide功能,可调整各维度的数值，实时更新人格类型的显示
data: MBTI 各维度的得分数据,格式为 [左侧特质得分, 右侧特质得分]
	data配置支持两种格式:
		1、使用英文标签: 'E-I', 'N-S', 'T-F', 'J-P', 'A-T'
		2、使用本地化标签: 根据language设置使用对应语言的标签，如
			对于英文(language: 'en'):
				'Extraverted-Introverted'
				'Intuitive-Observant'
				'Thinking-Feeling'
				'Judging-Prospecting'
				'Assertive-Turbulent'
			对于中文(language: 'zh'):
				'外向-内向'
				'有远见-现实'
				'理性分析-感受'
				'评判-展望'
				'坚决-起伏不定'
color: MBTI 各维度的颜色设置,按 E-I, N-S, T-F, J-P, A-T 顺序
tooltip: 工具提示配置
	showTooltipBackground: 是否显示工具提示背景
```

#### 2、简要卡片 (brief)

```javascript
enable: 是否启用该卡片
layout: 插入卡片的页面位置
type: 人格类型 如ENFP-A或ENFP
style: 卡片风格，风格不同，卡片的样式、人格图像、描述等都不一样，默认'classic'， 取16personalities的人格形象
interaction: 交互效果
	slide: 是否启用滑动，启用可滑动切换人格
	switch: 是否启用风格切换，启用可切换不同卡片风格
	download: 是否启用下载， 启用可下载成图片
```

#### 3、气泡卡片 (bubble)

```javascript
enable: 是否启用该卡片
layout: 插入卡片的页面位置
size: 气泡大小,可选 'small', 'medium', 'large'
```

## 使用

配置完成后在需要展示的页面插入以下代码，用以挂载`mbti card`，类型不同，容器id也不同。例如：

```html
<!--detailed-->  
<div class="mbti-card" id="mbti-detailed-container">
    <!--挂载mbti card-->    
</div>
<!--brief-->  
<div class="mbti-card" id="mbti-brief-container">
    <!--挂载mbti card-->    
</div>
```



## 许可证

ISC

