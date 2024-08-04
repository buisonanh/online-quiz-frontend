<template>
  <div>
    <nav v-if="showNavbar" class="navbar bg-dark border-bottom border-body">
      <div class="container-fluid">
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

        <div class="ms-auto dropdown">
          <button class="btn btn-outline-light border-0 dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            {{ userName }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
            <li>
              <button class="dropdown-item" @click="editProfile">Edit Profile</button>
            </li>
            <li>
              <button class="dropdown-item" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
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
    },
    userName() {
      return localStorage.getItem('name');
    },
    userId() {
      return localStorage.getItem('userId');
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('role');
      localStorage.removeItem('userName');
      // Reload the page to reset the application state
      this.$router.push('/login');
      window.location.reload();
    },
    editProfile() {
      this.$router.push(`/update-user/${this.userId}`);
    }
  }
}
</script>
