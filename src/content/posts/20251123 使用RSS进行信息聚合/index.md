---
title: 如何把YouTube、个人播客、新闻站点装进一个APP里——“RSS” 入门教程
published: 2025-11-23
slug: rss-guide-tools-rsshub
description: "RSS-它能帮你将B站、知乎、博客甚至交易所公告聚合在一处。省去四处跑网站的烦恼，从零打造专属的阅读流。"
image: "./cover.webp"
tags: ["技术", "工具"]
category: 技术分享
draft: false
---

每天早上，你是否需要重复以下动作：打开微博看热搜，切到 B站看关注的 UP 主，打开公众号看推文，再不得不忍受知乎的开屏广告…… 原本为了获取信息，我们不得不打开 10 个不同的网站或 APP 。

是时候试试 **RSS** 了。

# 1.什么是RSS

## RSS简介

**RSS** (Really Simple Syndication)

![folo页面展示](./pic/folo%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.webp)

如图所示，这就是 RSS 的作用——无论是你追更的 B 站 UP 主、小众的独立 Blog，还是各类周刊，**RSS 把它们从散落的网页里抓取出来，统一集合在这一处。**原本你需要打开 10 个网站才能看完的信息，现在只需要打开这 1 个 APP。

准确地说，RSS 是网站与你之间的一种“订阅协议”，有很多APP都支持这个协议（所以说很多APP都能使用RSS）。 你不需要懂代码，只需要把它理解为一个自动同步机制：你的阅读器会替你全天候监控这些平台，一旦检测到内容更新，就会立刻抓取过来。不用点击跳转，不用加载广告，内容原本是什么样，你看到就是什么样。就像一个定时的爬虫，不过是合法合规的。

注：不是所有网站都有RSS，不过理论上都可以手动制作。

## RSS实例：

- 本博客的：https://techleaf.xyz/rss.xml

打开之后长这样：

![RSS_XML展示](./pic/RSS_XML%E5%B1%95%E7%A4%BA.webp)

这就是标准的XML格式的文件，每次RSS客户端就会对此URL进行查询，若有更新则更新在客户端内。

# 2.为什么需要RSS

- 不错过自己需要的信息-订阅自己需要的平台
- 避开平台推荐的信息-不用打开平台就能看见内容
- 高效简洁-不用打开多个网站查看是否更新
- 主动接收信息-你可以定义RSS刷新的时间，不再被红点通知绑架

信息管理的必备步骤.jpg

# 3.寻找订阅源

- 方法一：寻找网页图标

​	留意网站顶部或底部的 **信号状图标**（如文章封面中心的橙色图标），或者写着 "RSS"、"Feed" 的链接 。

- 方法二：手动猜测

  很多网站遵循通用的命名规则，尝试在域名后加上以下后缀 ：

  - `/rss.xml` (例如：`https://techleaf.xyz/rss.xml` )
  - `/feed`
  - `/atom.xml`

- 方法三：使用浏览器插件【最好用的方式】

​	让工具帮你找。安装 **RSSHub Radar** 或 **RSS Feed URL Finder** 等浏览器扩展 。

