---
title: TrendRadar-打造你的专属热点聚合（UI美化+RSS增强版）
published: 2025-11-23
slug: trendradar-enhanced-ui-rss
description: "基于 TrendRadar 进行二次开发，优化页面 UI 并增加 RSS 订阅支持，助你高效监控全网热点。"
image: "./cover.webp"
tags: ["技术", "工具"]
category: 技术分享
draft: false
---

> * **原项目地址**：[sansan0/TrendRadar](https://github.com/sansan0/TrendRadar)
> * **本修改版地址**：[MysteriousMoon/TrendRadar](https://github.com/MysteriousMoon/TrendRadar)
> * **主要改动**：基于原版逻辑，深度美化了页面 UI 样式，并新增了 RSS 订阅支持。

🔗 快速访问

* **在线演示**：[点击访问 TrendRadar](https://mysteriousmoon.github.io/TrendRadar/)
* **RSS 订阅**：[点击获取 RSS 地址](https://mysteriousmoon.github.io/TrendRadar/rss.xml)

下述介绍内容以我修改后的为主：

# 项目简介

![网页展示-横向合并](./pic/%E7%BD%91%E9%A1%B5%E5%B1%95%E7%A4%BA-%E6%A8%AA%E5%90%91%E5%90%88%E5%B9%B6.webp)

- 如图，图中汇总了各个网站的热点信息，并且根据关键词筛选了出来，右边还有热度和霸榜次数（根据此排行算出热点事件）。
  - 每小时抓取一次，进行统计排序
  - 每日刷新统计次数，热度等信息进行重新排序

- **TrendRadar** 是一个旨在解决“信息过载”问题的实时热点聚合爬虫工具，它能够帮助用户高效地监控全网热点。

- **TrendRadar** 能够监控并聚合来自社交媒体、视频网站、财经媒体等媒介的实时热点资讯。
  - 财联社热门 澎湃新闻
  - 贴吧
  - bilibili 抖音

- **TrendRadar**一旦监控到重要热点或完成了分析，可以通过多种渠道通知你：

  - 企业微信、飞书、钉钉

  - 个人微信、Telegram

  - 邮件、ntfy

- **TrendRadar**可以部署在GitHub Pages上，各种热点事件也很容易自定义。也可以部署在docker上。

# 使用指南

## 1. 开箱即用

如果你不想折腾代码，可以直接访问我已经部署好的服务：

* **最新热点**：[https://mysteriousmoon.github.io/TrendRadar/](https://mysteriousmoon.github.io/TrendRadar/)
* **历史归档**：[Archive 页面](https://mysteriousmoon.github.io/TrendRadar/archive/index.html)
* **RSS 订阅**：`https://mysteriousmoon.github.io/TrendRadar/rss.xml`

> **⚠️ 注意事项**：
> 本项目服务器时间基于 **加拿大多伦多时间 (EST/EDT)**，与中国时间存在时差，请在查看更新时间时留意。

## 2. 自行部署

如果你希望拥有自己的关键词过滤规则，或修改页面配置，可以按照以下步骤 Fork 部署：

1. **Fork 项目**
   访问 [MysteriousMoon/TrendRadar](https://github.com/MysteriousMoon/TrendRadar)，点击右上角的 **Fork** 按钮，将项目复制到你的 GitHub 仓库。

2. **修改配置文件**
   在 `config` 文件夹中找到 `config.yaml` 文件进行编辑：

   * **时区设置**：修改 `app:timezone` 为你所在的时区（如 `Asia/Shanghai`）。
   * **RSS 配置**：如需开启 RSS，请在文件底部的 `rss` 参数处进行配置。

3. **配置筛选关键词**
   编辑 `config` 文件夹中的 `frequency_words.txt`。支持基础语法与高级语法，可参考 README 文档进行精细化过滤。

   ![语法配置](./pic/%E8%AF%AD%E6%B3%95%E9%85%8D%E7%BD%AE.webp)

4. **启用 GitHub Action**
   进入仓库的 Actions 页面，启用 **Hot News Crawler** 工作流。

5. **开启 GitHub Pages**
   在仓库设置中启用 Pages 服务（或根据 Action 输出选择）。

6. **访问你的站点**
   部署完成后，访问 `https://<你的用户名>.github.io/TrendRadar/` 即可看到专属的热点雷达。

---

在封闭的平台互联网中利用技术重塑我们的认知边界
