<script lang="ts">
import Icon from "@iconify/svelte";

export let headers: string[] = [];
export let rows: { [key: string]: string }[] = [];

// Configuration
// Columns that should NOT show a filter dropdown
const NO_FILTER_COLUMNS = [
	"书名",
	"Title",
	"Book",
	"Name",
	"Author",
	"作者",
	"Link",
	"链接",
	"Related",
	"相关文章",
];

// State
let sortColumn: string | null = null;
let sortDirection: "asc" | "desc" = "asc";

// filters: Map<ColumnName, Set<SelectedValues>>
// We use a plain object for reactivity simplicity in Svelte 3/4
let activeFilters: { [key: string]: string[] } = {};

// Columns that contain space-separated tags
const TAG_COLUMNS = ["标签", "Tags"];

// 1. Extract Unique Values for Filters
// Returns object { [colName]: ["Tag A", "Tag B"] }
$: filterOptions = headers.reduce(
	(acc, header) => {
		if (NO_FILTER_COLUMNS.includes(header)) return acc;

		const values = new Set<string>();
		rows.forEach((row) => {
			const val = row[header];
			if (val) {
				if (TAG_COLUMNS.includes(header)) {
					// Split by space and add individual tags
					val.split(/\s+/).forEach((tag) => {
						if (tag.trim()) values.add(tag.trim());
					});
				} else {
					values.add(val);
				}
			}
		});
		acc[header] = Array.from(values).sort();
		return acc;
	},
	{} as { [key: string]: string[] },
);

// 2. Filter & Sort Logic
$: filteredRows = rows
	.filter((row) => {
		// Must match ALL active filters
		return Object.entries(activeFilters).every(([col, selectedValues]) => {
			if (!selectedValues || selectedValues.length === 0) return true;

			const cellValue = row[col] || "";

			if (TAG_COLUMNS.includes(col)) {
				// For tag columns, check if ANY of the cell's tags match ANY of the selected filters
				// Actually, usually filters are "AND" across columns, but "OR" within a column (select multiple values).
				// But here, if I select "Finance", I want rows containing "Finance".
				// If I select "Finance" AND "Probability", do I want rows containing BOTH or EITHER?
				// Standard UI usually means "OR" within the same filter dropdown (Is one of...).
				// So if I select "A", "B", I show rows that have tag "A" OR tag "B".
				const cellTags = cellValue.split(/\s+/).filter((t) => t.trim());
				return selectedValues.some((val) => cellTags.includes(val));
			}

			return selectedValues.includes(cellValue);
		});
	})
	.sort((a, b) => {
		if (!sortColumn) return 0;

		const valA = a[sortColumn] || "";
		const valB = b[sortColumn] || "";

		// Check if numeric
		const numA = Number.parseFloat(valA);
		const numB = Number.parseFloat(valB);
		const isNum = !Number.isNaN(numA) && !Number.isNaN(numB);

		let comparison = 0;
		if (isNum) {
			comparison = numA - numB;
		} else {
			comparison = valA.localeCompare(valB, "zh-CN");
		}

		return sortDirection === "asc" ? comparison : -comparison;
	});

// Handlers
function toggleSort(header: string) {
	if (sortColumn === header) {
		sortDirection = sortDirection === "asc" ? "desc" : "asc";
	} else {
		sortColumn = header;
		sortDirection = "asc";
	}
}

function toggleFilter(header: string, value: string) {
	const current = activeFilters[header] || [];
	if (current.includes(value)) {
		activeFilters[header] = current.filter((v) => v !== value);
	} else {
		activeFilters[header] = [...current, value];
	}
	// Trigger reactivity
	activeFilters = { ...activeFilters };
}

function clearFilter(header: string) {
	delete activeFilters[header];
	activeFilters = { ...activeFilters };
}

