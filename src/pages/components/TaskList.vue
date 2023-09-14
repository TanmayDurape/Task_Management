<template>
  <div>
    <h1 class="heading_h1">Your Task List</h1>
    <button class="btn btn-primary mb-3" @click="showTaskForm">Add Task</button>

    <!-- Include TaskForm as a child component -->
    <TaskForm :showForm="showForm" @addNewTask="addNewTask" @closeForm="closeForm" />

    <!-- Task List -->
    <!-- <div v-for="task in tasks" :key="task.id">
      <TaskItem :task="task" @deleteTask="deleteTask" />
    </div> -->

    <!-- Task List in Card Form -->
    <!-- Task List in Card Form -->
<div class="row">
  <div class="col-md-4" v-for="task in tasks" :key="task.id">
    <div class="card mb-3">
        <div class="card-header">
            <div class="custom-checkbox">
            <input type="checkbox" id="taskCompleted" v-model="task.completed" />
            <label class="checkmark"></label>
            <!-- Add a checkbox for task completion -->
            <input type="checkbox" class="form-check-input" id="taskCompleted" v-model="task.completed" @change="updateTaskCompletion(task)" />
        </div>
    </div>
        
      <div class="card-body">
        <h5 class="card-title">{{ task.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ task.dueDate }}</h6>
        <p class="card-text">{{ task.description }}</p>
        <p class="card-text">Priority: {{ task.priority }}</p>
        <div></div>
        <div class="d-flex justify-content-between align-items-center">
        <div :class="['priority-indicator', {'red': task.priority === 'High', 'yellow': task.priority === 'Medium', 'cyan': task.priority === 'Low'}]"></div>
          <button type="button" class="edit_button" @click="editTask(task)">
            <span class="edit_button__text">Edit Task</span>
            <span class="edit_button__icon">
              <svg class="edit_button_svg" xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" height="24" fill="none">
                <line y2="19" y1="5" x2="12" x1="12"></line>
                <line y2="12" y1="12" x2="19" x1="5"></line>
              </svg>
            </span>
          </button>
          <button class="button" @click="deleteTask(task.id)">
            <svg viewBox="0 0 448 512" class="svgIcon">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z">
              </path>
            </svg>
          </button>
        </div>
      </div>
    </div>
    </div>

    <div v-if="editMode" class="task-form-popup">
      <h2 class="mb-4">Edit Task</h2>
      <form @submit.prevent="saveEditedTask">
        <div class="mb-3">
          <label for="title" class="form-label">Title:</label>
          <input type="text" id="title" class="form-control" v-model="editedTask.title" required />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Description:</label>
          <textarea id="description" class="form-control" v-model="editedTask.description"></textarea>
        </div>
        <div class="mb-3">
          <label for="dueDate" class="form-label">Due Date:</label>
          <input type="date" id="dueDate" class="form-control" v-model="editedTask.dueDate" required />
        </div>
        <div class="mb-3">
          <label for="priority" class="form-label">Priority:</label>
          <select id="priority" class="form-control" v-model="editedTask.priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary" @click="closeForm" >Cancel</button>
        
      </form>
    </div>
</div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskForm,
  },
  data() {
    return {
      tasks: [],
      showForm: false,
      showFormKey: 0,
      editMode: false,
      editedTask: null,
    };
  },
  methods: {
    getCardPriorityClass(priority) {
    if (priority === 'High') {
      return 'high-priority';
    } else if (priority === 'Medium') {
      return 'medium-priority';
    } else if (priority === 'Low') {
      return 'low-priority';
    }
    return ''; // Default class if priority is not recognized
    },
    addNewTask(task) {
      this.tasks.push(task);
      this.closeForm();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      // this.deleteTask(taskId);
    },
    editTask(task) {
      this.editMode = true;
      this.editedTask = { ...task }; // Create a copy of the task being edited
      this.showForm = true;
      this.showFormKey += 1;
    },
    saveEditedTask() {
      // Find the index of the edited task in the tasks array
      const index = this.tasks.findIndex((task) => task.id === this.editedTask.id);
      if (index !== -1) {
        // Update the task with the edited data
        this.tasks[index] = { ...this.editedTask };
      }
      this.closeForm();
    },
    showTaskForm() {
      this.editMode = false;
      this.editedTask = null;
      this.showForm = true;
      this.showFormKey += 1;
      this.newTask = {
        title: '',
        description: '',
        dueDate: '',
      };
    },
    updateTaskCompletion(task) {
      task.completed = !task.completed;
    },
    closeForm() {
      this.showForm = false;
      this.editMode = false;
      this.editedTask = null;    
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.task-form-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.card {
  margin: 10px;
  border-radius: 15px;
}

.high-priority {
  background-color: #ff3d50; /* Red background for high priority */
}

.medium-priority {
  background-color: #fff37d; /* Yellow background for medium priority */
}

.low-priority {
  background-color: #5ca8ff; /* Cyan background for low priority */
}

.button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(20, 20, 20);
  border: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.164);
  cursor: pointer;
  transition-duration: .3s;
  overflow: hidden;
  position: relative;
}

.svgIcon {
  width: 12px;
  transition-duration: .3s;
}

.svgIcon path {
  fill: white;
}

.button:hover {
  width: 140px;
  border-radius: 50px;
  transition-duration: .3s;
  background-color: rgb(255, 69, 69);
  align-items: center;
}

.button:hover .svgIcon {
  width: 50px;
  transition-duration: .3s;
  transform: translateY(60%);
}

.button::before {
  position: absolute;
  top: -20px;
  content: "Delete";
  color: white;
  transition-duration: .3s;
  font-size: 2px;
}

.button:hover::before {
  font-size: 13px;
  opacity: 1;
  transform: translateY(30px);
  transition-duration: .3s;
}


.edit_button {
  position: relative;
  width: 150px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid #34974d;
  background-color: #3aa856;
}

.edit_button, .edit_button__icon, .edit_button__text {
  transition: all 0.3s;
}

.edit_button .edit_button__text {
  transform: translateX(30px);
  color: #fff;
  font-weight: 600;
}

.edit_button .edit_button__icon {
  position: absolute;
  transform: translateX(109px);
  height: 100%;
  width: 39px;
  background-color: #34974d;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit_button_svg {
  width: 30px;
  stroke: #fff;
}

.edit_button:hover {
  background: #34974d;
}

.edit_button:hover .edit_button__text {
  color: transparent;
}

.edit_button:hover .edit_button__icon {
  width: 148px;
  transform: translateX(0);
}

.edit_button:active .edit_button__icon {
  background-color: #2e8644;
}

.edit_button:active {
  border: 1px solid #2e8644;
}

.heading_h1{
    

      font-family: 'Lobster';
      color: black;
      font-size: 50px;
}

/* Style for the checkbox */
.custom-checkbox {
  display: inline-block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 18px;
}

/* Hide the default browser checkbox */
.custom-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Style the checkmark/indicator */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
}

/* Show the checkmark when the checkbox is checked */
.custom-checkbox input:checked ~ .checkmark:after {
  content: "\2713"; /* Unicode checkmark character */
  font-size: 16px;
  color: #007bff; /* Change the color to your preferred color */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>