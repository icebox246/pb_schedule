import {reactive} from 'vue';

export const scheduleStore = reactive({
    data: {},
    groups: [],
    filteredClasses: [],
    institution: null,
    semester: null,
    lastUpdate: null,
});

export function getSubjectById(id) {
    if (!scheduleStore.data.subjects) return null;
    return scheduleStore.data.subjects[id];
}

export function getTeacherById(id) {
    if (!scheduleStore.data.teachers) return null;
    return scheduleStore.data.teachers[id];
}

export function getRoomById(id) {
    if (!scheduleStore.data.rooms) return null;
    return scheduleStore.data.rooms[id];
}

export function refilterClasses() {
    const acc = scheduleStore.groups
                    .flatMap(
                        g => scheduleStore.data.classes.filter(
                            c =>
                                (g.subjectId == c.sid && g.group == c.group &&
                                 g.kind == c.kind)))
                    .filter(
                        c =>
                            (c.rid && c.sid && c.tid &&
                             c.iid == scheduleStore.institution &&
                             c.sem == scheduleStore.semester));

    const deduped =
        [...new Set(acc.map(c => JSON.stringify(c)))].map(c => JSON.parse(c));

    scheduleStore.filteredClasses = deduped;

    console.log('filtered items', deduped);
}

export function saveGroups() {
    localStorage.userGroups = JSON.stringify(scheduleStore.groups);
}

export function addGroup(subjectId, kind, group) {
    scheduleStore.groups.push({subjectId, kind, group});
    console.log('group added', scheduleStore.groups);
    refilterClasses();

    saveGroups();
}

export function removeGroup(group) {
    scheduleStore.groups = scheduleStore.groups.filter((g) => g !== group);
    console.log('group removed', scheduleStore.groups);
    refilterClasses();

    saveGroups();
}

export function setInstitution(id) {
    scheduleStore.institution = id;
    localStorage.userInstitution = id;
    refilterClasses();
}

export function setSemester(n) {
    scheduleStore.semester = n;
    localStorage.userSemester = n;
    refilterClasses();
}

export async function refetchData() {
    console.log('Fetching schedule data')
    scheduleStore.data =
        await (await fetch('/.netlify/functions/schedule')).json();
    localStorage.cachedData = JSON.stringify(scheduleStore.data);
    localStorage.lastUpdate = scheduleStore.lastUpdate =
        (new Date()).toLocaleString('pl');
    refilterClasses();
}

export function exportSettingsToClipboard() {
    const settings = {
        groups: scheduleStore.groups,
        institution: scheduleStore.institution,
        semester: scheduleStore.semester
    };

    navigator.clipboard.writeText(JSON.stringify(settings));

    alert('Copied settings to clipboard!');
}

export function importSettingsByPrompt() {
    const settings = JSON.parse(prompt('Enter your settings string:'));
    if (!settings) return;

    scheduleStore.groups = settings.groups;
    saveGroups();

    localStorage.userInstitution = scheduleStore.institution =
        settings.institution;

    localStorage.userSemester = scheduleStore.semester = settings.semester;


    refilterClasses();
}
