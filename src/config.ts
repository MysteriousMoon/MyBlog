import type {
	ExpressiveCodeConfig,
	GiscusConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "Techleaf",
	subtitle: "Blog",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: false,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{
			src: "/favicon/favicon.svg",
			sizes: "any",
		},
		{
			src: "/favicon/favicon.ico",
			sizes: "48x48",
		},
		{
			src: "/favicon/favicon-96x96.png",
			sizes: "96x96",
		},
		{
			src: "/favicon/web-app-manifest-192x192.png",
			sizes: "192x192",
		},
		{
			src: "/favicon/web-app-manifest-512x512.png",
			sizes: "512x512",
		},
		{
			src: "/favicon/apple-touch-icon.png",
			sizes: "180x180",
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		// {
		// 	name: "GitHub",
		// 	url: "https://github.com/MysteriousMoon", // Internal links should not include the base path, as it is automatically added
		// 	external: true, // Show an external link icon and will open in a new tab
		// },
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/cat-icon.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "Billy Xu",
	bio: ["郑重当下事，郑重眼前人。", "那些善于处世 理事有方的人 实在离我们太远"],
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://github.com/MysteriousMoon",
		},
		{
			name: "LinkedIn",
			icon: "fa6-brands:linkedin",
			url: "https://www.linkedin.com/in/billy-xu-733343329/",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

export const giscusConfig: GiscusConfig = {
	enable: true,
	repo: "MysteriousMoon/MyBlog",
	repoId: "R_kgDOQBGKoQ",
	category: "Announcements",
	categoryId: "DIC_kwDOQBGKoc4C0Fwg",
	mapping: "pathname",
	strict: false,
	reactionsEnabled: true,
	emitMetadata: false,
	inputPosition: "bottom",
	lang: "zh-CN",
	loading: "lazy",
};
