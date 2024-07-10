<template>
  <div v-if="task">
    <h2>{{ task.title }}</h2>
    <p>Due Date: {{ task.dueDate }}</p>
    <p>Priority: {{ task.priority }}</p>
    <button @click="deleteTask">Delete Task</button>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
  },
  methods: {
    deleteTask() {
      this.$store.dispatch("deleteTask", this.$route.params.id);
      this.$router.push("/");
    },
  },
};
</script>
