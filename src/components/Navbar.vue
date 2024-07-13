<template>
  <div>
    <nav
      class="navbar navbar-expand-lg bg-dark"
      :class="{ 'navbar-scroll': scrolled }"
    >
      <div class="container-fluid">
        <a class="navbar-brand fw-bold text-white" href="/"> CAR-FRIEND </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link active text-white" aria-current="page" href="/"
                >Home</a
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item d-flex align-items-center">
              <span class="navbar-text me-3 text-white border-end pe-3">{{
                username
              }}</span>
              <button class="btn btn-link text-white" @click="logout">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppNavbar",
  data() {
    return {
      scrolled: false,
    };
  },
  computed: {
    username() {
      return this.$store.getters.user?.username || "Guest";
    },
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
