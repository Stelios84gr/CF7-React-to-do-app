import TodoForm from "./TodoForm.tsx";
import { useReducer } from "react";
import TodoList from "./TodoList.tsx";

// elements we want each to-do element to include, text and an id to add/delete it by
type TodoProps = {
    id: number;
    text:string;
}

type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number};

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
            default: return state;
    }
}

// also creates a specific kind of comment
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