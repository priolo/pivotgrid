import { FunctionComponent, useMemo } from "react"
import { Item, Property } from "./types"
import ItemCmp from "./ItemCmp"



interface ItemListProps {
	items: Item[]
	path?: string

	props: Property[]
	propsDeep?: number

	direction?: 'row' | 'column'
	onClick?: (path: string) => void
	style?: React.CSSProperties
}

const ItemList: FunctionComponent<ItemListProps> = ({
	items,
	path,

	props,
	propsDeep = 0,

	direction = "column",
	onClick,
	style = {},
}) => {

	// RENDER
	const calculatedPath = (item: Item) => path ? `${path}/${item.value}` : item.value
	const prop = props[propsDeep]
	const renderItems = useMemo(() => prop?.sort ? items.sort(prop.sort) : items, [prop?.sort, items])

	return (
		<div style={{ display: 'flex', flexDirection: direction, ...style }}>
			{renderItems.map(item => (
				<ItemCmp key={calculatedPath(item)}
					item={item}
					path={calculatedPath(item)}

					props={props}
					propsDeep={propsDeep}

					direction={direction}
					onClick={onClick}
				/>
			))}
		</div>
	)
}

export default ItemList