// Process markdown links [Label](url) -> extract Label, or just return raw
// For display, we might want to render HTML.
function renderCell(content: string) {
	// Simple regex to convert [Text](Link) to <a href="Link">Text</a>
	// and standalone URLs to links
	const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
	return content.replace(
		linkRegex,
		'<a href="$2" class="text-[var(--primary)] hover:underline" target="_blank">$1</a>',
	);
}
</script>

<div class="w-full">
    <!-- Filters Row -->
    <div class="flex flex-wrap gap-4 mb-4">
        {#each headers as header}
            {#if !NO_FILTER_COLUMNS.includes(header) && filterOptions[header]?.length > 0}
                <div class="relative group">
                    <button class="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--card-bg)] border border-[var(--line-color)] hover:border-[var(--primary)] transition flex items-center gap-2">
                        <span>{header}</span>
                        {#if activeFilters[header]?.length}
                            <span class="bg-[var(--primary)] text-white text-xs px-1.5 rounded-full">{activeFilters[header].length}</span>
                        {:else}
                            <Icon icon="material-symbols:filter-list-rounded" class="text-lg opacity-50" />
                        {/if}
                    </button>
                    
                    <!-- Dropdown -->
                    <div class="absolute top-full left-0 mt-2 w-48 bg-[var(--card-bg)] border border-[var(--line-color)] rounded-xl shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                        {#if activeFilters[header]?.length}
                            <button class="w-full text-left px-2 py-1 text-xs text-[var(--primary)] hover:bg-[var(--btn-plain-bg-hover)] rounded mb-1" on:click={() => clearFilter(header)}>
                                清除筛选
                            </button>
                        {/if}
                        {#each filterOptions[header] as option}
                            <label class="flex items-center gap-2 px-2 py-1.5 hover:bg-[var(--btn-plain-bg-hover)] rounded cursor-pointer text-sm">
                                <input type="checkbox" 
                                    checked={activeFilters[header]?.includes(option)} 
                                    on:change={() => toggleFilter(header, option)}
                                    class="rounded border-[var(--line-color)] text-[var(--primary)] focus:ring-[var(--primary)]"
                                >
                                <span class="truncate">{option}</span>
                            </label>
                        {/each}
                    </div>
                </div>
            {/if}
        {/each}
    </div>

    <!-- Table Container -->
    <div class="w-full overflow-x-auto">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b border-[var(--line-color)]">
                    {#each headers as header}
                        <th class="py-2 px-2 font-bold text-sm select-none cursor-pointer hover:text-[var(--primary)] transition whitespace-nowrap" on:click={() => toggleSort(header)}>
                            <div class="flex items-center gap-1">
                                {header}
                                <div class="flex flex-col text-[10px] leading-none opacity-50">
                                    <Icon icon="fa6-solid:caret-up" class={sortColumn === header && sortDirection === 'asc' ? 'text-[var(--primary)] opacity-100' : ''} />
                                    <Icon icon="fa6-solid:caret-down" class={sortColumn === header && sortDirection === 'desc' ? 'text-[var(--primary)] opacity-100' : ''} />
                                </div>
                            </div>
                        </th>
                    {/each}
                </tr>
            </thead>
            <tbody>
                {#each filteredRows as row}
                    <tr class="border-b border-[var(--line-color)] hover:bg-[var(--card-bg)] transition">
                        {#each headers as header}
                            <td class="py-2 px-2 text-sm {['书名', 'Title'].includes(header) ? 'min-w-[10em] max-w-[10em] whitespace-normal' : ['作者', 'Author'].includes(header) ? 'min-w-[5em] max-w-[5em] whitespace-normal' : 'whitespace-nowrap'}">
                                <!-- Use @html to render links -->
                                {@html renderCell(row[header])}
                            </td>
                        {/each}
                    </tr>
                {/each}
            </tbody>
        </table>

        {#if filteredRows.length === 0}
            <div class="text-center py-8 text-sm opacity-50">
                没有找到匹配的书籍
            </div>
        {/if}
    </div>
</div>
