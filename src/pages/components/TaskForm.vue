<template>
  <div v-if="showForm" class="task-form-popup">
    <h2 class="mb-4">Add Task</h2>
    <form @submit.prevent="addNewTask">
      <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input type="text" id="title" class="form-control" v-model="newTask.title" required />
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" class="form-control" v-model="newTask.description"></textarea>
        </div>

        <div class="mb-3">
          <label for="dueDate" class="form-label">Due Date:</label>
          <input type="date" id="dueDate" class="form-control" v-model="newTask.dueDate" required />
        </div>

        <div class="mb-3">
        <label for="priority" class="form-label">Priority:</label>
        <select id="priority" class="form-control" v-model="newTask.priority">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        </div>

      <button type="submit" class="btn btn-primary">Add</button>
      <button type="button" class="btn btn-secondary top-right" @click="closeForm"></button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    showForm: Boolean,
  },
  data() {
    return {
      newTask: {
        // Initialize your form fields here
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      },
    };
  },
  methods: {
    addNewTask() {
      const task = {
        id: Date.now(),
        ...this.newTask,
      };
      this.$emit('addNewTask', task);
    },
    closeForm() {
      this.$emit('closeForm');
      this.newTask = {
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      };
    },
  },
};
</script>

<style scoped>
    .top-right {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 20px;
        height: 20px;
        border-radius: 0;
        background-color: #ff3d50;
    }
</style>
