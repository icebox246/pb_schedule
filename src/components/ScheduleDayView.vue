<script>
import ScheduleClassItem from './ScheduleClassItem.vue'

export default {
    components: {ScheduleClassItem},
    props: ['classes'],
    methods: {}
}
</script>

<template>
    <div class="item-container">
        <ScheduleClassItem v-for="c of classes" :item="c" />
    </div>
</template>

<style scoped>
.item-container {
    display: grid;
    grid-template-rows: repeat(14, calc(100% / 14));
    height: 100%;
    background: repeating-linear-gradient(  
        transparent 0%,
        transparent calc(100% / 14 - 1px),
        gray calc(100% / 14 - 1px),
        gray calc(100% / 14 - 1px),
        gray calc(100% / 14),
        transparent calc(100% / 14)
    );
}
</style>
