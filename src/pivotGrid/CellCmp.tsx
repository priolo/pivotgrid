import { FunctionComponent } from 'react';
import { Item } from './types';
import { showChild } from './utils';



interface CellCmpProps {
	row: Item
	col: Item
	propNames: string[]
	data: any[]
	onClick?: (col: Item, row: Item) => void
}
const CellCmp: FunctionComponent<CellCmpProps> = ({
	row,
	col,
	propNames,
	data,
	onClick,
}) => {

	const showCol = showChild(col)
	const showRow = showChild(row)


	if (!showCol && !showRow) {
		const sharedIndexes = row.indexes?.filter(idx => col.indexes?.includes(idx)) || []
		return (
			<div style={{ flex: 1, borderLeft: "1px solid black", marginLeft: "-1px", width: "100px", display: "flex" }}
				onClick={() => onClick?.(col, row)}
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
					/>
				))}

			</div>
		))}

	</div>

	//	const cellValue = values.find(item => item.propA === row && item.date === col)?.value
	//	return <div>{cellValue || '-'}</div>
}

export default CellCmp