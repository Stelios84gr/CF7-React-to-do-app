import {useReducer, useEffect} from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type { TodoProps, Action } from "../types.ts";

const getInitialTodos = () => {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : [];    // stored as string; we want it as JSON
}

const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case "ADD": {
            const newTodo: TodoProps = {
                    id: Date.now(),
                    text: action.payload,
                    completed: false
            };
            return [...state, newTodo]; // copies the current state array and adds a newTodo
                                        // array-spreading for immutability; doesn't modify existent array
        }
        case "DELETE":
            // returns a new array containing only todos whose id isn't the same as the action payload one
            return state.filter(todo => todo.id !== action.payload);
        case "EDIT":
            return state.map( todo =>
                todo.id === action.payload.id
                ? {...todo, text: action.payload.newText}   // object spread - return a todo copy with newText
                : todo
            )
        case "COMPLETE":
            return state.map( todo =>
                todo.id === action.payload
                ? {...todo, completed: !todo.completed}
                : todo
            )
        case "CLEAR_ALL":
            return [];
        default:
            return state;
    }
}

// "Todo" also creates a specific kind of comment
const Todo = () => {

    // []: each time app starts, states is initialized as empty, so all local storage content is deleted
    // starts with initial state [] which changes by getInitialTodos
    const [todos, dispatch] = useReducer(todoReducer, [], getInitialTodos);
    // const [todos, setTodos] = useState([]); // with useState

    const totalTasks: number = todos.length;
    const completedTasks: number = todos.filter(t => t.completed).length;
    const activeTasks: number = totalTasks - completedTasks;

    useEffect(() => {
        // local storage contains key-value pairs, so we set a key-value pair when state changes
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])

    const handleClearAll = () => {
        dispatch({type: "CLEAR_ALL"});
    }

    return (
        <>
            <div className="max-w-sm mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
                <TodoForm dispatch={dispatch} />
                <TodoList todos={todos} dispatch={dispatch} />
                { todos.length > 0 && (
                    <>
                        <div className="flex justify-between border-t pt-2 mt-4 text-cf-gray">
                            <span>Total: {totalTasks}</span>
                            <span>Active: {activeTasks}</span>
                            <span>Completed: {completedTasks}</span>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                onClick={handleClearAll}
                                className="bg-cf-dark-red text-white py-2 px-4 rounded"
                            >
                                Clear All
                            </button>
                        </div>
                    </>
                )
                }
            </div>
        </>
    )
};

export default Todo;