/// <reference types="mdast" />
import { h } from "hastscript";

/**
 * Row container — lays out child :::colN blocks side-by-side as flex columns.
 * Usage:
 *   ::::row
 *   :::col2
 *   ![](./pic/foo.png)
 *   :::
 *   :::col5
 *   text content...
 *   :::
 *   ::::
 *
 * @param {Object} properties
 * @param {import('mdast').RootContent[]} children
 */
export function RowComponent(properties, children) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid row directive. (Use "::::row" containing one or more ":::colN" blocks.)',
		);

	return h("div", { class: "md-row" }, children);
}

/**
 * Column inside a :::row. Weight 1..6 controls the relative width via flex.
 *
 * @param {Object} properties
 * @param {import('mdast').RootContent[]} children
 * @param {1|2|3|4|5|6} weight
 */
export function ColComponent(properties, children, weight) {
	if (!Array.isArray(children) || children.length === 0)
		return h(
			"div",
			{ class: "hidden" },
			'Invalid col directive. (Use ":::colN" with N in 1..6 inside a "::::row".)',
		);

	return h("div", { class: `md-col md-col-${weight}` }, children);
}
