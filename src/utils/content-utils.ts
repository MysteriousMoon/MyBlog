import { type CollectionEntry, getCollection } from "astro:content";
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { getCategoryUrl } from "@utils/url-utils.ts";

import { siteConfig } from "src/config";

// Get the effective slug for a post (custom slug from frontmatter or default from file path)
export function getPostSlug(post: CollectionEntry<"posts">): string {
	return post.data.slug || post.slug;
}

// Check if a post is a translation (has alternateSlug and is not the site's default language)
function isTranslation(post: CollectionEntry<"posts">): boolean {
	if (!post.data.alternateSlug) return false;
	const postLang = post.data.lang || siteConfig.lang;
	return postLang !== siteConfig.lang;
}

// Retrieve ALL posts (including translations) and sort by publication date - used for page generation
async function getRawAllPosts() {
	const allBlogPosts = await getCollection("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	const sorted = allBlogPosts.sort((a, b) => {
		const dateA = new Date(a.data.published);
		const dateB = new Date(b.data.published);
		return dateA > dateB ? -1 : 1;
	});
	return sorted;
}

// Retrieve posts excluding translations - used for listing (homepage, archive, etc.)
async function getRawSortedPosts() {
	const allPosts = await getRawAllPosts();
	// Filter out translations (posts with alternateSlug that are not in the site's default language)
	return allPosts.filter((post) => !isTranslation(post));
}

// Get ALL sorted posts with prev/next links - used for static page generation
export async function getSortedPosts() {
	const sorted = await getRawAllPosts();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = getPostSlug(sorted[i - 1]);
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = getPostSlug(sorted[i + 1]);
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}

// Get sorted posts excluding translations - used for homepage and listing pages
export async function getSortedPostsForList() {
	const sorted = await getRawSortedPosts();

	for (let i = 1; i < sorted.length; i++) {
		sorted[i].data.nextSlug = getPostSlug(sorted[i - 1]);
		sorted[i].data.nextTitle = sorted[i - 1].data.title;
	}
	for (let i = 0; i < sorted.length - 1; i++) {
		sorted[i].data.prevSlug = getPostSlug(sorted[i + 1]);
		sorted[i].data.prevTitle = sorted[i + 1].data.title;
	}

	return sorted;
}
export type PostForList = {
	slug: string;
	data: CollectionEntry<"posts">["data"];
};
export async function getSortedPostsList(): Promise<PostForList[]> {
	const sortedFullPosts = await getRawSortedPosts();

	// delete post.body
	const sortedPostsList = sortedFullPosts.map((post) => ({
		slug: getPostSlug(post),
		data: post.data,
	}));

	return sortedPostsList;
}
export type Tag = {
	name: string;
	count: number;
};

export async function getTagList(): Promise<Tag[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	// Filter out translations
	const filteredPosts = allBlogPosts.filter((post) => !isTranslation(post));

	const countMap: { [key: string]: number } = {};
	filteredPosts.forEach((post: { data: { tags: string[] } }) => {
		post.data.tags.forEach((tag: string) => {
			if (!countMap[tag]) countMap[tag] = 0;
			countMap[tag]++;
		});
	});

	// sort tags
	const keys: string[] = Object.keys(countMap).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	return keys.map((key) => ({ name: key, count: countMap[key] }));
}

export type Category = {
	name: string;
	count: number;
	url: string;
};

export async function getCategoryList(): Promise<Category[]> {
	const allBlogPosts = await getCollection<"posts">("posts", ({ data }) => {
		return import.meta.env.PROD ? data.draft !== true : true;
	});

	// Filter out translations
	const filteredPosts = allBlogPosts.filter((post) => !isTranslation(post));

	const count: { [key: string]: number } = {};
	filteredPosts.forEach((post: { data: { category: string | null } }) => {
		if (!post.data.category) {
			const ucKey = i18n(I18nKey.uncategorized);
			count[ucKey] = count[ucKey] ? count[ucKey] + 1 : 1;
			return;
		}

		const categoryName =
			typeof post.data.category === "string"
				? post.data.category.trim()
				: String(post.data.category).trim();

		count[categoryName] = count[categoryName] ? count[categoryName] + 1 : 1;
	});

	const lst = Object.keys(count).sort((a, b) => {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	const ret: Category[] = [];
	for (const c of lst) {
		ret.push({
			name: c,
			count: count[c],
			url: getCategoryUrl(c),
		});
	}
	return ret;
}
