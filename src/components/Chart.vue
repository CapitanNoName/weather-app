<script setup lang="ts">
import { computed, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { storeToRefs } from 'pinia';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
	TooltipItem,
} from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useWeatherStore } from '../stores/weather';
import { useCityStore } from '../stores/city';
import { ChartDataType, ModeType } from '../types/chart.types';

const weatherStore = useWeatherStore();
const cityStore = useCityStore();

const { city } = storeToRefs(cityStore);
const { weather } = storeToRefs(weatherStore);

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	TimeScale,
);

const mode = ref<ModeType>('temperature');

const data = computed<ChartDataType>(() => ({
	temperature: {
		label: 'temperature',
		data: weatherStore.weather.temperature,
		borderColor: 'rgb(225, 29, 72)',
	},
	humidity: {
		label: 'humidity',
		data: weatherStore.weather.humidity,
		borderColor: 'rgb(59, 130, 246)',
	},
	windspeed: {
		label: 'windspeed',
		data: weatherStore.weather.windspeed,
		borderColor: 'rgb(250, 250, 250)',
	},
}));

const unit = computed(() => weatherStore.units[mode.value]);

const dataChart = computed(() => ({
	labels: weather.value.time,
	datasets: [
		{
			...data.value[mode.value],
			fill: false,
			tension: 0.2,
		},
	],
}));

const options = computed(() => ({
	responsive: true,
	scales: {
		x: {
			type: 'time' as const,
			time: {
				unit: 'day' as const,
				tooltipFormat: 'dd/MM/yyyy haa',
			},
			title: {
				display: true,
				text: 'day',
			},
		},
		y: {
			title: {
				display: true,
				text: mode.value,
			},
		},
	},
	plugins: {
		legend: {
			display: false,
		},
		tooltip: {
			callbacks: {
				label: (context: TooltipItem<'line'>) => {
					const label = context.dataset.label || '';
					const value = context.parsed.y;

					const string = `${label}: ${value}${unit.value}`;

					return string.charAt(0).toUpperCase() + string.slice(1);
				},
			},
		},
	},
}));
</script>

<template>
	<div v-show="city">
		<div class="bg-input w-max mt-6 mb-4 rounded-md flex gap-2 px-1 py-1">
			<button
				v-for="{ label } in data"
				@click="mode = label"
				class="text-white text-xs rounded-md px-2 py-1 opacity-50 capitalize"
				:class="{
					'opacity-100': label === mode,
					'bg-background': label === mode,
				}"
			>
				{{ label }}
			</button>
		</div>
		<Line :data="dataChart" :options="options" />
	</div>
</template>
