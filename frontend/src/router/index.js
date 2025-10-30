import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import {useStore} from "vuex";

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: {
			roles: ['admin_user']
		},
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: {
			roles: ['admin_user', 'editor_user']
		},
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: '/home',
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})


router.beforeEach((to, from, next) => {
	const store = useStore();

	if (to.meta?.roles?.length) {
		if (!store.getters.user) {
			next('/');
			return;
		}

		const userRoles = store.getters.userRoles;

		if (!to.meta?.roles?.find(role => userRoles.includes(role))) {
			next('/home');
			return;
		}
	}

	next();
})
export default router
