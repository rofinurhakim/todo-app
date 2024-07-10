<template>
  <div class="container mt-4">
    <h2 class="mb-4">Task List</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="task in tasks" :key="task.id">
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
  computed: {
    tasks() {
      return this.$store.getters.tasks;
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
