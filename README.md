# hexo-mbti

一个用于在 Hexo 博客中展示 MBTI 性格测试结果的插件。

![例图](https://s21.ax1x.com/2024/08/10/pAStFDx.png "detailed card 效果")

`detailed card 效果`

------

![例图](https://s21.ax1x.com/2024/08/24/pAFNK6U.png "brief card [style:classic]效果")

`brief card [style:classic]效果`

![例图](https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti/example/mbti-resize.gif "mbti resize")

![例图](https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti/example/mbti-switch.gif "mbti switch")

## 功能特性

- 两种种卡片类型：详细(detailed)、简要(brief)
- 多语言支持（中/英文）
- 性别相关头像显示
- 自定义颜色方案
- 交互功能（滑动条/风格切换/下载）
- 响应式布局支持

## 安装

```bash
npm install hexo-mbti --save
```

---


## 全局配置
```yaml
mbti_card:
  language: 'zh'       # 界面语言 (zh/en)
  gender: 'male'       # 头像性别 (male/female)
  cdn: false           # 是否使用CDN加载资源
  cards:               # 卡片配置数组
    - [卡片类型配置]
```

## 卡片类型配置

### 1. 详细卡片 (detailed)
```yaml
cardType: 'detailed'
enable: true          # 是否启用
layout: "about"       # 插入位置（支持自定义布局名称）
slide: true           # 启用维度滑动条
data:                 # 维度数据配置
  'E-I': [35, 65]     # 支持本地化标签（见下方说明）    
  'N-S': [59, 41]
  'T-F': [45, 55]
  'J-P': [62, 38]
  'A-T': [57, 43]
color:                # 维度颜色（顺序：E-I, N-S, T-F, J-P, A-T）
  - "#4298b4"
  - "#e4ae3a"
  - "#33a474"
  - "#88619a"
  - "#f25e62"
tooltip:
  showTooltipBackground: false  # 工具提示背景
```

**数据标签说明**：
```yaml
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
```
### 2. 简要卡片 (brief)
```yaml
cardType: 'brief'
enable: true
type: "ENFP-A"        # 人格类型（支持A/T后缀）
style: 'comic'        # 风格选项：[简要卡片 (brief) 风格库]
interaction:
  slide: true         # 滑动切换人格
  switch: true        # 风格切换按钮
  download: true      # 下载功能
  resize: true        # 响应式尺寸调整（新增配置）
```

### 简要卡片 (brief) 风格库

```yaml
style: 'classic'  # 可选风格详见下方分类说明
```

#### 风格分类说明

| 分类         | 风格名称            | 作者/来源            | 性别支持 | 字体样式                 | 图片类型 | 特别说明            |
| ------------ | ------------------- | -------------------- | -------- | ------------------------ | -------- | ------------------- |
| **经典系列** | classic             | Sourcegraph          | ❌        | Red Hat Display          | JSON     | 官方标准风格        |
|              | classic_pattern_3   | Sourcegraph          | ✅        | Red Hat Display          | PNG      | 带纹理的经典变体    |
| **插画系列** | illustration        | Shadoowww__          | ❌        | Rammetto One             | JPG      | 扁平插画风格        |
|              | illustration_3      | toptier sensor       | ❌        | Sue Ellen Francisco      | PNG      | 现代矢量插画        |
| **漫画系列** | comic               | mbti_as_things       | ✅        | 汉仪飞丽简 + Lilita One  | PNG      | 美式漫画风格        |
|              | Korean_comic        | FJ                   | ❌        | Annie Use Your Telescope | PNG      | 韩式条漫风格        |
| **地域风格** | Mexico              | *.space.cadette.*    | ❌        | Sacramento               | PNG      | 墨西哥剪纸艺术      |
|              | Sanrio              | Sanrio 官方          | ❌        | Gloria Hallelujah        | PNG      | 三丽鸥卡通风格      |
| **极简线条** | simple_line_color   | VIENNTJ              | ❌        | Single Day               | PNG      | 单色线条艺术        |
|              | simple_line_color_2 | VIENNTJ              | ✅        | Yatra One                | PNG      | 双色渐变线条        |
| **AI 生成**  | ai_layered_paper    | baobaodz (MJ prompt) | ❌        | Protest Guerrilla        | PNG      | 3D 纸艺分层效果     |
|              | ai_Pixar            | baobaodz (MJ prompt) | ❌        | New Amsterdam            | PNG      | 皮克斯动画风格      |
| **主题系列** | fantasy             | akklonia             | ❌        | Barlow Condensed         | PNG      | 奇幻角色风格        |
|              | Disney_princesses   | LittleMsArtsy        | ❌        | Pangolin                 | PNG      | 迪士尼公主主题      |
|              | work                | mbti.friendly        | ❌        | Archivo Black            | PNG      | 职场主题设计        |
|              | animals             | ProvenPsychology     | ❌        | Pangolin                 | PNG      | 动物拟人化风格      |
| **萌系风格** | cat                 | -                    | ❌        | Architects Daughter      | PNG      | 猫系角色主题        |
|              | classic_cute        | -                    | ❌        | Architects Daughter      | PNG      | 经典风格的 Q 版变体 |

#### 风格图片示例

![例图](https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti/example/example_1.png "brief card styles")

![例图](https://cdn.jsdelivr.net/gh/baobaodz/picx-images-hosting@master/hexo-mbti/example/example_2.png "brief card styles")

#### 特性说明

1. **性别支持**：标注 ✅ 的风格会根据配置的 `gender` 值显示不同性别形象
2. **字体继承**：未指定中文字体时自动继承网站默认字体
3. 图片格式
   - JSON：动态生成的矢量图形
   - PNG/JPG：静态图片资源
4. **作者标注**：标注 `(MJ prompt)` 的为 Midjourney 生成作品

#### 配置示例

```yaml
interaction:
  switch: true  # 启用后可实时切换所有风格
```



## 页面集成
在目标布局文件中添加容器（需与layout配置对应）：
```html
<!-- 详细卡片 -->
<div class="mbti-card" id="mbti-detailed-container"></div>

<!-- 简要卡片 -->
<div class="mbti-card" id="mbti-brief-container"></div>

<!-- 气泡卡片 -->
<div class="mbti-card" id="mbti-bubble-container"></div>
```

## 版本更新说明
v2.0.0 新增特性：
1. 新增`resize`交互配置项，支持动态尺寸调整
2. `brief`卡片新增17余种风格选择
3. 配置合并策略优化，支持层级覆盖
4. 增强移动端适配能力

## 许可证
ISC



