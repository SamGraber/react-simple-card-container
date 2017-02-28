import * as React from 'react';

import { IColumn, IPage } from '../interfaces';
import { Card } from '../card/card';
import { ColumnHeader } from '../header/columnHeader';
import { Pager } from '../pager/pager';

export interface SimpleCardContainerProps {
	columns: IColumn<any>[];
	data: any[];
	count: number;
	pageNumber: number;
	message?: string;
	cardContent?: { (item: any): JSX.Element };
	cardFooter?: { (item: any): JSX.Element };
	containerHeader?: { (): JSX.Element };
	containerFooter?: { (): JSX.Element };
	onSort: { (sortColumn: IColumn<any>): void };
	onPage: { (page: IPage): void };
}

export class SimpleCardContainer extends React.Component<SimpleCardContainerProps, { openCard: any }> {
	state: { openCard: any } = { openCard: null };

	setPage = (page: number) => {
		this.props.onPage({
			pageSize: this.props.data.length,
			pageNumber: page,
		});
	}
	
	render(): JSX.Element {
		const {
			columns,
			data,
			count,
			pageNumber,
			message,
			cardContent,
			cardFooter,
			containerHeader,
			containerFooter,
			onSort,
		} = this.props;
		const { openCard } = this.state;
		return (
			<div className="row">
				<div className="col-xs-12">
					<div className="card-container">
						<div className="card-container-header">
							{containerHeader && containerHeader()}
						</div>
						
						<div className="card-columns-header">
							{columns.map(column => (
								<ColumnHeader key={column.name}
											  column={column}
											  onSort={onSort} />
							))}
							<div className="clearfix"></div>
						</div>

						{message && <div className="alert alert-info">{message}</div>}

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
						
						<div className="card-container-footer">
							{containerFooter 
							? containerFooter()
							: <div className="row">
								<div className="col-sm-5"><p>Showing <strong>{data.length} of {count || data.length}</strong> total items</p></div>
								<div className="col-sm-7"><Pager totalCount={count || data.length}
																 pageSize={data.length}
																 pageNumber={pageNumber}
																 onPageChange={this.setPage} /></div>
							</div>}
						</div>
					</div>
				</div>
			</div>

		);
	}
}
