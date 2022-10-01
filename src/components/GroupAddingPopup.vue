<script>
import SubjectSelection from './SubjectSelection.vue';
import KindSelection from './KindSelection.vue';
import {getSubjectById, addGroup} from '../global.js';

export default {
    emits: ["finished"],
	components: {
	    SubjectSelection,
	    KindSelection,
	},
    data() {
        return {
            subjectId: 1,
            kind: 'W',
            group: 1
        }
    },
    computed: {
        subjectName() { return getSubjectById(this.subjectId).name; }
    },
    methods: {
        setSubjectId(id) {
            this.subjectId = id;
        },
        setKind(kind) {
            this.kind = kind;
        },
        handleAdd() {
            addGroup(this.subjectId, this.kind, this.group);
            this.$emit('finished');
        }
    }
}
</script>

<template>
    <!-- <p>Subject: {{ subjectName }}, Kind: {{ kind }}, Group: {{ group }}</p> -->
    <SubjectSelection @change="e => setSubjectId(e.value)" />
    <div class="horz">
        <input type="number" class="group" v-model="group" />
        <button @click="handleAdd">+</button>
        <KindSelection @change="e => setKind(e.value)" />
    </div>
</template>

<style scoped>

.horz {
    display:flex;
}

.group {
    height: 2rem;
    width: 5rem;
    padding: 0.5rem 1rem;
}

button {
    width: 2rem;
    height: 2rem;
}

</style>
