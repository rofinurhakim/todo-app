<template>
  <div class="container-fluid bg-light">
    <div class="row">
      <div class="col-lg-3 col-md-12 mb-4">
        <TaskForm />
      </div>
      <div class="col-lg-9 col-md-12 mb-4">
        <TaskList />
      </div>
    </div>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TaskForm from "@/components/TaskForm.vue";
export default {
  components: {
    TaskList,
    TaskForm,
  },
};
</script>
