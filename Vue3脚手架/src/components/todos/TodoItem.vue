<template>
  <li :class="{ completed: todo.completed, editing: todo === editedTodo }">
    <!-- 绑定完成状态 -->
    <div class="view">
      <input type="checkbox" v-model="todo.completed" />
      <label @dblclick="editTodo(todo)">
        {{ todo.title }}
      </label>
      <button @click="removeTodo(todo)">x</button>
    </div>
    <!-- 编辑待办 -->
    <EditTodo
      class="edit"
      v-model:todo-title="todo.title"
      v-todo-focus="todo === editedTodo"
      @blur="doneEdit(todo)"
      @keyup.enter="doneEdit(todo)"
      @keyup.escape="cancelTodo(todo)"
    >
    </EditTodo>
  </li>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    todo: {
      type: Object,
      require: true,
    },
    editedTodo: Object,
  },
  emits: ["remove-todo", "update:edited-todo"],
  setup(props, { emit }) {
    const state = reactive({
      beforeEditCache: "", // 缓存编辑前的title
    });
    function removeTodo(todo) {
      emit("remove-todo", todo);
    }

    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      emit("update:edited-todo", todo);
    }

    function cancelTodo() {
      todo.title = state.beforeEditCache;
      emit("update:edited-todo", null);
    }

    function doneEdit() {
      emit("update:edited-todo", null);
    }
    return {
      ...toRefs(state),
      removeTodo,
      editTodo,
      cancelTodo,
      doneEdit,
    };
  },
  directives: {
    "todo-focus": (el, { value }) => {
      if (value) {
        el.focus();
      }
    },
  },
};
</script>
<style scoped>
.completed label {
  text-decoration: line-through;
}
.edit,
.editing .view {
  display: none;
}
.view,
.editing .edit {
  display: block;
}
</style>