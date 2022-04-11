import bcrypt from 'bcrypt';

export const snakeToCamel = (field: string): string => {
	let toArray = field.split('_');
	toArray = toArray.map((word, index) => {
		if (index >= 1) return word.charAt(0).toUpperCase() + word.slice(1);
		return word;
	});

	return toArray.join('');
};

export const camelToSnake = (field: string): string => {
	return field
		.replace(/([A-Z])/g, ' $1')
		.split(' ')
		.join('_')
		.toLowerCase();
};

export const convertDataValues = (data: any) => {
	const keys = Object.keys(data);
	const values = Object.values(data);
	const convertKeysToSnake = keys.map(camelToSnake);
	const result: any = {};

	convertKeysToSnake.forEach((key, i) => (result[key] = values[i]));

	return result;
};

export const hashString = (field: string, salt: number) => bcrypt.hashSync(field, salt);

export const clearTimestamp = (data: any) => {
	Reflect.deleteProperty(data, 'createdAt');
	Reflect.deleteProperty(data, 'updatedAt');

	return data;
};

export const convertStringToDateString = (date: string) => {
	const year = date.slice(0, 4);
	const month = date.slice(4, 6);
	const day = date.slice(6, 8);

	return `${year}-${month}-${day}`;
};


export const convertSrtringToTimeString = (date: string) => {
	const hour = date.slice(0, 2);
	const minute = date.slice(2, 4) || '00';
	const second = date.slice(4, 6) || '00';

	return `${hour}:${minute}:${second}`;
};


export const clearRepeatItens = (data: string[]) => data.filter((item, index) => data.indexOf(item) === index);
