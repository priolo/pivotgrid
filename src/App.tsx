import { useState } from 'react';
import './App.css';
import PivotGrid from './pivotGrid/PivotGrid';
import { Item, Property } from './pivotGrid/types';
import { buildTree } from './pivotGrid/utils';
import { ScatterChart, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
	{ propA: "a1", propB: "b1", propC: "c1", date: "14-08-2015", value: 5 },
	{ propA: "a1", propB: "b1", propC: "c2", date: "20-08-2015", value: 3 },
	{ propA: "a1", propB: "b2", propC: "c3", date: "15-09-2015", value: 7 },
	{ propA: "a1", propB: "b3", propC: "c4", date: "09-09-2015", value: 5 },
	{ propA: "a1", propB: "b3", propC: "c5", date: "10-09-2015", value: 2 },
	{ propA: "a1", propB: "b3", propC: "c6", date: "11-08-2015", value: 5 },
	{ propA: "a2", propB: "b4", propC: "c7", date: "11-08-2015", value: 7 },
	{ propA: "a2", propB: "b4", propC: "c8", date: "20-08-2015", value: 5 },
	{ propA: "a2", propB: "b5", propC: "c9", date: "14-08-2015", value: 11 },
	{ propA: "a2", propB: "b6", propC: "c9", date: "14-08-2015", value: 11 },

	{ propA: "a3", propB: "b7", propC: "c10", date: "21-08-2015", value: 11 },
	{ propA: "a3", propB: "b7", propC: "c11", date: "22-08-2015", value: 11 },
	{ propA: "a3", propB: "b7", propC: "c12", date: "23-10-2015", value: 11 },
	{ propA: "a3", propB: "b8", propC: "c13", date: "24-10-2015", value: 11 },
	{ propA: "a3", propB: "b8", propC: "c14", date: "25-08-2015", value: 11 },
	{ propA: "a3", propB: "b9", propC: "c15", date: "26-10-2015", value: 11 },
];

function addDateProperties(items: any[]) {
	items.forEach(item => {
		const [day, month, year] = item.date.split('-');
		item.day = day;
		item.month = month;
		item.year = year;
	});
}

addDateProperties(data);

function getMonthName(monthNum: string): string {
	const index = parseInt(monthNum)
	return ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"][index - 1]
}

const fnSort = (a: Item, b: Item) => a.value.localeCompare(b.value)

const rowStruct: Property[] = [
	{ name: "propA" },
	{ name: "propB", startCollapsed: true },
	{ name: "propC" }
];

const colStruct: Property[] = [
	{ name: "year", sort: fnSort },
	{ name: "month", sort: fnSort, render: getMonthName },
	{ name: "day", sort: fnSort }
];
const propNames = ["value"];




// CHART -----

function parseDateStr(dt: string) {
	const [day, month, year] = dt.split('-').map(Number);
	return new Date(year, month - 1, day).getTime();
}
type ScatterData = {
	x: number,
	y: number,
	index: number,
	propA: string,
	propB: string,
	propC: string
}
const scatterData = data.map<ScatterData>((d, index) => ({
	x: parseDateStr(d.date),
	y: d.value,
	index,
	propA: d.propA,
	propB: d.propB,
	propC: d.propC
}));

const CustomTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div style={{ backgroundColor: 'white', color: "black", padding: '10px', border: '1px solid #ccc' }}>
				<p>Date: {new Date(data.x).toLocaleDateString()}</p>
				<p>Value: {data.y}</p>
				<p>PropC: {data.propC}</p>
			</div>
		);
	}
	return null;
};

const formatXAxis = (tickItem: number) => {
	const date = new Date(tickItem);
	return date.toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

function App() {

	// HOOKS
	const [rows, setRows] = useState(() => buildTree(data, rowStruct))
	const [cols, setCols] = useState(() => buildTree(data, colStruct))
	const [hilightIndexes, setHilightIndexes] = useState<number[]>([]);

	// HANDLER
	const handleCellClick = (row: Item, col: Item) => {
		console.log('cell click', row, col)
	}
	const handleCellMouseEnter = (row?: Item, col?: Item, indexes?: number[]) => {
		console.log('cell mouse enter', row, col)
		setHilightIndexes(indexes ?? []);
	}

	// RENDER
	return <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
		<ResponsiveContainer width="100%" height={300}>
			<ScatterChart>
				<CartesianGrid />
				<XAxis
					dataKey="x"
					type="number"
					domain={['auto', 'auto']}
					scale="time"
					name="Date"
					tickFormatter={formatXAxis}
				/>
				<YAxis dataKey="y" name="Value" />
				<Tooltip content={<CustomTooltip />} />
				<Scatter
					data={scatterData}
					fill="#8884d8"
					shape={(props: any) => {
						const data = props.payload as ScatterData;
						const isSelected = hilightIndexes.includes(data.index)
						return (
							<circle
								cx={props.cx}
								cy={props.cy}
								r={isSelected ? 8 : 5}
								fill={isSelected ? "#ff0000" : "#8884d8"}
								stroke={isSelected ? "#ff0000" : "none"}
								strokeWidth={2}
							/>
						);
					}}
				/>
			</ScatterChart>
		</ResponsiveContainer>

		<div style={{ display: "flex", flex: 1, maxWidth: '100%', overflow: 'auto' }}>
			<PivotGrid
				style={{ flex: 1 }}
				rowStruct={rowStruct}
				colStruct={colStruct}
				rowItems={rows}
				colItems={cols}
				propNames={propNames}
				data={data}
				onRowItemsChange={setRows}
				onColItemsChange={setCols}
				onCellClick={handleCellClick}
				onCellMouseEnter={handleCellMouseEnter}
			/>
		</div>
	</div>
}

export default App
