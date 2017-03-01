import * as React from 'react';

import { IColumn, IPage, SortDirection, range, SimpleCardContainer } from '../lib';
import { connect, persistState } from './devtools/devtools';

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

export class App extends React.Component<any, AppState> {
	state = { 
		items, 
		columns,
		count: 100,
		pageNumber: 2,
	};

	componentWillMount(): void {
		connect(state => super.setState(state), message => console.log(message.type, ':', message.payload && message.payload.type));
	}

	setState(state: any): void {
		super.setState(state, () => persistState(this.state));
	}

	sort = (sortColumn: IColumn<ICardItem>): void => {
		this.setState({
			columns: this.state.columns.map((col: IColumn<ICardItem>) => {
				return col.name === sortColumn.name
					? sortColumn
					: col;
			}),
		});
	}

	page = (page: IPage): void => {
		const previousCount = page.pageSize * (page.pageNumber - 1) + 1;
		const newItems = range(previousCount, previousCount + page.pageSize).map((num: number): ICardItem => {
			return {
				id: num,
				name: 'Item' + num,
				value: num,
			};
		});
		this.setState({
			items: newItems,
			pageNumber: page.pageNumber,
		});
	}

	render(): JSX.Element {
		const { items, columns, count, pageNumber } = this.state;
		return (
			<div className="container">
				<h1>Simple card container</h1>
				<SimpleCardContainer data={items}
									 columns={columns}
									 count={count}
									 pageNumber={pageNumber}
									 cardContent={item => (
										 <div>
											<div>Name: {item.name}</div>
											<div>Value: {item.value}</div>
										 </div>
									 )}
									 cardFooter={() => <div>Footer</div>}
									 onSort={this.sort}
									 onPage={this.page} />
			</div>
		);
	}
}
