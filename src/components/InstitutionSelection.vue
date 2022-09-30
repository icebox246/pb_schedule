<script>
import {scheduleStore, setInstitution} from '../global';
export default {
	data() {
		return {
			currentInstitution: scheduleStore.institution ?? 13,
		}
	},
	computed: {
		institutions() { return scheduleStore.data.institutions; }
	},
	watch: {
		currentInstitution() {
			setInstitution(this.currentInstitution);
		}
	}
}
</script>

<template>
<select v-model="currentInstitution">
	<option v-for="[id, name] of Object.entries(institutions)" :value="id">{{ name }}</option>
</select>
</template>

<style scoped>
select {
	padding: 0.5rem 1rem;
}
</style>
