<script>
import {scheduleStore, getSubjectById, removeGroup} from '../global';
import {getFriendlyKindName} from '../constants';
export default {
    computed: {
        groupList() {
			const arr = [...scheduleStore.groups];
			arr.sort (
				(a,b) => {
					if (a.subjectId < b.subjectId) {
						return -1;
					} else if(a.subjectId == b.subjectId) {
						return a.kind > b.kind ? -1 : 1;
					} else {
						return 1;
					}
				}
			);
			return arr;
        }
    },
    methods: {
        getSubjectById,
        removeGroup,
		getFriendlyKindName
    }
}
</script>

<template>
    <ul>
        <li v-for="group of groupList">
            <p><button @click="removeGroup(group)">-</button>[{{ getSubjectById(group.subjectId).short }}] {{ getSubjectById(group.subjectId).name }} - ({{ getFriendlyKindName(group.kind) }} g. {{ group.group }})</p>
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
