import { FunctionComponent } from 'react';
import CellCmp from './CellCmp';
import ItemList from './ItemList';
import { Item, Property } from './types';
import { findItemByPath } from './utils';



interface Props { 
	rowStruct: Property[]
	colStruct: Property[]
	rowItems: Item[]
	colItems: Item[]
	propNames: string[]
	data: any[]
	onRowItemsChange: (rows: Item[]) => void
	onColItemsChange: (cols: Item[]) => void
	onCellClick?: (col: Item, row: Item) => void
}

const PivotGrid: FunctionComponent<Props> = ({
	rowStruct,
	colStruct,
	rowItems,
	colItems,
	propNames,
	data,
	onRowItemsChange,
	onColItemsChange,
	onCellClick,
}) => {

	// HOOKS

	// HANDLER
	const handleRowsClick = (path: string) => {
		console.log('rows', path)
		const itemFind = findItemByPath(rowItems, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		onRowItemsChange([...rowItems])
	}
	const handleColsClick = (path: string) => {
		console.log('cols', path)
		const itemFind = findItemByPath(colItems, path)
		if (!itemFind || !itemFind.children || itemFind.children?.length == 0) return
		itemFind.collapsed = !itemFind.collapsed
		onColItemsChange([...colItems])
	}

	// RENDER
	return (
		<div style={{ display: 'grid', gridTemplateAreas: `"void cols" "rows values"` }}>

			<div
				style={{ gridArea: "void", backgroundColor: "red", position: "sticky", left: "0px", top: "0px", zIndex: 10 }}
			/>

			<ItemList style={{ gridArea: "cols", position: "sticky", top: "0px", backgroundColor: "blue" }}
				direction='row'
				items={colItems}
				props={colStruct}
				onClick={handleColsClick}
			/>

			<ItemList style={{ gridArea: "rows", position: "sticky", left: "0px", backgroundColor: "blue" }}
				items={rowItems}
				props={rowStruct}
				onClick={handleRowsClick}
			/>

			<div style={{ gridArea: "values", flex: 1, backgroundColor: "red", display: "flex", flexDirection: "column" }}>

				{rowItems.map((rowItem, irow) => (
					<div style={{ display: "flex", flexDirection: "row", flex: 1, }} key={irow}>

						{colItems.map((colItem, icol) => (
							<CellCmp key={icol}
								row={rowItem} col={colItem} propNames={propNames} data={data}
								onClick={onCellClick}
							/>
						))}

					</div>
				))}

			</div>

		</div>
	)
}

export default PivotGrid

