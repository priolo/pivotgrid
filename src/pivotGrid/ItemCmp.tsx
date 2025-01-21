import { FunctionComponent } from "react"
import { Item, Property } from "./types"
import { showChild } from "./utils"
import ItemList from "./ItemList"



interface ItemCmpProps {
	item: Item
	path?: string

	props: Property[]
	propsDeep?: number

	direction?: 'row' | 'column'
	onClick?: (path: string) => void
	style?: React.CSSProperties
}
const ItemCmp: FunctionComponent<ItemCmpProps> = ({
	item,
	path = item.value,
	props,
	propsDeep = 0,
	direction = "column",
	onClick,
	style = {},
}) => {

	// HANDLER
	const handleClick = () => {
		onClick?.(path)
	}

	// RENDER
	const invDirection = direction === "column" ? "row" : "column"
	const prop = props[propsDeep]
	const value = prop?.render?.(item.value) ?? item.value

	return (
		<div style={{ display: 'flex', flexDirection: invDirection, ...style }}>

			<div style={{ flex: 1, minWidth: "100px", minHeight: "24px", outline: "2px solid black", outlineOffset: "-1px" }}
				onClick={handleClick}
			>{value}</div>

			{showChild(item) && (
				<div /*style={{ marginLeft: 20 }}*/>
					<ItemList
						items={item.children as Item[]}
						path={path}
						props={props}
						propsDeep={propsDeep + 1}
						direction={direction}
						onClick={onClick}
					/>
				</div>
			)}
		</div>
	)
}

export default ItemCmp
