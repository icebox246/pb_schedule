<script>
import ScheduleClassItem from './ScheduleClassItem.vue'
import { getSubjectById } from '../global.js';

export default {
    components: [ScheduleClassItem],
    props: ['classes'],
    methods: {
        getSubjectById,
    },
    mounted() {
        console.log("day");
    }
}
</script>

<template>
    <div>
        <ScheduleClassItem v-for="c of classes" :item="c" />
    </div>
</template>

<style scoped>
div {
    flex: 1;
}
</style>
