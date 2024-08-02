<template>
  <div>
    <nav v-if="showNavbar" class="navbar bg-dark border-bottom border-body">
      <form class="container-fluid">
        <div class="d-flex justify-content-start">
          <router-link to="/quizzes">
            <button class="btn btn-outline-light border-0 me-2" type="button">
              Quizzes
            </button>
          </router-link>
          <router-link to="/attempts">
            <button class="btn btn-outline-light border-0 me-2" type="button">
              My Attempts
            </button>
          </router-link>
          <router-link to="/create-quiz">
            <button class="btn btn-outline-light border-0 me-2" type="button">
              Create Quiz
            </button>
          </router-link>
        </div>
        <div class="ms-auto">
          <button class="btn btn-outline-light border-0 me-2" type="button" @click="logout">
            Logout
          </button>
        </div>
      </form>
    </nav>
    <div class="four wide column">
      <flash-message></flash-message>
    </div>
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'App',
  computed: {
    showNavbar() {
      return this.$route.path !== '/login' && this.$route.path !== '/register';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>
