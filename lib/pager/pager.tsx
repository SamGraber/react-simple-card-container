import * as React from 'react';

import { range } from '../utility/range';

export interface PagerProps {
	totalCount: number;
	pageSize: number;
	pageNumber: number;
	onPageChange: { (newPage: number): void };
}

export const defaultVisiblePageCount: number = 5;

const getLastPage = (count: number, pageSize: number) => Math.ceil(count / pageSize);
const canGoBack = (pageNumber: number) => pageNumber > 1;
const canGoForward = (pageNumber: number, lastPage: number) => pageNumber < lastPage;
const pages = (pageNumber: number, lastPage: number) => {
	const nonCurrentVisiblePages: number = defaultVisiblePageCount - 1;

	const before: number = Math.floor(nonCurrentVisiblePages / 2);
	const after: number = Math.ceil(nonCurrentVisiblePages / 2);

	let startPage: number = pageNumber - before;
	let endPage: number = pageNumber + after;

	if (startPage < 1) {
		startPage = 1;
		endPage = Math.min(defaultVisiblePageCount, lastPage);
	} else if (endPage > lastPage) {
		endPage = lastPage;
		startPage = Math.max(lastPage - nonCurrentVisiblePages, 1);
	}

	return range(startPage, endPage + 1);
};

const first = (onPageChange: { (page: number): void }) => onPageChange(1);
const previous = (pageNumber: number, onPageChange: { (page: number): void }) => {
	if (pageNumber > 1) {
		onPageChange(pageNumber - 1);
	}
};
const goto = (page: number, lastPage: number, onPageChange: { (page: number): void }) => {
	if (page >= 1 && page <= lastPage) {
		onPageChange(page);
	}
}
const next = (pageNumber: number, lastPage: number, onPageChange: { (page: number): void }) => {
	if (pageNumber < lastPage) {
		onPageChange(pageNumber + 1);
	}
};
const last = (lastPage: number, onPageChange: { (page: number): void }) => onPageChange(lastPage);

export const Pager = ({ totalCount, pageSize, pageNumber, onPageChange }: PagerProps) => {
	const lastPage = getLastPage(totalCount, pageSize);
	return (
	<nav>
		<ul className="pagination">
			<li title="Go to first page"
				onClick={() => first(onPageChange)}
				className={!canGoBack(pageNumber) && 'disabled'}>
				<a><i className="fa fa-angle-double-left"></i></a>
			</li>
			<li title="Go to previous page"
				onClick={() => previous(pageNumber, onPageChange)}
				className={!canGoBack(pageNumber) && 'disabled'}>
				<a><i className="fa fa-angle-left"></i></a>
			</li>
			{pages(pageNumber, lastPage).map(page => (
				<li key={page}
					title={`Go to page ${page}`} 
					onClick={() => goto(page, lastPage, onPageChange)}
					className={page === pageNumber && 'active'}>
					<a>{page}</a>
				</li>
			))}
			<li title="Go to next page"
				onClick={() => next(pageNumber, lastPage, onPageChange)}
				className={!canGoForward(pageNumber, lastPage) && 'disabled'}>
				<a><i className="fa fa-angle-right"></i></a>
			</li>
			<li title="Go to last page"
				onClick={() => last(lastPage, onPageChange)}
				className={!canGoForward(pageNumber, lastPage) && 'disabled'}>
				<a><i className="fa fa-angle-double-right"></i></a>
			</li>
		</ul>
	</nav>
	);
};