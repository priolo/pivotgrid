
/**
 * La struttura ad albero delle COLONNE e RIGHE del pivot
 */
export interface Item {
	value: string
	collapsed: boolean
	children?: Item[]
	/** Gli indici dei DATA che questo Item gestisce */
	indexes?: number[]

	count?: number
}

/**
 * proprietà dei dati da usare e come deve essere utilizzata
 */
export interface Property {
	name: string
	render?: (value: any) => string
	sort?: (item1: Item, item2: Item) => number
	/** indica che deve iniziare la visualizzazione da "collassato" */
	startCollapsed?: boolean
	/** la class da applicare sia all'item ceh alla cella nella cella prevedere una fuzsione di class tra col e row	 */
	getClassName?: (item:Item) => string
}

