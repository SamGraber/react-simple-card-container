import * as React from 'react';

import { IColumn } from '../interfaces';

export interface SimpleCardContainerProps<T> {
	columns: IColumn<T>[];
	data: T[];
	onSort: { (sortColumn: IColumn<T>): void };
}

export class SimpleCardContainer<T extends { id: number }> extends React.Component<SimpleCardContainerProps<T>, any> {
	render(): JSX.Element {
		const { columns, data } = this.props;
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="card-container">
						<div className="card-columns-header">
							{columns.map(column => (
								JSON.stringify(column)
							))}
							{/*<div *ngFor="let column of columns">
								<scc-column-header [column]="column"
												(sort)="sort.emit($event)"></scc-column-header>
							</div>
							<div className="clearfix"></div>*/}
						</div>

						{/*<div className="alert alert-info" *ngIf="message">{{message}}</div>*/}

						{data && 
							data.map(card => (
								<div className="card-item-repeat" key={card.id}>
									{JSON.stringify(card)}
									{/*<scc-card [item]="card"
											[isOpen]="card === openCard"
											(open)="openCard = $event"
											(close)="openCard = null"></scc-card>*/}
								</div>
							))
						}
						
						{/*<div className="card-container-header">
							<div *ngIf="containerFooter">
								<template [ngTemplateOutlet]="containerFooter.template"></template>
							</div>
							<div className="row" *ngIf="!containerFooter">
								<div className="col-sm-5"><p>Showing <strong>{{data.length}} of {{totalItems}}</strong> total items</p></div>
								<div className="col-sm-7"><scc-pager [totalCount]="totalItems"
																[pageSize]="data.length"
																[pageNumber]="pageNumber"
																(pageNumberChange)="setPage($event)"></scc-pager></div>
							</div>
						</div>*/}
					</div>
				</div>
			</div>

		);
	}
}
