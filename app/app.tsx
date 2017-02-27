import * as React from 'react';

import { IColumn, SortDirection, SimpleCardContainer } from '../lib';

export interface ICardItem {
	id: number;
	name: string;
	value: number;
}

export interface AppState {
	items: ICardItem[];
	columns: IColumn<ICardItem>[];
	count: number;
	pageNumber: number;
}

const rangeLow: number = 11;
const rangeHigh: number = 21;

const items = range(rangeLow, rangeHigh).map((num: number): ICardItem => {
	return {
		id: num,
		name: 'Item' + num,
		value: num,
	};
});

const columns = [
	{
		name: 'name',
		label: 'Name',
		size: 6,
		getValue: 'name',
		sortDirection: SortDirection.ascending,
	},
	{
		name: 'value',
		label: 'Value',
		size: 6,
		getValue: 'value',
	},
];

function range(low: number, high: number): number[] {
	let numbers = [];
	for (let i = low; i < high; i++) {
		numbers.push(i);
	}
	return numbers;
}

export class App extends React.Component<any, AppState> {
	state = { 
		items, 
		columns,
		count: 100,
		pageNumber: 2,
	};

	sort = (sortColumn: IColumn<ICardItem>): void => {
		this.setState({
			columns: this.state.columns.map((col: IColumn<ICardItem>) => {
				return col.name === sortColumn.name
					? sortColumn
					: col;
			}),
		});
	}

	render(): JSX.Element {
		const { items, columns } = this.state;
		return (
			<div className="container">
				<h1>Simple card container</h1>
				<SimpleCardContainer data={items}
									 columns={columns}
									 cardContent={item => (
										 <div>
											<div>Name: {item.name}</div>
											<div>Value: {item.value}</div>
										 </div>
									 )}
									 cardFooter={() => <div>Footer</div>}
									 onSort={this.sort} />
			</div>
		);
	}
}
