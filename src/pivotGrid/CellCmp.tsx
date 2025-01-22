import { FunctionComponent } from 'react';
import { Item } from './types';
import { showChild } from './utils';
import cls from "./CellCmp.module.css"



interface CellCmpProps {
	row: Item
	col: Item
	propNames: string[]
	data: any[]

	rowHilight?: Item | null
	colHilight?: Item | null
	onClick?: (row: Item, col: Item) => void
	onMouseEnter?: (row: Item, col: Item, indexes?: number[]) => void
}
const CellCmp: FunctionComponent<CellCmpProps> = ({
	row,
	col,
	propNames,
	data,

	rowHilight,
	colHilight,
	onClick,
	onMouseEnter,
}) => {

	const showCol = showChild(col)
	const showRow = showChild(row)

	// RENDER CELL
	if (!showCol && !showRow) {

		const sharedIndexes = row.indexes?.filter(idx => col.indexes?.includes(idx)) || []

		const clsHilight = (rowHilight == row && colHilight == col)
			? cls.hilightCell
			: (rowHilight == row || colHilight == col) ? cls.hilight : ""
		const clsRoot = `${cls.root} ${col.count! % 2 ? cls.m0 : cls.m1} ${clsHilight}`

		return (
			<div className={clsRoot}
				onClick={() => onClick?.(row, col)}
				onMouseEnter={() => onMouseEnter?.(row, col, sharedIndexes)}
			>
				{propNames.map(propName => {

					const value = sharedIndexes.length == 0 ? "--" : sharedIndexes.reduce((acc, index) => acc + data[index][propName], 0)
					return <div style={{ flex: 1, textAlign: "center" }} key={propName}>
						{value}
					</div>

				})}
			</div>
		)
	}


	const rows = showRow ? row.children as Item[] : [row]
	const cols = showCol ? col.children as Item[] : [col]

	return <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

		{rows.map((rowItem, irows) => (
			<div style={{ display: "flex", flexDirection: "row", flex: 1 }} key={irows}>

				{cols.map((colItem, icols) => (
					<CellCmp key={icols}
						row={rowItem} col={colItem} propNames={propNames} data={data}
						onClick={onClick}
						onMouseEnter={onMouseEnter}
						rowHilight={rowHilight}
						colHilight={colHilight}
					/>
				))}

			</div>
		))}

	</div>

	//	const cellValue = values.find(item => item.propA === row && item.date === col)?.value
	//	return <div>{cellValue || '-'}</div>
}

export default CellCmp