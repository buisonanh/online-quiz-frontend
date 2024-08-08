<template>
  <div>
    <nav v-if="showNavbar" class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div class="container-fluid">
        <!-- Brand or Title -->
        <img :src="logoSrc" alt="Logo" class="logo me-2">
        <router-link to="/quizzes" class="navbar-brand text-light fw-bold">
          QuizApp
        </router-link>

        <!-- Toggler for responsive behavior -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link
                to="/quizzes"
                class="nav-link text-light fw-bold m-1"
                active-class="active"
              >
                Quizzes
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/attempts"
                class="nav-link text-light fw-bold m-1"
                active-class="active"
              >
                Attempts
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/create-quiz"
                class="nav-link text-light fw-bold m-1"
                active-class="active"
              >
                Create
              </router-link>
            </li>
            <li class="nav-item" v-if="isAdmin">
              <router-link
                to="/admin/users"
                class="nav-link text-light fw-bold m-1"
                active-class="active"
              >
                Users
              </router-link>
            </li>
          </ul>

          <!-- User Dropdown -->
          <div class="dropdown">
            <button
              class="btn btn-outline-light dropdown-toggle fw-bold m-1"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
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
  data() {
    return {
      logoSrc: require('@/assets/logo.png') // Ensure the correct path to your logo
    };
  },
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
      this.$router.push('/login');
      window.location.reload();
    },
    editProfile() {
      this.$router.push(`/update-user/${this.userId}`);
    }
  }
}
</script>

<style>
/* Highlight active nav-link */
.nav-link.active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.logo {
  height: 20px; /* Adjust the height as needed */
  width: auto; /* Maintains the aspect ratio */
}

</style>
