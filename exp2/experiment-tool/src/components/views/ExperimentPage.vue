<template>
    <div>
      <h2>Experiment</h2>
      <div v-for="(task, index) in tasks" :key="index">
        <p>{{ task.sentence }}</p>
        <ul>
          <li v-for="identifier in task.identifiers" :key="identifier.id">
            {{ identifier.label }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {

    data() {
      return {
        tasks: [], // Populate tasks with data
      };
    },
  };
  </script>
  