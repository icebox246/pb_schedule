<script>
import {getFriendlyTimeEnd,getFriendlyTimeBegin,getFriendlyKindName} from '../constants.js';
import {getSubjectById, getTeacherById, getRoomById} from '../global.js';
export default {
    props: ['item'],
    methods: {
    },
    data() {
        return {
            teacher: {},
            subject: {},
            room: "",
        }
    },
    created() {
        this.teacher = getTeacherById(this.item.tid);
        this.subject = getSubjectById(this.item.sid);
        this.room = getRoomById(this.item.rid);
    },
    computed: {
        begin() { return getFriendlyTimeBegin(this.item.st) },
        end() { return getFriendlyTimeEnd(this.item.st + this.item.dur - 1) },
        kind() { return getFriendlyKindName(this.item.kind) },
    },
    mounted() {
        this.$refs.container.style.gridRow = `${this.item.st} / ${this.item.st + this.item.dur}`;
    }
}
</script>

<template>
    <div :class="`container ${item.kind}`" ref="container">
        <p><b>{{ begin }} - {{ end }}</b></p>
		<p>
			<span>{{ subject.short }} ({{ kind }})</span> <span>
				<b>{{ room }}</b> - {{ teacher.title }} {{ teacher.nsh }} {{ teacher.surname }} 
			</span>
		</p>
    </div>
</template>

<style scoped>
.container {
    background: dimgray;
    color: white;
    margin:3px;
    border-radius: 3px;
    padding: 3px;
    overflow:hidden;
}

p {
    overflow: ellipsis;
	font-size: 0.85;
}

.W {
    background: aquamarine;
}

.W * {
    color: black;
}

.Ćw {
   background: LightGoldenRodYellow; 
   color: black;
}

.Ćw * {
    color: black;
}

.Ps {
   background: PaleTurquoise; 
   color: black;
}

.Ps * {
    color: black;
}

.Wf {
   background: pink; 
   color: black;
}

.Wf * {
    color: black;
}
</style>
