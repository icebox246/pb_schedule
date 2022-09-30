<script>
import {scheduleStore, setSemester} from '../global';
export default {
	data() {
		return {
			currentSemester: scheduleStore.semester ?? 1,
			semesters: [{n:1, s:'I'},{n:2, s:'II'},{n:3, s:'III'},{n:4, s:'IV'},{n:5, s:'V'},{n:6, s:'VI'},{n:7, s:'VII'}]
		}
	},
	watch: {
		currentSemester() {
			setSemester(this.currentSemester);
		}
	}
}
</script>

<template>
<select v-model="currentSemester">
	<option v-for="sem of semesters" :value="sem.n">{{ sem.s }}</option>
</select>
</template>

<style scoped>
select {
	padding: 0.5rem 1rem;
}
</style>
