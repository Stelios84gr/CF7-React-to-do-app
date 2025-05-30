import TodoForm from "./TodoForm.tsx";
import {useReducer} from "react";
import TodoList from "./TodoList.tsx";

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
            return [...state, newTodo];
        }
            case "DELETE":
                    return state.filter(todo => todo.id !== action.payload);
    }

}

const Todo = () =>{

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