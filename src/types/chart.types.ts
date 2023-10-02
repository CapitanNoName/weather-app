export type ModeType = 'temperature' | 'humidity' | 'windspeed';

export type ChartDataType = {
	[key in ModeType]: {
		label: ModeType;
		data: number[];
	};
};
