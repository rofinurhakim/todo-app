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
      <div class="col-md-4 mb-4" v-for="task in paginatedTasks" :key="task.id">
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
              <button
                class="btn btn-danger"
                @click="confirmDeleteTask(task.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        <li
          class="page-item"
          :class="{ disabled: currentPage === 1 }"
          @click="changePage(currentPage - 1)"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: page === currentPage }"
          @click="changePage(page)"
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === totalPages }"
          @click="changePage(currentPage + 1)"
        >
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchQuery: "",
      currentPage: 1,
      tasksPerPage: 6,
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
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.tasksPerPage);
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.tasksPerPage;
      const end = start + this.tasksPerPage;
      return this.filteredTasks.slice(start, end);
    },
  },
  methods: {
    editTask(taskId) {
      this.$router.push(`/edit-task/${taskId}`);
    },
    confirmDeleteTask(taskId) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteTask(taskId);
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        }
      });
    },
    deleteTask(taskId) {
      this.$store.dispatch("deleteTask", taskId);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
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
