<script>
import {scheduleStore} from '../global.js';

export default {
    emits: ['change'],
    data() {
        return {
            currentId: 1,
			searchQuery: "",
        }
    },
    computed: {
       data() {
           return scheduleStore.data
       },
	   filteredSubjects() {
		   if(!this.searchQuery) return [];
           return Object.fromEntries(
                Object.entries(this.data.subjects)
                .filter(([_,sub]) => this.checkMatch(sub))
           );
	   }
    },
    methods: {
        handleClick(id,sub) {
            this.currentId = id;
            this.$emit('change',{value: Number.parseInt(id), info: sub});
        },
		checkMatch(sub) {
			if(sub.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1) return true;
			if(sub.short.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1) return true;
			return false;
		}
    }
}
</script>

<template>
  <div class="container">
      <input type="text" class="search" v-model="searchQuery" placeholder="subject..."/>
      <ul>
        <li v-for="[id, sub] of Object.entries(filteredSubjects)" :class="currentId == id ? 'current' : ''" :key="id">  
          <p @click="handleClick(id,sub)">{{ sub.short }} (#{{ id }})- {{ sub.name }}</p>
        </li>  
      </ul>
  </div>
</template>

<style scoped>
ul {
    list-style: none;
    max-height: calc(max(10cm, 50vh));
    overflow: auto;
}

input {
    display: block;
    width: 100%;
}

li.current {
    background: blue;
}

p {
    cursor: pointer;
    padding: 0.5rem 1rem;
}

.container {
    width: calc(min(50vw,10cm));
}

.search {
    padding: 0.5rem 1rem;
}
</style>
