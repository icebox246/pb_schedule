<script>
import { getFriendlyTimeEnd, getFriendlyTimeBegin, getFriendlyKindName } from '../constants.js';
import { getSubjectById, getTeacherById, getRoomById } from '../global.js';
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
    <div :class="`container ${item.kind} ${item.wm == 1 ? 'biweekly1' : (item.wm == 2 ? 'biweekly2' : '')}`"
        ref="container">
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
    --biweekly-bg: none;
    --type-color: dimgray;
    background-image: var(--biweekly-bg), linear-gradient(var(--type-color), var(--type-color));
    color: white;
    margin: 3px;
    border-radius: 3px;
    padding: 3px;
    overflow: hidden;
    grid-column: 1 / 3;
}

p {
    overflow: ellipsis;
    font-size: 0.85;
}

.container.W {
    --type-color: aquamarine;
}

.container.W * {
    color: black;
}

.container.Ćw {
    --type-color: LightGoldenRodYellow;
    color: black;
}

.container.Ćw * {
    color: black;
}

.container.Ps {
    --type-color: PaleTurquoise;
    color: black;
}

.container.Ps * {
    color: black;
}

.container.Wf {
    --type-color: pink;
    color: black;
}

.container.Wf * {
    color: black;
}

.container.L {
    --type-color: LightSalmon;
    color: black;
}

.container.L * {
    color: black;
}

.container.J {
    --type-color: PeachPuff;
    color: black;
}

.container.J * {
    color: black;
}

.container.biweekly1 {
    --biweekly-bg: repeating-linear-gradient(-45deg, rgba(200, 200, 200, 0.5), rgba(200, 200, 200, 0.5) 20px, transparent 20px, transparent 40px);
    grid-column: 1;
}

.container.biweekly2 {
    --biweekly-bg: repeating-linear-gradient(45deg, rgba(200, 200, 200, 0.5), rgba(200, 200, 200, 0.5) 20px, transparent 20px, transparent 40px);
    grid-column: 2;
}
</style>
