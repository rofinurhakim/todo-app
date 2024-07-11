<template>
  <div class="bg-img">
    <div class="w-50 m-auto m-form">
      <div class="card around p-4 mb-4">
        <form @submit.prevent="addTask" class="needs-validation" novalidate>
          <div class="form-group mb-3">
            <label for="title">Task Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="title"
              placeholder="Enter task title"
              required
            />
            <div class="invalid-feedback">Please provide a task title.</div>
          </div>
          <div class="form-group mb-3">
            <label for="dueDate">Due Date</label>
            <input
              type="date"
              class="form-control"
              id="dueDate"
              v-model="dueDate"
              required
            />
            <div class="invalid-feedback">Please select a due date.</div>
          </div>
          <div class="form-group mb-3">
            <label for="priority">Priority</label>
            <select class="form-control" id="priority" v-model="priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Add Task</button>
        </form>
      </div>
    </div>
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

<style>
.bg-img {
  background: url("https://c4.wallpaperflare.com/wallpaper/380/523/681/design-neon-abstract-light-design-hd-wallpaper-preview.jpg");
}
.m-form {
  padding-top: 112px;
}
</style>
