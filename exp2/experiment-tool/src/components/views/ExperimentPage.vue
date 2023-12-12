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
      tasks: [{sentence: "jump left",
          identifiers: [
            { id: 1, label: "jump-left" },
            { id: 2, label: "jump-lelt" },
            { id: 3, label: "junmp-left" },
            { id: 4, label: "junp-left"}
      ]}], // Populate tasks with data
    };
  },
};
</script>
  