import ServicesModule from 'src/services/services.module';

export interface ICalc {
	input: number;
	dividers: number[];
	primeDivisors: number[];
}

export interface AppConfigOptions {
	environment: string;
	servicesModule: ServicesModule;
}
