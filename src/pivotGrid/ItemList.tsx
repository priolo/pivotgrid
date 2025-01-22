import { FunctionComponent, useMemo } from "react"
import { Item, Property } from "./types"
import ItemCmp from "./ItemCmp"
import cls from "./ItemList.module.css"



interface ItemListProps {
	items: Item[]
	path?: string

	props: Property[]
	propsDeep?: number
	hilight?: Item | null

	count?: any
	direction?: 'row' | 'column'
	className?: string
	onClick?: (path: string) => void
	onMouseEnter?: (item: Item) => void
}

const ItemList: FunctionComponent<ItemListProps> = ({
	items,
	path,

	props,
	propsDeep = 0,
	hilight,

	count = { i: 0 },
	direction = "column",
	className,
	onClick,
	onMouseEnter,
}) => {

	// RENDER
	const calculatedPath = (item: Item) => path ? `${path}/${item.value}` : item.value
	const prop = props[propsDeep]
	const renderItems = useMemo(() => prop?.sort ? items.sort(prop.sort) : items, [prop?.sort, items])

	const clsRoot = `${cls.root} ${cls[direction]} ${className ?? ""}`
	
	return (
		<div className={clsRoot}>
			{renderItems.map(item => (
				<ItemCmp key={calculatedPath(item)}
					item={item}
					path={calculatedPath(item)}

					props={props}
					propsDeep={propsDeep}

					hilight={hilight}
					count={count}
					direction={direction}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
				/>
			))}
		</div>
	)
}

export default ItemList