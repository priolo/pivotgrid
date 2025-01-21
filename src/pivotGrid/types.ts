
/**
 * La struttura ad albero delle COLONNE e RIGHE del pivot
 */
export interface Item {
	value: string
	collapsed: boolean
	children?: Item[]
	/** Gli indici dei DATA che questo Item gestisce */
	indexes?: number[]
}

/**
 * proprietà dei dati da usare e come deve essere utilizzata
 */
export interface Property {
	name: string
	render?: (value: any) => string
	sort?: (item1: Item, item2: Item) => number
}