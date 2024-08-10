# hexo-mbti

一个用于在 Hexo 博客中展示 MBTI 性格测试结果的插件。

[![例图](https://s21.ax1x.com/2024/08/10/pAStFDx.png)](https://imgse.com/i/pAStFDx)



## 功能特性

1. 展示 MBTI 性格类型结果
2. 支持中英文切换
3. 可选的滑动条交互功能
4. 性格类型头像根据性别显示
5. 可自定义颜色方案
6. 支持重置功能
7. 支持生成并下载 MBTI 卡片图片

## 安装

```bash
npm install hexo-mbti --save
```



## 配置

在 Hexo 的 _config.yml 文件中添加以下配置:

```yaml
mbti_card:
  cdn: false
  language: 'zh'
  gender: 'male'
  slide: true
  layout: "about"
  data:
    'E-I': [35, 65]
    'N-S': [59, 41]
    'T-F': [45, 55]
    'J-P': [62, 38]
    'A-T': [57, 43]
  color: ["#4298b4", "#e4ae3a", "#33a474", "#88619a", "#f25e62"]
  tooltip:
    showTooltipBackground: false

```

## 配置说明

```html
cdn: 是否使用 CDN 加载资源文件
language: 语言设置,支持 'zh' (中文) 和 'en' (英文)
gender: 性别设置,可选 'male' 或 'female'
slide: 是否启用滑动条交互功能
layout: 插入 MBTI 卡片的页面位置,可以是单个页面如 'about',也可以是数组 ['about', 'post']
data: MBTI 各维度的得分数据,格式为 [左侧特质得分, 右侧特质得分]
color: MBTI 各维度的颜色设置,按 E-I, N-S, T-F, J-P, A-T 顺序
tooltip: 工具提示配置
	showTooltipBackground: 是否显示工具提示背景
```



## 使用

配置完成后在需要展示的页面插入，用以挂载`mbti card`

```html
<div class="mbti-card" id="mbti-container">
    <!--挂载mbti card-->    
</div>
```



## 许可证

ISC

