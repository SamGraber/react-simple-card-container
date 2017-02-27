import { xs, sm, md, lg } from './breakpoints';
import { IBreakpointSize } from '../interfaces';

export function getClass(sizes: IBreakpointSize | number): string {
	const configuredSizes = buildSizes(sizes);
	const classes: string[] = [
		getColumnClass(configuredSizes, xs),
		getColumnClass(configuredSizes, sm),
		getColumnClass(configuredSizes, md),
		getColumnClass(configuredSizes, lg),
	];

	return classes.join(' ');
}

export function buildSizes(sizes: IBreakpointSize | number): IBreakpointSize {
	if (typeof sizes === 'number') {
		return {
			xs: <number>sizes,
			sm: <number>sizes,
			md: <number>sizes,
			lg: <number>sizes,
		};
	} else {
		const xsSize = sizes[xs] || 0;
		const smSize = sizes[sm] || xsSize;
		const mdSize = sizes[md] || smSize;
		const lgSize = sizes[lg] || mdSize;
		
		return {
			xs: xsSize,
			sm: smSize,
			md: mdSize,
			lg: lgSize,
		};
	}
}

function getColumnClass(columnSizes: IBreakpointSize, attribute: string): string {
	const value: number | string = columnSizes[attribute];
	if (value > 0) {
		return `col-${attribute}-${value}`;
	} else {
		return 'hidden-' + attribute;
	}
}
