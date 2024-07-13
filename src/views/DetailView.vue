<template>
  <div class="container mt-5">
    <div v-if="task" class="d-flex justify-content-center">
      <div class="card w-100" style="max-width: 600px">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <button class="btn btn-secondary" @click="goBack">
              <i class="fas fa-arrow-left"></i> Go Back
            </button>
            <router-link
              :to="'/task/' + task.id + '/edit'"
              class="btn btn-success"
            >
              Edit Task
            </router-link>
          </div>
          <div class="row">
            <div class="col-12 text-center mb-3">
              <img
                src="https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720656000&semt=ais_user"
                class="img-fluid"
                alt="Task Image"
              />
            </div>
            <div class="col-12">
              <h5 class="card-title text-center">{{ task.title }}</h5>
              <p><strong>Due Date:</strong> {{ task.dueDate }}</p>
              <p><strong>Priority:</strong> {{ task.priority }}</p>
              <p><strong>Description:</strong> {{ task.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      const taskId = this.$route.params.id;
      return this.$store.getters.taskById(taskId);
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
