<template>
  <div class="login-container d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-6 mb-4 mb-md-0">
          <img
            src="https://media.istockphoto.com/id/1150931120/photo/3d-illustration-of-generic-compact-white-car-front-side-view.jpg?s=612x612&w=0&k=20&c=MkM3U9ruXp2wKCgYKeL6DyZ9H5WFIHtyRWsbOMokrFg="
            alt="Car Image"
            class="img-fluid"
          />
        </div>
        <div class="col-md-6">
          <div class="card shadow p-4">
            <div class="text-center">
              <h1 class="mb-4 fw-bold">Login</h1>
            </div>
            <form @submit.prevent="login" class="needs-validation" novalidate>
              <div class="form-group mb-3">
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  required
                  class="form-control mt-2"
                  :class="{ 'is-invalid': submitted && !username }"
                />
                <div class="invalid-feedback">Please provide a username.</div>
              </div>
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  v-model="password"
                  required
                  class="form-control mt-2"
                  :class="{ 'is-invalid': submitted && !password }"
                />
                <div class="invalid-feedback">Please provide a password.</div>
              </div>
              <button type="submit" class="btn btn-dark w-100">Login</button>
            </form>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
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
      username: "",
      password: "",
      error: "",
      submitted: false,
    };
  },
  methods: {
    async login() {
      this.submitted = true;
      if (!this.username || !this.password) {
        this.error = "Please fill in all fields.";
        return;
      }
      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password,
        });
        this.$router.push("/");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>
