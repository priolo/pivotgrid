import { FunctionComponent, useMemo, useState } from 'react';
import CellCmp from './CellCmp';
import ItemList from './ItemList';
import { Item, Property } from './types';
import { buildTree, findItemByPath } from './utils';



const rowsItems: Item[] = buildTree(data, rowStruct);
const colsItems: Item[] = buildTree(data, colStruct);



interface Props { 
	rowStruct: Property[]
	colStruct: Property[]
	propNames: string[]
	data: any[]
	onRowStructureChange: (rows: Property[]) => void
	onColStructureChange: (cols: Property[]) => void
}

const PivotGrid: FunctionComponent<Props> = ({
	rowStruct,
	colStruct,
	propNames,
	data,
	onRowItemsChange,
	onColItemsChange,
}) => {

	// HOOKS
	const [rows, setRows] = useState(() => rowsItems)
	const [cols, setCols] = useState(() => colsItems)

	const rowsItems = useMemo(() => buildTree(data, rowStruct), [ data, rowStruct ])
	const colsItems = useMemo(() => buildTree(data, colStruct), [ data, colStruct ])

	// HANDLER
	const handleRowsClick = (path: string) => {
		console.log('rows', path)
		const itemFind = findItemByPath(rows, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		setRows([...rows])
	}
	const handleColsClick = (path: string) => {
		console.log('cols', path)
		const itemFind = findItemByPath(cols, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		setCols([...cols])
	}

	// RENDER
	return (
		<div style={{ display: 'grid', gridTemplateAreas: `"void cols" "rows values"` }}>

			<div
				style={{ gridArea: "void", backgroundColor: "red", position: "sticky", left: "0px", top: "0px", zIndex: 10 }}
			/>

			<ItemList style={{ gridArea: "cols", position: "sticky", top: "0px", backgroundColor: "blue" }}
				direction='row'
				items={cols}
				props={colStruct}
				onClick={handleColsClick}
			/>

			<ItemList style={{ gridArea: "rows", position: "sticky", left: "0px", backgroundColor: "blue" }}
				items={rows}
				props={rowStruct}
				onClick={handleRowsClick}
			/>

			<div style={{ gridArea: "values", flex: 1, backgroundColor: "red", display: "flex", flexDirection: "column" }}>

				{rows.map((rowItem, irow) => (
					<div style={{ display: "flex", flexDirection: "row", flex: 1, }} key={irow}>

						{cols.map((colItem, icol) => (
							<CellCmp key={icol}
								row={rowItem} col={colItem} propNames={propNames} data={data}
							/>
						))}

					</div>
				))}

			</div>

		</div>
	)
}

export default PivotGrid

