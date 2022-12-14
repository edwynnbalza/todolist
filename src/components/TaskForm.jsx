import { ButtonSubmitForm } from "./ButtonActions";

export const TaskForm = ({ handleSave, task, setTask }) => {

const onSubmit = (event) => {
    event.preventDefault();
    handleSave(task);
}

return (
    <form onSubmit={onSubmit} className='my-4 row'>
        <input
        type="text"
        value={task}
        placeholder="Ingrese una tarea"
        onChange={(e) => setTask(e.target.value)}
        className="form-control"
        maxLength="50"
        />
        <ButtonSubmitForm
            name="Save"
            styled="btn btn-primary btn-warning my-4"
        />
    </form>

)
};
