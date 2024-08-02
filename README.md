# hexo-mbti

一个用于在 Hexo 博客中展示 MBTI 性格测试结果的插件。

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
    'E-I': [40, 60]
    'S-N': [20, 80]
    'T-F': [20, 80]
    'J-P': [20, 80]
    'A-T': [20, 80]
  color: ["#4298b4", "#e4ae3a", "#33a474", "#88619a", "#f25e62"]
```

## 配置说明

```html
cdn: 是否使用 CDN 加载资源文件
language: 语言设置,目前支持 'zh' (中文), 'en'(英文)
gender: 性别设置,可选 'male' 或 'female'
slide: 是否启用滑动条交互
layout: 插入 MBTI 卡片的页面位置，如'about','post'
data: MBTI 各维度的得分数据
color: MBTI 各维度的颜色设置
```

## 使用

配置完成后,插件会自动在指定的 layout 页面中插入 MBTI 性格测试结果卡片。

## 许可证

ISC

