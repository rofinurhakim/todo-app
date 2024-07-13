import Vue from "vue";
import Vuex from "vuex";
import tasksData from "@/data/tasks.json";
import usersData from "@/data/users.json";

Vue.use(Vuex);

const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));

export default new Vuex.Store({
  state: {
    tasks: tasksData,
    users: usersData,
    user: userFromLocalStorage || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
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
    login({ commit, state }, { username, password }) {
      const user = state.users.find(
        (user) => user.username === username && user.password === password
      );
      if (user) {
        commit("setUser", user);
      } else {
        throw new Error("Invalid username or password");
      }
    },
    logout({ commit }) {
      commit("logout");
    },
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
    taskById: (state) => (id) => {
      const taskId = typeof id === "string" ? parseInt(id, 10) : id;
      const task = state.tasks.find((task) => task.id === taskId);
      return task;
    },
    users: (state) => state.users,
    user: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
  },
});
