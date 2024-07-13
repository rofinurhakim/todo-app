<template>
  <div class="container mt-4">
    <input
      type="text"
      class="form-control mb-4"
      placeholder="Search tasks..."
      v-model="searchQuery"
    />

    <div class="text-center" v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="row">
      <div v-if="filteredTasks.length === 0" class="col-12">
        <p class="text-center">No tasks found.</p>
      </div>
      <div class="col-md-4 mb-4" v-for="task in paginatedTasks" :key="task.id">
        <div class="card h-100">
          <img
            src="https://img.freepik.com/free-vector/white-hatchback-car-isolated-white-vector_53876-67409.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1720656000&semt=ais_user"
            class="card-img-top"
            alt="Task Image"
          />
          <div class="card-body">
            <h5 class="card-title">
              <router-link :to="'/task/' + task.id + '/detail'">{{
                task.title
              }}</router-link>
            </h5>
            <p class="card-text">{{ task.dueDate }}</p>
            <p class="card-text">{{ task.priority }}</p>
            <div class="d-flex justify-content-end">
              <button class="btn btn-primary me-2" @click="viewTask(task.id)">
                <i class="fas fa-eye"></i> View
              </button>
              <button class="btn btn-success me-2" @click="editTask(task.id)">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button
                class="btn btn-danger"
                @click="confirmDeleteTask(task.id)"
              >
                <i class="fas fa-trash-alt"></i> Delete
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
      loading: false, // Add loading state
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
    viewTask(taskId) {
      this.$router.push(`/task/${taskId}/detail`);
    },
    editTask(taskId) {
      this.$router.push(`/task/${taskId}/edit`);
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
    fetchData() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>
