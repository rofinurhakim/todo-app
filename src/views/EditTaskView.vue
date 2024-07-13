<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center">Edit Task</h2>
            <form @submit.prevent="updateTask">
              <div class="mb-3">
                <label for="title" class="form-label">Task Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="task.title"
                  placeholder="Task title"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="dueDate" class="form-label">Due Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="dueDate"
                  v-model="task.dueDate"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="priority" class="form-label">Priority</label>
                <select
                  class="form-select"
                  id="priority"
                  v-model="task.priority"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" @click="goBack">
                  Go Back
                </button>
                <button type="submit" class="btn btn-primary">
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  computed: {
    task() {
      return this.$store.getters.taskById(this.$route.params.id);
    },
  },
  methods: {
    updateTask() {
      this.$store.dispatch("updateTask", this.task).then(() => {
        Swal.fire({
          icon: "success",
          title: "Task Updated",
          text: "The task has been successfully updated!",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          this.$router.push("/");
        });
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
