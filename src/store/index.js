import Vue from "vue";
import Vuex from "vuex";
import tasksData from "@/data/tasks.json"; // Assuming tasks.json is located in the src/data folder

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: tasksData,
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        Vue.set(state.tasks, index, updatedTask);
      }
    },
    deleteTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    updateTask({ commit }, updatedTask) {
      commit("updateTask", updatedTask);
    },
    deleteTask({ commit }, taskId) {
      commit("deleteTask", taskId);
    },
  },
  getters: {
    tasks: (state) => state.tasks,
    taskById: (state) => (id) => state.tasks.find((task) => task.id === id),
  },
});
