import * as React from 'react';

import { IColumn } from '../interfaces';
import { getClass } from '../utility/breakpointSizes';
import { SortDirection } from '../sortDirection';

const changeSort = (column: IColumn<any>, onSort: { (column: IColumn<any>): void }): void => {
	const columnWithSortChanged = {
		...column,
		sortDirection: SortDirection.toggle(column.sortDirection),
	};
	onSort && onSort(columnWithSortChanged);
};

export const ColumnHeader = ({ column, onSort }: { column: IColumn<any>, onSort: { (column: IColumn<any>): void }}) => (
	<div className={`column-header ${getClass(column.size)}`}
		 onClick={() => changeSort(column, onSort)}
		 title={column.description || ''}>
		<div><h5>{column.label}</h5></div>
		{SortDirection.ascending.equals(column.sortDirection) && <i className="fa fa-sort-asc"></i>}
		{SortDirection.descending.equals(column.sortDirection) && <i className="fa fa-sort-desc"></i>}
	</div>
);
