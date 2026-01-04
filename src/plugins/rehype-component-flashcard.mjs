/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Creates a FlashCard component.
 *
 * Usage in markdown:
 * :::flashcard
 * 问题内容
 * ???
 * 答案内容
 * :::
 *
 * Or with hint:
 * :::flashcard{hint="这是提示"}
 * 问题内容
 * ???
 * 答案内容
 * :::
 *
 * @param {Object} properties - The properties of the component.
 * @param {string} [properties.hint] - Optional hint text.
 * @param {import('mdast').RootContent[]} children - The children elements of the component.
 * @returns {import('mdast').Parent} The created FlashCard component.
 */
export function FlashCardComponent(properties, children) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid flashcard directive. (Flashcard directives must be of block type ":::flashcard <question> ??? <answer> :::")',
		);

	const cardId = `fc-${Math.random().toString(36).substring(2, 9)}`;
	const hint = properties?.hint || null;

	// Parse children to separate question and answer
	// Separator is "???" to avoid conflict with Markdown's --- (setext h2 / hr)
	let questionParts = [];
	let answerParts = [];
	let foundSeparator = false;

	for (const child of children) {
		// Check if paragraph contains "???" separator
		if (
			!foundSeparator &&
			(child.tagName === "p" || child.type === "paragraph")
		) {
			const textContent = extractText(child);

			// Exact match for "???" in a paragraph
			if (textContent.trim() === "???") {
				foundSeparator = true;
				continue;
			}

			// Contains "???" inside text (unlikely but handle it)
			if (textContent.includes("???")) {
				const parts = textContent.split("???");

				if (parts.length > 1) {
					const qText = parts[0].trim();
					const aText = parts.slice(1).join("???").trim();

					if (qText) questionParts.push(h("p", {}, qText));

					foundSeparator = true;

					if (aText) {
						answerParts.push(h("p", {}, aText));
					}
					continue;
				}
			}
		}

		if (foundSeparator) {
			answerParts.push(child);
		} else {
			questionParts.push(child);
		}
	}

	// Fallback: if no separator found, use all content as question
	if (!foundSeparator) {
		if (questionParts.length > 0) {
			answerParts = [
				h("p", { style: "opacity: 0.6; font-style: italic;" }, "(答案未设置)"),
			];
		} else {
			questionParts =
				children.length > 0 ? children : [h("p", {}, "(问题未设置)")];
			answerParts = [
				h("p", { style: "opacity: 0.6; font-style: italic;" }, "(答案未设置)"),
			];
		}
	}

	// Build the flashcard structure
	const frontContent = [
		// h('div', { class: 'flashcard-icon' }, '❓'), // Removed icon
		h("div", { class: "flashcard-question" }, questionParts),
	];

	if (hint) {
		frontContent.push(
			h("div", { class: "flashcard-hint" }, `💡 提示：${hint}`),
		);
	}

	const nFront = h("div", { class: "flashcard-front" }, [
		h("div", { class: "flashcard-content" }, frontContent),
		h("div", { class: "flashcard-action" }, [
			h("span", { class: "tap-hint" }, "点击翻转"),
		]),
	]);

	const nBack = h("div", { class: "flashcard-back" }, [
		h("div", { class: "flashcard-content" }, [
			// h('div', { class: 'flashcard-icon' }, '✅'), // Removed icon
			h("div", { class: "flashcard-answer" }, answerParts),
		]),
		h("div", { class: "flashcard-action" }, [
			h("span", { class: "tap-hint" }, "点击继续"),
		]),
	]);

	const nInner = h("div", { class: "flashcard-inner" }, [nFront, nBack]);

	const nCard = h(
		`div#${cardId}`,
		{
			class: "flashcard",
			tabindex: "0",
			role: "button",
			"aria-pressed": "false",
		},
		[nInner],
	);

	// Removed status badge as requested

	// Client-side script for interactivity + Deck Logic
	const nScript = h(
		"script",
		{ type: "text/javascript", defer: true },
		`
		(function() {
            // 1. Single Card Logic
			const card = document.getElementById('${cardId}');
			if (card) {
				const toggleCard = (e) => {
                    // Internal logic to check if we should go next instead of flipping back
                    const isFlipped = card.classList.contains('flipped');
                    const inDeck = card.closest('.flashcard-deck');
                    
                    if (isFlipped && inDeck) {
                        // Attempt to find the next button in the deck controls
                        const deck = inDeck;
                        const nextBtn = deck.querySelector('.deck-btn-next');
                        if (nextBtn && !nextBtn.disabled) {
                            nextBtn.click();
                            e.stopPropagation(); // Prevent flip back
                            return;
                        }
                    }

					card.classList.toggle('flipped');
					const newFlippedState = card.classList.contains('flipped');
					card.setAttribute('aria-pressed', String(newFlippedState));
				};

				card.addEventListener('click', toggleCard);
				card.addEventListener('keydown', (e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						toggleCard(e);
					}
				});
			}
		})();
		`,
	);

	return h("div", { class: "flashcard-wrapper" }, [nCard, nScript]);
}

/**
 * Recursively extract text content from a node
 */
function extractText(node) {
	if (typeof node === "string") return node;
	if (node.value) return node.value;
	if (node.children) {
		return node.children.map(extractText).join("");
	}
	return "";
}
