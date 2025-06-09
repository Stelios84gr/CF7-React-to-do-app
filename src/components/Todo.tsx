import { useReducer } from "react";
import TodoForm from "./TodoForm.tsx";
import TodoList from "./TodoList.tsx";
import type { TodoProps, Action } from "../types.ts";

const todoReducer = (state: TodoProps[], action: Action): TodoProps[] => {
    switch (action.type) {
        case "ADD": {
            const newTodo: TodoProps = {
                    id: Date.now(),
                    text: action.payload
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
            );
            default:
                return state;
    }
}

// "Todo" also creates a specific kind of comment
const Todo = () => {

    const [todos, dispatch] = useReducer(todoReducer, []);
    // const [todos, setTodos] = useState([]); // με useState

    return (
        <>
            <div className="max-w-sm mx-auto p-6">
                <h1 className="text-center text-2xl mb-4">To-Do List</h1>
                <TodoForm dispatch={dispatch} />
                <TodoList todos={todos} dispatch={dispatch} />
            </div>
        </>
    )
};

export default Todo;