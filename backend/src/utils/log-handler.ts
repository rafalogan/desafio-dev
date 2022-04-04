const enviroment = process.env.NODE_ENV;

export const onLog = (...args: any) => {
	if (enviroment !== 'production') return console.log(...args);
};

export const onError = (...args: any) => {
	return console.error(...args);
};

export const onWarn = (...args: any) => {
	if (enviroment !== 'production') return console.warn(...args);
};

export const onInfo = (...args: any) => {
	return console.info(...args);
};

export const onDebug = (...args: any) => {
	if (enviroment !== 'production') return console.debug(...args);
};
