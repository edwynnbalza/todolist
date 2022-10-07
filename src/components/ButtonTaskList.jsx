export const ButtonTaskList = ({ handleButton, task, name, styled }) => (
    <button 
        className={styled}
        onClick={() => handleButton(task)}
    >
        {name}
    </button>
)