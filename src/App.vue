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
              Attempts
            </button>
          </router-link>
          <router-link to="/create-quiz">
            <button class="btn btn-outline-light border-0 me-2" type="button">
              Create Quiz
            </button>
          </router-link>
          <router-link v-if="isAdmin" to="/admin/users">
              <button class="btn btn-outline-light border-0 me-2" type="button">
                  Manage Users
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
    },
    isAdmin() {
      return localStorage.getItem('role') === 'admin';
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      // Reload the page to reset the application state
      window.location.reload();
      this.$router.push('/login');
    }
  }
}
</script>
