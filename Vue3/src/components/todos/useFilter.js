import { reactive, computed } from "vue";

// 过滤
const filters = {
    all(todos) {
        return todos;
    },
    active(todos) {
        return todos.filter((todo) => !todo.completed);
    },
    completed(todos) {
        return todos.filter((todo) => todo.completed);
    },
};

export function useFilter(todos) {
    const filterState = reactive({
        visibility: "all",
        filterItems: [
            {
                label: "All",
                value: "all",
            },
            {
                label: "Active",
                value: "active",
            },
            {
                label: "Completed",
                value: "completed",
            },
        ],
        filterTodos: computed(() => {
            return filters[filterState.visibility](todos.value);
        }),
    });

    return filterState
}