<script>
import GroupAddingPopup from './components/GroupAddingPopup.vue'
import InstitutionSelection from './components/InstitutionSelection.vue'
import SemesterSelection from './components/SemesterSelection.vue'
import GroupList from './components/GroupList.vue'
import ScheduleView from './components/ScheduleView.vue'

import { scheduleStore, refetchData, exportSettingsToClipboard, importSettingsByPrompt } from './global';

export default {
    components: {
        GroupAddingPopup,
        GroupList,
        ScheduleView,
        InstitutionSelection,
        SemesterSelection,
    },
    data() {
        return {
            showLeftPanel: false
        }
    },
    computed: {
        filteredClasses() { return scheduleStore.filteredClasses; },
        lastUpdate() { return scheduleStore.lastUpdate },
        hasData() { return !!scheduleStore.data.classes },
    },
    methods: {
        refetchData,
        exportSettingsToClipboard,
        importSettingsByPrompt
    },
}
</script>

<template>
    <main v-if="hasData">
        <nav @click="showLeftPanel = !showLeftPanel">schedule</nav>
        <div :class="`left-panel ${showLeftPanel ? 'show' : ''}`">
            <h3>institution & semester:</h3>
            <InstitutionSelection />
            <SemesterSelection />
            <h3>subjects:</h3>
            <GroupList />
            <h4>data management:</h4>
            <div>
                <button class="refresh" @click="refetchData">refresh data</button>
                <span>last update: {{ lastUpdate }}</span>
            </div>
            <button class="export" @click="exportSettingsToClipboard">export settings</button>
            <button class="import" @click="importSettingsByPrompt">import settings</button>
            <h4>add subject:</h4>
            <GroupAddingPopup />
        </div>

        <ScheduleView :classes="filteredClasses" />
    </main>

    <main v-else>
        <h1>No data fetched!</h1>
        <h2>Reload the page</h2>
    </main>
</template>

<style scoped>
h1 {
    font-size: 3em;
    text-align: center;
    padding-top: 2em;
}

h2 {
    font-size: 2em;
    text-align: center;
}

nav {
    padding: 1rem;
    height: 3rem;
    text-align: center;
    cursor: pointer;
    position: sticky;
    background: var(--bg-color);
    top: 0;
}

h3,
h4 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}

main {
    min-height: 100vh;
}

.left-panel {
    position: absolute;
    transform: translateX(-100%);
    background: var(--bg-color);
    transition: transform 100ms ease;
    height: calc(100% - 3rem);
}

.left-panel.show {
    transform: translateX(0);
}

button {
    padding: 0.5rem 1rem;
    color: black;
    border: none;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    margin: 3px;
}

.refresh {
    background: aquamarine;
}

.export {
    background: orange;
}

.import {
    background: DodgerBlue;
}
</style>
