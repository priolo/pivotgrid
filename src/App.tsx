import { useState } from 'react';
import './App.css';
import PivotGrid from './pivotGrid/PivotGrid';
import { Item, Property } from './pivotGrid/types';



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
	return [
		"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
	][index - 1]
}
const fnSort = (a: Item, b: Item) => a.value.localeCompare(b.value)



const rowStruct: Property[] = [
	{ name: "propA" },
	{ name: "propB" },
	{ name: "propC" }
];

const colStruct: Property[] = [
	{ name: "year", sort: fnSort },
	{ name: "month", sort: fnSort, render: getMonthName },
	{ name: "day", sort: fnSort }
];
const propNames = ["value", "propC"];


function App() {

	// HOOKS
	const [rows, setRows] = useState(() => rowStruct)
	const [cols, setCols] = useState(() => colStruct)

	// HANDLER

	// RENDER
	return (
		<PivotGrid 
			rowStruct={rows}
			colStruct={cols}
			propNames={propNames}
			data={data}
			onRowStructureChange={setRows}
			onColStructureChange={setCols}
		/>
	)
}

export default App
