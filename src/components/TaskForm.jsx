export const TaskForm = ({ handleSave, task, setTask }) => {

const onSubmit = (event) => {
    event.preventDefault();
    handleSave(task);
}

return (
    <form onSubmit={onSubmit}>
        <input
        type="text"
        value={task}
        placeholder="Ingrese una tarea"
        onChange={(e) => setTask(e.target.value)}
        />

        <button>Guardar</button>
    </form>

)
};
