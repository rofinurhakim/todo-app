<template>
  <div class="container mt-4">
    <h2 class="mb-4">Task List</h2>
    <input
      type="text"
      class="form-control mb-4"
      placeholder="Search tasks..."
      v-model="searchQuery"
    />
    <div class="row">
      <div v-if="filteredTasks.length === 0" class="col-12">
        <p class="text-center">No tasks found.</p>
      </div>
      <div class="col-md-4 mb-4" v-for="task in filteredTasks" :key="task.id">
        <div class="card h-100">
          <img
            src="https://via.placeholder.com/150"
            class="card-img-top"
            alt="Task Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/task/' + task.id">{{
                task.title
              }}</router-link>
            </h5>
            <p class="card-text">{{ task.dueDate }}</p>
            <p class="card-text">{{ task.priority }}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary" @click="editTask(task.id)">
                Edit
              </button>
              <button class="btn btn-danger" @click="deleteTask(task.id)">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    filteredTasks() {
      const query = this.searchQuery.toLowerCase();
      return this.tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.dueDate.toLowerCase().includes(query) ||
          task.priority.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    editTask(taskId) {
      this.$router.push(`/edit-task/${taskId}`);
    },
    deleteTask(taskId) {
      this.$store.dispatch("deleteTask", taskId);
    },
  },
};
</script>

<style scoped>
.card-title a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
.card-title a:hover {
  color: #007bff;
}
</style>
