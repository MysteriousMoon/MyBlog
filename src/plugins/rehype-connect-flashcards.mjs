/// <reference types="mdast" />
import { h } from "hastscript";
import { visit } from "unist-util-visit";

/**
 * Rehype plugin to group consecutive flashcards into a deck.
 */
export function rehypeConnectFlashcards() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			if (!parent || !Array.isArray(parent.children)) return;

			// We are looking for the *first* flashcard in a potential sequence
			// But since we are iterating, we just need to detect if `node` is a flashcard
			// AND we haven't processed it yet (though `visit` order matters).
			// The safest way with `visit` when modifying the tree is to handle the group and skip ahead.

			if (isFlashCard(node)) {
				// Initialize group with the current card
				const group = [node];
				// Keep track of all nodes to remove (including whitespace)
				const _nodesToRemoveCount = 1;
				let lookAheadIndex = index + 1;
				let cardsFound = 1;

				// Look ahead for more cards
				while (lookAheadIndex < parent.children.length) {
					const nextNode = parent.children[lookAheadIndex];

					if (isWhitespace(nextNode)) {
						group.push(nextNode);
						lookAheadIndex++;
						continue;
					}

					if (isFlashCard(nextNode)) {
						group.push(nextNode);
						cardsFound++;
						lookAheadIndex++;
					} else {
						// Found something else, stop grouping
						break;
					}
				}

				// If we found a group of cards
				if (cardsFound > 1) {
					// Extract only the card elements for the deck
					const cardElements = group.filter((n) => isFlashCard(n));

					// Create the Deck Element
					const deck = createDeck(cardElements);

					// Replace the sequence of nodes with the single deck node
					parent.children.splice(index, group.length, deck);

					// Return the new index to continue visiting (skip the current node which is now the deck)
					// Since we replaced N nodes with 1 node at `index`, the next node to visit is at `index + 1`
					// But `visit` increments automatically?
					// Usually returning `index` keeps us at the same position (re-visiting the replacement),
					// returning `SKIP` or `index + 1` moves on.
					// Since the replacement (deck) contains flashcards, we might re-visit them if we are not careful?
					// No, `visit` usually goes deep. The `deck` is a new node.
					// We want to skip visiting the children of the deck (the old flashcards) to avoid infinite loops or double processing?
					// Actually, the flashcards are already fully formed (divs).
					return index + 1;
				}
			}
		});
	};
}

function isFlashCard(node) {
	return (
		node.type === "element" &&
		node.tagName === "div" &&
		node.properties?.className?.includes("flashcard-wrapper")
	);
}

function isWhitespace(node) {
	return node.type === "text" && /^\s*$/.test(node.value);
}

function createDeck(cards) {
	const deckId = `deck-${Math.random().toString(36).substring(2, 9)}`;

	// 1. Modify cards to have 'in-deck' class and initial active state
	cards.forEach((card, i) => {
		if (!card.properties.className) card.properties.className = [];
		card.properties.className.push("in-deck");
		if (i === 0) card.properties.className.push("active");
	});

	// 2. Create Controls
	const controls = h("div", { class: "flashcard-deck-controls" }, [
		h(
			"button",
			{
				class: "deck-btn deck-btn-prev",
				"data-action": "prev",
				disabled: true,
			},
			"←",
		),
		h("span", { class: "deck-counter" }, `1 / ${cards.length}`),
		h(
			"button",
			{ class: "deck-btn deck-btn-next", "data-action": "next" },
			"→",
		),
	]);

	// 3. Create Script for Deck Logic
	// This script will run on the client to handle the buttons for THIS deck instance.
	// We use a self-executing function to isolate scope.
	const script = h(
		"script",
		{ type: "text/javascript" },
		`
        (function() {
            const deck = document.getElementById('${deckId}');
            if (!deck) return;

            const cards = Array.from(deck.querySelectorAll('.flashcard-wrapper'));
            const prevBtn = deck.querySelector('.deck-btn-prev');
            const nextBtn = deck.querySelector('.deck-btn-next');
            const counter = deck.querySelector('.deck-counter');
            
            let currentIndex = 0;
            const total = cards.length;

            const updateView = () => {
                cards.forEach((c, i) => {
                    c.classList.toggle('active', i === currentIndex);
                    // Optional: reset flip state when moving away
                    if (i !== currentIndex) {
                        const cardInner = c.querySelector('.flashcard');
                        if (cardInner) {
                            cardInner.classList.remove('flipped');
                            cardInner.setAttribute('aria-pressed', 'false');
                        }
                    }
                });
                
                counter.textContent = (currentIndex + 1) + ' / ' + total;
                prevBtn.disabled = currentIndex === 0;
                nextBtn.disabled = currentIndex === total - 1;
            };

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateView();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentIndex < total - 1) {
                    currentIndex++;
                    updateView();
                }
            });
        })();
    `,
	);

	return h("div", { class: "flashcard-deck", id: deckId }, [
		...cards,
		controls,
		script,
	]);
}
