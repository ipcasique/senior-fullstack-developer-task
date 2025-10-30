<template>
	<div>
		<Navbar v-if="showNavbar" />
    <main>
      <router-view />
    </main>
	</div>
</template>

<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import Navbar from "./components/Navbar.vue"

const route = useRoute();
const showNavbar = computed(() => route.path !== "/");

</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
