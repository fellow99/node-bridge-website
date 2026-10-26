# node-bridge-website

[English](README.md) · [**中文**](README_zh.md)

Node Bridge 家族的项目官网——介绍在 Android 与鸿蒙上把**真正的 Node.js 运行时嵌进应用进程**
（`dlopen("libnode.so")` + `node::Start`，每个平台各一对桥包 + 运行时包）的四个仓库：

- [aosp-node-bridge](https://github.com/fellow99/aosp-node-bridge) / [aosp-node-runtime](https://github.com/fellow99/aosp-node-runtime)——Kotlin/JNI，发布于 Maven Central
- [ohos-node-bridge](https://github.com/fellow99/ohos-node-bridge) / [ohos-node-runtime](https://github.com/fellow99/ohos-node-runtime)——ArkTS/NAPI，发布于 ohpm

线上站点：<https://fellow99.github.io/node-bridge-website/>

## 技术栈

纯 HTML、CSS、JavaScript——无框架、无构建步骤、无外部请求：

```
node-bridge-website/
├── index.html          # English
├── index_zh.html       # 简体中文
├── style.css           # 设计令牌驱动的浅色/暗色主题
├── script.js           # 主题切换、导航高亮、滚动渐入
├── images/logo.svg     # favicon / 品牌标识
└── .github/workflows/pages.yml
```

- **主题**：在 `<html>` 上切换 `data-theme`；首屏渲染前选定（localStorage → 系统偏好），按浏览器持久化。
- **语言**：两个静态页面互链（无 JS 路由，`file://` 直接打开也能用）。
- **无障碍**：跳转链接、ARIA 标签、减弱动效支持、可见焦点环。

## 本地预览

直接用浏览器打开 `index.html` 即可；也可以起个静态服务：

```bash
npx serve .
```

推送到 `main` 后由 GitHub Pages 工作流（`.github/workflows/pages.yml`）自动部署。

## 许可

[MIT](LICENSE)
