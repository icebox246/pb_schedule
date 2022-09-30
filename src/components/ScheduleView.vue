<script>
import ScheduleDayView from './ScheduleDayView.vue';

export default {
    components: {ScheduleDayView},
    props: ['classes'],
    data() {
        return {
            days: [{n: 1, s: "monday"},{n: 2, s: "tuesday"},{n: 3, s: "wednesday"},{n: 4, s: "thursday"},{n: 5, s: "friday"}],
			currentDay: (new Date()).getDay()
        }
    },
    methods: {
        classesFilteredByDay(day) {
            return this.classes.filter(c => c.day == day);
        },
		changeDay(delta) {
			this.currentDay = (this.currentDay - 1 + delta + 5) % 5 + 1;
		}
    },
}
</script>

<template>
    <div class="container">
        <div :class="`day-container ${day.n == currentDay ? 'current' : ''}`" v-for="day of days">
            <h2>{{ day.s }}</h2>
            <ScheduleDayView :classes="classesFilteredByDay(day.n)" />
        </div>
    </div>
	<nav>
		<button @click="changeDay(-1)">&lt;</button>
		<button @click="changeDay(1)">&gt;</button>
	</nav>
</template>

<style scoped>
.container {
    display: flex;
    height: calc(100vh - 3rem - 2rem);
}
.day-container {
	display: flex;
	flex-direction: column;
}

.day-container.current h2 {
	text-decoration: underline;	
}
h2 {
    height: 2rem;
    text-align: center;
}
.day-container {
    flex:1;
}
nav {
	display: none;
	height: 3rem;
	position: fixed;
	bottom: 0;
	width: 100%;
}

nav button {
	flex:1;
	height: 100%;
	font-size:2em;
	background: var(--bg-color);
	border:none;
	outline:none;
	cursor:pointer;
}

nav button:hover {
	color:black;
	background: white;
}

@media only screen and (max-width: 850px) {
	.day-container {
		display: none;
	}	
	.day-container.current {
		display: flex;
	}	

	nav {
		display: flex;
	}
}

</style>
