import './assets/global.css';

import { createApp } from 'vue'

import App from './App.vue'
import { refetchData, refilterClasses, scheduleStore } from './global';

// service worker
(async () => {
    const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js', { scope: '/' });
            } catch (error) {
                console.error('Service worker failed to register:', error);
            }
        }
    };
    await registerServiceWorker();

    if (!localStorage.cachedData)
        await refetchData();
    else
        scheduleStore.data = JSON.parse(localStorage.cachedData);

    scheduleStore.groups =
        localStorage.userGroups ? JSON.parse(localStorage.userGroups) : [];
    scheduleStore.institution = localStorage.userInstitution ?? 13;
    scheduleStore.semester = localStorage.userSemester ?? 1;
    scheduleStore.lastUpdate = localStorage.lastUpdate;
    refilterClasses();

    createApp(App).mount('#app')
})();
