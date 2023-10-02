export type WeatherType = {
	temperature: number[];
	time: string[];
	humidity: number[];
	windspeed: number[];
};

export type WeatherRequest = {
	lat: string;
	lon: string;
	display_name?: string;
};
