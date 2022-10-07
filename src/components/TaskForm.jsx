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
        />

        <button className="btn btn-primary btn-warning my-4">Save</button>
    </form>

)
};
