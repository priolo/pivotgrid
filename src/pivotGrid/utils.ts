import { Item, Property } from "./types"



/**
 * indica se ci sono CHILDREN da visualizzare o no
 */
export function showChild(item: Item): boolean {
	return !item.collapsed && !!item.children && item.children.length > 0
}

/**
 * Trova un ITEM a partire dal path
 */
export function findItemByPath(items: Item[], path: string): Item | undefined {
	const [value, ...rest] = path.split('/')
	const item = items.find(item => item.value === value)
	if (!item) return undefined
	if (rest.length === 0) return item
	return findItemByPath(item.children as Item[], rest.join('/'))
}

/**
 * Raggruppa i dati in base alla chiave
 * @param data 
 * @param key 
 * @returns 
 */
export function grupBy(data: any[], key: string): { [key: string]: any[] } {
	return data.reduce((acc, item) => {
		const group = item[key]
		if (!acc[group]) {
			acc[group] = []
		}
		acc[group].push(item)
		return acc
	}, {})
}

/**
 * Costruisce un albero a partire dai dati e dalle proprietà
 */
export function buildTree(data: any[], properties: Property[], indexes?: number[]): Item[] {
	if (!properties.length) return []
	const [currentProp, ...restProps] = properties

	// costruisco i gruppi in base alla proprietà corrente
	const grouped = data.reduce<{ [key: string]: { items: any[], indexes: number[] } }>(
		(acc, curr, idx) => {
			const val = curr[currentProp.name];
			if (!acc[val]) acc[val] = { items: [], indexes: [] };
			acc[val].items.push(curr);
			acc[val].indexes.push(indexes ? indexes[idx] : idx);
			return acc;
		}, {})

	// costruisco l'albero
	return Object.entries(grouped).map(([groupValue, group]) => {
		return {
			value: groupValue,
			collapsed: currentProp.startCollapsed ?? false,
			indexes: group.indexes,
			children: restProps.length ? buildTree(group.items, restProps, group.indexes) : null,
		} as Item
	})
}

/**
 * dato un array di ITEMS
 * mette in ordine l'albero delle properties ITEM 
 */
// export function updateCount(items: Item[], count: { i: number } = { i: 0 }): Item[] {
// 	for (const item of items) {
// 		if (!showChild(item)) {
// 			item.count = count.i
// 			count.i++
// 			continue
// 		}
// 		updateCount(item.children!, count)
// 	}
// 	return items
// }