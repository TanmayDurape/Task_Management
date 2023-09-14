import {createStore} from "vuex"; 
import auth from './modules/auth/index';
import { LOADING_SPINNER_SHOW_MUTATION } from "./storeconstants";

const store = createStore({
    modules: {
        auth,
    },
    state() {
        return {
            showLoading: false,
            tasks: [],
        };
    },
    mutations: {
        addTask(state, task) {
          state.tasks.push(task);
        },
        deleteTask(state, taskId) {
          state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },
        [LOADING_SPINNER_SHOW_MUTATION](state, payload) {
            state.showLoading = payload;
        },
    },
    actions: {},
    getters: {
      allTasks: (state) => state.tasks,
    },
});

export default store;