​	[RSSHub Radar - Chrome 应用商店](https://chromewebstore.google.com/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa?hl=zh-CN)

​	[RSS Feed URL Finder - Chrome 应用商店](https://chromewebstore.google.com/detail/rss-feed-url-finder/apfhghblgifegckccakakdlbjcdnbjmb?hl=zh-CN)

​	如图，当你访问某个网页时，如果检测到 RSS，插件图标会亮起并显示数量（如 B站、GitHub 等页面） 。

![RSS探测_RSS](./pic/RSS%E6%8E%A2%E6%B5%8B_RSS.webp)



# 4.如何使用

订阅源配合一个客户端

## 订阅源-提供RSS的服务端

- https://techleaf.xyz/rss.xml 本博客
- https://trendradar.techleaf.xyz/rss.xml 热点聚合器
  - （参考本博客文章[TrendRadar-打造你的专属热点聚合（UI美化+RSS增强版） - Techleaf](https://techleaf.xyz/posts/trendradar-enhanced-ui-rss/)）
- https://feeds.feedburner.com/ruanyifeng
  - 科技爱好者周刊，定时分享高质量科技信息
- https://wiki.eryajf.net/rss.xml
  - 也是一个IT有关的周刊
- 更多订阅源：
  - [个人向的 RSS 订阅推荐 – River's Blog](https://www.moon-odyssey.com/personal-rss-feed-recommendations/)
  - [2025 年了，你还会用 RSS 吗？有哪些好的订阅源推荐？ - 知乎](https://www.zhihu.com/question/12917357576)
  - [amazingcoderpro/rss-recomanded: 值得推荐 RSS 订阅源整理，不定时持续更新](https://github.com/amazingcoderpro/rss-recomanded)

注：订阅源不是越多越好。若关注一堆低质量信息，那和去刷短视频无异。

## 客户端-APP-选择一个合适的

- [Feedly: Track the topics and trends that matter to you](https://feedly.com/)
  - 老牌RSS应用。
  - 免费版有一定限制（100个订阅源），基本等于没有。
  - 比较适合新手体验，日后转战平台也不迟，是单纯的RSS
- [Folo — AI-powered RSS reader for deep, noise-free reading with contextual AI.](https://folo.is/)
  - 比较火的一个RSS客户端，全平台+Web支持。
  - AI功能需要订阅解锁。
  - 比较适合追求新技术的用户——RSS是否要引入AI还有待讨论，但是这个应用中避不开
  - 内置很多路由，能订阅别的软件订阅不了的东西
- [Readwise](https://readwise.io/)
  - 这不仅仅是个RSS订阅软件。
  - 整合了稍后读记忆卡笔记等功能，但价格较贵。
- [DEVONtechnologies | DEVONthink, professional document and information manager for Mac and iOS.](https://www.devontechnologies.com/apps/devonthink)
  - Mac Only
  - 强大的文档管理工具，内置 RSS 功能，不仅是阅读更是归档。
  - 界面风格偏复古，学习曲线陡峭，价格较高；不好看，不好看，不好看；很贵，很贵，很贵

## 导入订阅源

关于如何导入订阅源，各大软件操作逻辑基本一致。都是在点击加号后输入Rss地址。

![添加RSS](./pic/%E6%B7%BB%E5%8A%A0RSS.webp)

# 5.RSSHub制作RSS

之前提到-不是每个网站都支持RSS。那我就是想要怎么办呢？

这时候就需要 **RSSHub** 了。这是一个开源项目，它能像爬虫一样，把不支持 RSS 的网站强制生成为 RSS 订阅源 。

此内容相对高阶，需要一定时间去折腾。

项目地址：[RSSHub](https://docs.rsshub.app/zh/)

更多详见：[🌟 热门 | RSSHub](https://docs.rsshub.app/zh/routes/popular)

支持了众多接口（如图）：

![RSSHub页面展示](./pic/RSSHub%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.webp)

配合[RSSHub Radar - Chrome 应用商店](https://chromewebstore.google.com/detail/rsshub-radar/kefjpfngnndepjbopdmoebkipbgkggaa?hl=zh-CN)的拓展，就会告诉你哪里有RSSHub的路由了。

![RSS探测_RSSHub](./pic/RSS%E6%8E%A2%E6%B5%8B_RSSHub.webp)

# 6.写在最后：打造属于你的信息领域

在这个算法无孔不入的时代，我们似乎习惯了被动投喂。信息爆炸带来了焦虑，个性化推荐编织了茧房，原本为了节省时间的工具，最终却吞噬了我们的时间。

RSS 的复兴，本质上是一场关于注意力的“自救运动”。在这里，没有旨在留存时长的算法，也没有通过窥探隐私换来的精准广告。它把选择权重新交还给你：看什么、什么时候看、看多少，全由你说了算。

这或许就是 RSS 这项诞生于 2000 年的古老协议，在 2025 年依然熠熠生辉的原因——**当互联网疯狂向前狂奔时，有时候我们要找的答案，恰恰藏在过去。**

---

欢迎通过RSS订阅本站

https://techleaf.xyz/rss.xml
