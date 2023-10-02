<script setup lang="ts">
import Combobox from './components/Combobox.vue';
import Chart from './components/Chart.vue';
import Table from './components/Table.vue';
import Location from './components/Location.vue';
import Heading from './components/Heading.vue';
import { useLocation } from './composables/useLocation';

useLocation();
</script>

<template>
	<div class="bg-background min-h-screen flex items-center py-6 flex-col">
		<div class="xl:w-1/2 w-full px-6">
			<Heading text="Weather App" />
			<Combobox />
			<Location />
			<Chart />
			<Table />
		</div>
	</div>
</template>
