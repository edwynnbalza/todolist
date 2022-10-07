import { ButtonTaskList } from './ButtonActions';

export const TaskList = ({taskItems, handleEdit, handleDelete}) => (
    <div className='my-5' style={{ maxHeight: '250px', overflow: 'hidden auto' }}>
            {
              taskItems.length > 0 ?
                taskItems.map(task => (
                  <div key={task.id} className="row border-bottom border-secondary mb-3 py-1"> 
                    <div style={{overflowWrap: 'break-word'}} className='col-md-8'>
                      {task.name} 
                    </div>
                    <div className='col-md-4'>
                        <ButtonTaskList
                            handleButton={handleEdit}
                            task={task}
                            name="Edit"
                            styled="btn btn-primary btn-warning mx-1 btn-sm"
                        />
                        <ButtonTaskList
                            handleButton={handleDelete}
                            task={task.id}
                            name="Delete"
                            styled="btn btn-danger mx-1 btn-sm"
                        />
                    </div>
                  </div>
                ))
              : <h4>No tasks</h4>
            }
        </div>
);