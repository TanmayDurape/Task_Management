<template>
  <div id="app" class="container">
    <TaskList />
  </div>
</template>

<script>
import TaskList from '../components/TaskList.vue';
import axios from 'axios';
import { GET_USER_TOKEN_GETTER } from '@/store/storeconstants';
import { mapGetters } from 'vuex';

export default {
  data() {
    return;
  },
  components: {
    TaskList,
  },
  computed: {
    ...mapGetters('auth',{
      token : GET_USER_TOKEN_GETTER,
    }),
  },
  mounted() {
    axios
        .get(`https://task-management-app-bdabf-default-rtdb.firebaseio.com/posts.json?auth=${this.oken}`)
        .then((response) =>{
          console.log(response);
        });
  },
};
</script>
