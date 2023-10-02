<script setup lang="ts">
defineProps<{
	text: string;
}>();
</script>

<template>
	<h1 class="text-white xl:text-7xl text-4xl font-bold text-center mb-8">
		{{ text }}
	</h1>
</template>
