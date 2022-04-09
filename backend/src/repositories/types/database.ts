
export interface IReadOperation {
	id?: number;
	orderBy?: string;
	order?: string;
	paginationOptions?: IPaginationOptions;
	fields?: string[];
}

export interface IPaginationOptions {
	page: number;
	limit: number;
	count?: number;
}
