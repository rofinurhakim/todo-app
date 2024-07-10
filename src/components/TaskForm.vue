<template>
  <div>
    <h2>Add Task</h2>
    <form @submit.prevent="addTask">
      <input v-model="title" placeholder="Task title" required />
      <input type="date" v-model="dueDate" required />
      <select v-model="priority">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Add Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      dueDate: "",
      priority: "Medium",
    };
  },
  methods: {
    addTask() {
      const newTask = {
        id: Date.now(),
        title: this.title,
        dueDate: this.dueDate,
        priority: this.priority,
      };
      this.$store.dispatch("addTask", newTask);
      this.title = "";
      this.dueDate = "";
      this.priority = "Medium";
    },
  },
};
</script>
