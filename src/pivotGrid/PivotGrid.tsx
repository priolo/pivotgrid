import { FunctionComponent, useState } from 'react';
import CellCmp from './CellCmp';
import ItemList from './ItemList';
import { Item, Property } from './types';
import { findItemByPath } from './utils';
import cls from "./PivotGrid.module.css"



interface Props {
	rowStruct: Property[]
	colStruct: Property[]
	rowItems: Item[]
	colItems: Item[]
	propNames: string[]
	data: any[]

	style?: React.CSSProperties
	onRowItemsChange: (rows: Item[]) => void
	onColItemsChange: (cols: Item[]) => void
	onCellClick?: (col: Item, row: Item) => void
	onCellMouseEnter?: (col?: Item, row?: Item, indexes?: number[]) => void
}

const PivotGrid: FunctionComponent<Props> = ({
	rowStruct,
	colStruct,
	rowItems,
	colItems,
	propNames,
	data,

	style,
	onRowItemsChange,
	onColItemsChange,
	onCellClick,
	onCellMouseEnter,

}) => {

	// HOOKS
	const [colHilight, setColHilight] = useState<Item | null>(null)
	const [rowHilight, setRowHilight] = useState<Item | null>(null)

	// HANDLER
	const handleRowsClick = (path: string) => {
		const itemFind = findItemByPath(rowItems, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		onRowItemsChange([...rowItems])
	}
	const handleColsClick = (path: string) => {
		const itemFind = findItemByPath(colItems, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		onColItemsChange([...colItems])
	}
	const handleCellMouseEnter = (row: Item, col: Item, indexes?:number[]) => {
		setRowHilight(row)
		setColHilight(col)
		onCellMouseEnter?.(row, col, indexes)
	}
	const handleRowMouseEnter = (row: Item) => {
		setRowHilight(row)
		onCellMouseEnter?.(row, colHilight!, row.indexes)
	}
	const handleColMouseEnter = (col: Item) => {
		setColHilight(col)
		onCellMouseEnter?.(rowHilight!, col, col.indexes)
	}
	const handleMouseLeave = () => {
		setColHilight(null)
		setRowHilight(null)
	}

	// RENDER
	return (
		<div style={style}
			className={cls.root}
			onMouseLeave={handleMouseLeave}
		>

			<div
				style={{ gridArea: "void", border: "1px solid black", backgroundColor: "#8f8f8f", position: "sticky", left: "0px", top: "0px", zIndex: 10 }}
			/>

			<ItemList className={cls.cols}
				direction='row'
				items={colItems}
				props={colStruct}
				hilight={colHilight}
				onClick={handleColsClick}
				onMouseEnter={handleColMouseEnter}
			/>

			<ItemList className={cls.rows}
				items={rowItems}
				props={rowStruct}
				hilight={rowHilight}
				onClick={handleRowsClick}
				onMouseEnter={handleRowMouseEnter}
			/>

			<div style={{ gridArea: "values", flex: 1, backgroundColor: "red", display: "flex", flexDirection: "column" }}>

				{rowItems.map((rowItem, irow) => (
					<div style={{ display: "flex", flexDirection: "row" }} key={irow}>

						{colItems.map((colItem, icol) => (
							<CellCmp key={icol}
								row={rowItem} col={colItem} propNames={propNames} data={data}
								onClick={onCellClick}
								onMouseEnter={handleCellMouseEnter}
								colHilight={colHilight}
								rowHilight={rowHilight}
							/>
						))}

					</div>
				))}

			</div>

		</div>
	)
}

export default PivotGrid

