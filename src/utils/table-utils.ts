/**
 * Parses a standard Markdown table into structured data.
 *
 * @param markdown The markdown string containing the table
 * @returns An object containing headers and formatted rows
 */
export function parseMarkdownTable(markdown: string) {
	const lines = markdown.split("\n");
	const tableLines = lines.filter((line) => line.trim().startsWith("|"));

	if (tableLines.length < 2) {
		return { headers: [], rows: [] };
	}

	// 1. Extract Headers
	// e.g., "| Title | Author | Rating |" -> ["Title", "Author", "Rating"]
	const headerLine = tableLines[0];
	const headers = headerLine
		.split("|")
		.map((h) => h.trim())
		.filter((h) => h !== ""); // Remove empty strings from split edges

	// 2. Extract Rows (skip separator line |---|)
	// We assume the second line is the separator if it contains dashes
	const dataLines = tableLines.slice(2);

	const rows = dataLines.map((line) => {
		const cells = line
			.split("|")
			// Don't just trim(), as we want to keep internal structure if needed,
			// but for standard tables, cells are between pipes.
			// The split will result in empty first/last elements if pipes are at edges.
			.map((c) => c.trim());

		// Remove the empty first and last elements usually resulting from |...| format
		// Check if the line actually starts/ends with pipe to be safe,
		// but standard md tables do.
		if (line.trim().startsWith("|")) cells.shift();
		if (line.trim().endsWith("|")) cells.pop();

		// Map headers to values
		const rowObject: { [key: string]: string } = {};
		headers.forEach((header, index) => {
			rowObject[header] = cells[index] || "";
		});
		return rowObject;
	});

	return { headers, rows };
}
