import * as React from 'react';

import { IColumn } from '../interfaces';
import { Card } from '../card/card';
import { ColumnHeader } from '../header/columnHeader';

export interface SimpleCardContainerProps {
	columns: IColumn<any>[];
	data: any[];
	cardContent?: { (item: any): JSX.Element };
	cardFooter?: { (item: any): JSX.Element };
	onSort: { (sortColumn: IColumn<any>): void };
}

export class SimpleCardContainer extends React.Component<SimpleCardContainerProps, { openCard: any }> {
	state: { openCard: any } = { openCard: null };
	
	render(): JSX.Element {
		const { columns, data, cardContent, cardFooter, onSort } = this.props;
		const { openCard } = this.state;
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="card-container">
						<div className="card-columns-header">
							{columns.map(column => (
								<ColumnHeader key={column.name}
											  column={column}
											  onSort={onSort} />
							))}
							<div className="clearfix"></div>
						</div>

						{/*<div className="alert alert-info" *ngIf="message">{{message}}</div>*/}

						{data && 
							data.map((card: any) => (
								<div className="card-item-repeat" key={card.id}>
									<Card item={card}
										  isOpen={card === openCard}
										  columns={columns}
										  cardContent={cardContent}
										  cardFooter={cardFooter}
										  onOpen={card => this.setState({ openCard: card })}
										  onClose={() => this.setState({ openCard: null })} />
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
