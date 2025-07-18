import { useState } from "react";
import type { TodoFormProps } from "../types.ts";

// passes the parent component's reducer Action as a Prop
const TodoForm = ({ dispatch, inputRef }: TodoFormProps) => {

    const [text, setText] = useState("");

    // const inputRef = useRef<HTMLInputElement>(null);

    // arrow function with event e as a parameter which is a React.ChangeEvent that takes an HTMLInputElement
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // prevents the form from reloading after submission
        if (text.trim() !== "") {   // doesn't allow spaces at the start and the end
            dispatch({type: "ADD", payload: text}); // text from the state
            setText("");    // clear the input element
            inputRef.current?.focus();
        }
    };

    return (
        <>
            <form
                className="flex gap-4 mb-4"
                onSubmit={handleSubmit} // searches for a submit button or input element enter press
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={handleChange}
                    className="flex-1 border p-2 rounded"
                    placeholder="new task..."
                />
                <button
                    type="submit"
                    className="bg-cf-dark-gray text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </form>
        </>
    )
};

export default TodoForm;