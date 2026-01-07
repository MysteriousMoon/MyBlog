---
title: Anki Theme - Anki 界面美化
published: 2026-01-06
slug: anki-theme
description: "一款干净、现代的 Anki 主题插件，将默认界面转变为精致的极简设计。支持浅色与深色模式自动切换，优化牌组浏览器布局与原生 UI 体验。"
image: "./cover.webp"
tags: ["技术", "工具"]
category: 技术分享
draft: false
---

在[从神经科学的视角，解析真正有效的学习方法|大脑是个预测机器 - Techleaf](https://techleaf.xyz/posts/neuroscience-effective-learning-methods/)一文中所提及的软件。

省流：一款开源免费（IOS不免费）的软件，用间隔复习算法让你更好的记住知识点。

因为太难看改了一下界面，该文是分享插件的文章，就这样。

# Anki Theme

一款干净、现代的 Anki 主题插件，将默认界面变成精致的极简设计，同时支持浅色和深色模式。

## 截图预览

![浅色模式截图](pic/Light Theme Preview.webp)
![深色模式截图](pic/Dark Theme Preview.webp)

## 安装方法

### 从 AnkiWeb 安装

https://ankiweb.net/shared/info/966384781

Code：966384781

## 设计系统

### 配色选项

颜色分别为 `light`（浅色）和 `dark`（深色）模式定义，使用十六进制颜色代码：

```json
{
    "light": {
        "background": "#f6f6f7",
        "surface": "#ffffff",
        "accent": "#4f6ef7",
        "new": "#3b82f6",
        "learn": "#f59e0b",
        "due": "#10b981"
    },
    "dark": {
        "background": "#1c1c1f",
        "surface": "#242427",
        "accent": "#7aa2ff",
        "new": "#7aa2ff",
        "learn": "#ffcc66",
        "due": "#57d39a"
    }
}
```

详细配置请参阅 [`config.md`](config.md)。

> **提示：** 修改配置后，需要重启 Anki 才能生效。

### 兼容性

- Anki 2.1+（已在 2.1.60+ 上测试）
