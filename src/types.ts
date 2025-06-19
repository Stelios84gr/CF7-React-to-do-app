// elements we want each to-do element to include, text and an id to add/delete it by
export type TodoProps = {
    id: number;
    text:string;
    completed: boolean;
}

export type Action =
    | {type: "ADD"; payload: string}
    | {type: "DELETE"; payload: number}
    | {type: "EDIT"; payload: {id: number, newText: string} }
    | {type: "COMPLETE"; payload: number}
    | {type: "CLEAR_ALL";}

export type TodoFormProps = {
    dispatch: React.Dispatch<Action>;
    inputRef: React.RefObject<HTMLInputElement | null>;
};

export type TodoListProps = {
    todos: TodoProps[]; // replaced Todo[] since it was the same
    dispatch: React.Dispatch<Action> // replace DELETE with generic Action type for reusability
}