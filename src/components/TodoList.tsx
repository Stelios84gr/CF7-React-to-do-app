import {Trash2, Edit, Save, X } from "lucide-react";
import type { TodoListProps } from "../types.ts";
import {useState} from "react";

const TodoList = ({todos, dispatch}: TodoListProps) => {
    // edit data saved in local states
    const [editId, setEditId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleDelete = (id: number) => () => {
        dispatch({type: "DELETE", payload: id});
    }

    const handleEdit = (id: number, text: string)=> {
        // enters edit mode, no dispatch edit right away, EDIT action should happen after input data is saved via handleSave
        setEditId(id);
        setEditText(text);

    }

    const handleCancel = () => {
        setEditId(null);    // because of { editId === todo.id ? (edit mode) : (default mode) }
        setEditText("");    // cleans up the text state for future use
    }
    const handleSave = (id: number) => {
        dispatch({type: "EDIT", payload: {id, newText: editText}});
        setEditId(null);    // so edit mode returns to default mode
        setEditText("");
    };




    return (
        <>
            <ul className="space-y-2">
                {todos.map(todo => (    // loops through the contents of the array state (todo) and renders array item as a li
                    // key: react identifier to keep track of list items
                    <li key={todo.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                        { editId === todo.id ? (    // if editId is todo.id, display edit more, else, view mode
                            <>
                                {/*EDIT MODE*/}
                                <div className="flex flex-1 gap-2">
                                    <input
                                        type="text"
                                        value={editText}
                                        // onChange: when the user types
                                        onChange={(e) => setEditText(e.target.value)}
                                        className="w-62 border rounded p-1"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleSave(todo.id)}
                                        className="text-disk-blue"
                                    >
                                        <Save size={18}/>
                                    </button>
                                    <button
                                        onClick={() => handleCancel()}
                                        className="text-cf-dark-red"
                                    >
                                        <X size={18}/>
                                    </button>
                                </div>
                            </>
                            ) : (
                                <>
                                    {/*VIEW MODE*/}
                                    <span>{todo.text}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(todo.id, todo.text)}
                                            className="text-cf-gray"
                                        >
                                            <Edit size={18}/>
                                        </button>
                                        <button
                                            onClick={handleDelete(todo.id)}
                                            className="text-cf-dark-red"
                                        >
                                            <Trash2 size={18}/>
                                        </button>
                                    </div>
                                </>
                        )
                        }
                    </li>
                    ))}
            </ul>
        </>
    )
}

export default TodoList;