<template>
  <header>
    <nav class="navbar">
      <template v-for="link in links" :key="link.to">
        <template v-if="!link.resolver || link.resolver.value">
          <router-link
              v-if="!isActive(link.to)"
              :to="link.to"
          >
            {{ link.label }}
          </router-link>
          <span
              v-else
              class="gray-lighter-500"
          >
            {{ link.label }}
          </span>
        </template>
      </template>

    </nav>

    <button v-if="user" @click="handleLogout">Logout</button>
    <button v-if="!user" @click="goToLogin">Login</button>
  </header>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {computed} from "vue";
import store from "../store/index.js";

const route = useRoute();
const router = useRouter();
const user = computed(() => store.getters.user);
const userIsAdmin = computed(() => store.getters.userIsAdmin);
const userIsEditor = computed(() => store.getters.userIsEditor || store.getters.userIsAdmin);

const links = [
  { to: '/home', label: 'Home' },
  { to: '/admin', label: 'Admin', resolver: userIsAdmin },
  { to: '/editor', label: 'Editor', resolver: userIsEditor },
]

const isActive = path => route.path === path;

const handleLogout = () => {
  store.dispatch('logout');
  router.push("/");
};

const goToLogin =() => {
  router.push("/");
}

</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;

  > * {
    margin-left: 3rem;
  }

  .navbar {
    display: flex;
    justify-content: space-between;
    flex: 1;
    margin: 0 auto;

    > * {
      margin: auto;
    }

    a:hover {
      opacity: .9;
    }

    span {
      color: #808080;
    }
  }

  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #c82333;
    }
  }
}


</style>
