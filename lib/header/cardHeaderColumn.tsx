import * as React from 'react';

import { IColumn } from '../interfaces';
import { getClass } from '../utility/breakpointSizes';

function getValue(item: any, column: IColumn<any>): string | number | boolean {
	if (!item || !column.getValue) {
		return '';
	} else if (typeof column.getValue === 'string') {
		return item[column.getValue];
	} else {
		return column.getValue(item);
	}
}

export const CardHeaderColumn = ({ item, column }: { item: any, column: IColumn<any> }) => (
	<div className={getClass(column.size)} title={column && column.description || ''}>
		{getValue(item, column)}
	</div>
);
