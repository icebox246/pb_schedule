<script>
import {scheduleStore, getSubjectById, removeGroup} from '../global';
export default {
    computed: {
        groupList() {
            return scheduleStore.groups;
        }
    },
    methods: {
        getSubjectById,
        removeGroup
    }
}
</script>

<template>
    <ul>
        <li v-for="group of groupList">
            <p><button @click="removeGroup(group)">-</button>{{ getSubjectById(group.subjectId).name }} - {{ group.kind }} - {{ group.group }}</p>
        </li>
    </ul>
</template>

<style scoped>
button {
    margin-right: 1rem;
    height: 2rem;
    width: 2rem;
	background: transparent;
	outline: none;
	border: none;
	cursor: pointer;
}
</style>
