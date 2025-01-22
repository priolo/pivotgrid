import { FunctionComponent } from "react"
import { Item, Property } from "./types"
import { showChild } from "./utils"
import ItemList from "./ItemList"
import cls from "./ItemCmp.module.css"


interface ItemCmpProps {
	item: Item
	path?: string

	props: Property[]
	propsDeep?: number
	hilight?: Item | null

	count?: any
	direction?: 'row' | 'column'
	onClick?: (path: string) => void
	onMouseEnter?: (item: Item) => void
}
const ItemCmp: FunctionComponent<ItemCmpProps> = ({
	item,
	path = item.value,
	props,
	propsDeep = 0,
	hilight,

	count = { i: 0 },
	direction = "column",
	onClick,
	onMouseEnter,
}) => {

	// HANDLER
	const handleClick = () => {
		onClick?.(path)
	}

	// RENDER
	const prop = props[propsDeep]
	const value = prop?.render?.(item.value) ?? item.value
	const visibleChildren = showChild(item)
	if (!visibleChildren) {
		count.i++
		item.count = count.i
	}

	const clsDirection = cls[direction]
	const clsHaveChild = visibleChildren ? cls.haveChild : ""
	const clsModule = item.count! % 2 ? cls.m0 : cls.m1
	const clsHilight = hilight == item ? cls.hilight : ""
	const clsRoot = `${cls.root} ${clsDirection}`
	const clsItem = `${cls.item} ${clsDirection} ${clsModule} ${clsHilight} ${clsHaveChild}`

	return (
		<div className={clsRoot}>

			<div className={clsItem}
				onClick={handleClick}
				onMouseEnter={() => onMouseEnter?.(item)}
			>{value}</div>

			{visibleChildren && (
				<ItemList
					items={item.children as Item[]}
					path={path}
					props={props}
					propsDeep={propsDeep + 1}
					hilight={hilight}
					count={count}
					direction={direction}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
				/>
			)}
		</div>
	)
}

export default ItemCmp
