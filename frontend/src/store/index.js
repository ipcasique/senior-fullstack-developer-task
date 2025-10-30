import { createStore } from "vuex"
import axios from "axios";

export default createStore({
	state: {
		// Define your state here
		user: null,
		loading: false,
		error: null
	},
	getters: {
		// Define your getters here

		user: (state) => state.user,

		userRoles: (state) => state.user?.roles || [],

		userIsAdmin: (state) => state.user?.roles?.includes('admin_user'),

		userIsEditor: (state) => state.user?.roles?.includes('editor_user'),

		isLoading: (state) => state.loading,

		error: (state) => state.error,
	},
	mutations: {
		// Define your mutations here
		SET_USER(state, user) {
			state.user = user
		},

		SET_LOADING(state, loading) {
			state.loading = loading
		},

		SET_ERROR(state, error) {
			state.error = error
		},

		LOGOUT(state) {
			state.user = null
			state.error = null
		}
	},
	actions: {
		// Define your actions here
		async login({ commit }, username) {
			try {
				commit('SET_LOADING', true)
				commit('SET_ERROR', null)

				const response = await axios.post(`/api/users/login/${username}`);

				commit('SET_USER', response.data);
				return response.data;
			} catch (error) {
				const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
				commit('SET_ERROR', errorMessage);
				throw error;
			} finally {
				commit('SET_LOADING', false);
			}
		},

		logout({ commit }) {
			commit('LOGOUT');
		},
	},
	modules: {
		// Define your modules here
	},
})
