import * as React from 'react';

import { IColumn } from '../interfaces';
import { CardHeaderColumn } from '../header/cardHeaderColumn';

export interface CardProps {
	item: any;
	isOpen: boolean;
	columns: IColumn<any>[];
	cardContent?: { (item: any): JSX.Element };
	cardFooter?: { (item: any): JSX.Element };
	onOpen: { (item: any): void };
	onClose: { (): void };
}

const toggleContent = (isOpen: boolean, onOpen: { (): void }, onClose: { (): void }): void => {
	if (isOpen) {
		onClose();
	} else {
		onOpen();
	}
};

export const Card = ({ item, isOpen, columns, cardContent, cardFooter, onOpen, onClose }: CardProps) => (
	<div className="card">
		<div className="header active"
			 onClick={() => toggleContent(isOpen, () => onOpen(item), onClose)}>
			<div className="row">
				{columns.map(column => (
					<CardHeaderColumn key={column.name}
									  column={column}
									  item={item} />
				))}
			</div>
		</div>
		
		{isOpen && cardContent &&
		<div>
			<div className="body">
				{cardContent(item)}
				<div className="clearfix"></div>
			</div>
		</div>}
		{/*<div [hidden]="!isOpen">
			<div className="footer" *ngIf="cardContainer.cardFooter">
				<template [ngTemplateOutlet]="cardContainer.cardFooter.template" [ngOutletContext]="{ $implicit: item }"></template>
				<div className="clearfix"></div>
			</div>
		</div>*/}
	</div>
);
