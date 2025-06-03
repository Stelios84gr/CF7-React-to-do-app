import { Trash2 } from "lucide-react";

type Todo = {
    id: number;
    text: string;
}

type TodoListProps = {
    todos: Todo[];
    dispatch: React.Dispatch<{type: "DELETE"; payload: number}> // instead of React.Dispatch<Action> since we only need DELETE
}

const TodoList = ({todos, dispatch}: TodoListProps) => {

    const handleDelete = (id: number) => () => {
        dispatch({type: "DELETE", payload: id});
    }




    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (    // loops through the contents of the todo and renders it as a li
                    // key: react identifier to keep track of list items
                    <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        <span>{todo.text}</span>
                        <button
                            onClick={handleDelete(todo.id)}
                            className="text-cf-dark-red"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </li>
                    ))}
            </ul>
        </>
    )
}

export default TodoList;