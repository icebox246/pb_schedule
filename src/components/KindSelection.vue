<script>
import { friendlyKindNames } from '../constants.js'
export default {
    emits: ["change"],
    data() {
        return {
            kinds: Object.keys(friendlyKindNames),
            currentValue: "W"
        }
    },
    methods: {
        handleClick(kind) {
            this.currentValue = kind;
            this.$emit("change", { value: kind });
        }
    }
}
</script>

<template>
    <ul>
        <li v-for="kind of kinds">
            <p @click="handleClick(kind)" :class="kind == currentValue ? 'current' : ''">{{ kind }}</p>
        </li>
    </ul>
</template>

<style scoped>
ul {
    list-style: none;
    display: flex;
}

p {
    cursor: pointer;
    padding: 0.5rem 1rem;
}

.current {
    background: blue;
}
</style>

