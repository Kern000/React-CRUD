import React from 'react';

export default class TaskList extends React.Component{
    
    state={
        'tasks':[
                    {
                        id:1,
                        description:'Walk the dog',
                        done:false
                    },
                    {
                        id: 2,
                        description:'Water the plants',
                        done:false
                    },
                    {
                        id: 3,
                        description:'Pay the bills',
                        done:false
                    }
                ],
        'newTaskName':"",
        'taskBeingEdited': 0,
        'modifiedTaskName':""

    }

    render(){
        return <React.Fragment>
            <h1>To do list</h1>
            <ul>
                {this.state.tasks.map((task)=> this.state.taskBeingEdited !== task.id? this.displayNormal(task) : this.displayEditTask(task)
                )}
            </ul>
            <h2>Create New Task</h2>
            <div>
                <label className="form-check-label"> Task Description </label>
                <br/>
                <input  type="text" 
                        name="newTaskName"
                        value={this.state.newTaskName}
                        onChange={this.updateFormField}
                        />
                <button onClick={this.addTask} className="ms-3 btn btn-info btn-sm"> Add </button>
            </div>
        </React.Fragment>
    }

    updateFormField = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        }) 
    }

    addTask = () => {

        const newTask = {
        "id": Math.floor(Math.random() * 10000 + 1),
        "description": this.state.newTaskName,
        "done": false
        }
    
        const clone = this.state.tasks.slice();
        
        clone.push(newTask);

        this.setState({
            "tasks": clone,
            "newTaskName": ""
        })
    }

    checkTask = (taskId) => {
        
        let indexToChange = this.state.tasks.findIndex(task=> task.id === taskId);
        let taskToChange = this.state.tasks[indexToChange];
        const clone = {...taskToChange};
        clone.done = !clone.done
        const left = this.state.tasks.slice(0, indexToChange);
        const right = this.state.tasks.slice(indexToChange +1)
        const modifiedTasks = [...left, clone,...right]

        this.setState({
            "tasks": modifiedTasks
        })
    }

    deleteTask = (taskId) => {
        let indexToDelete = this.state.tasks.findIndex(task => task.id === taskId)
        let modifiedTasks = [...this.state.tasks.slice(0, indexToDelete), ...this.state.tasks.slice(indexToDelete + 1)]
        this.setState({
            tasks: modifiedTasks
        })
    }

    displayNormal = (task) => {
        return (
            <li key={task.id} className="list-group-item">
                {task.description}
                <input  type="checkbox"
                        checked={task.done===true}
                        className="ms-3"
                        onChange={()=>this.checkTask(task.id)}
                />
                <br/>
                <button className="ms-3 btn btn-primary btn-sm" onClick={async()=> {
                    this.setState({
                        'taskBeingEdited': task.id,
                        'modifiedTaskName': task.description
                    })
                }}> Edit </button>
                
                <button className="ms-3 btn btn-danger btn-sm" onClick={()=>this.deleteTask(task.id)}>
                Delete
                </button>
            </li>
        )
    }

    displayEditTask = task => {
        return(
            <li>
                <input  type="text"    
                        name="modifiedTaskName"
                        value={this.state.modifiedTaskName}
                        placeholder="Enter new description"
                        onChange={this.updateFormField}
                />
                <button onClick={()=> {
                        this.updateTask(task.id);
                        this.setState({
                            'taskBeingEdited':0
                        })                
                }}
                > Update </button>
            </li>
        )
    }

    updateTask = taskId =>{
    
        const indexToChange=this.state.tasks.findIndex(task => task.id === taskId);
        const taskToChange=this.state.tasks[indexToChange];
        const left=this.state.tasks.slice(0, indexToChange);
        const right=this.state.tasks.slice(indexToChange+1);
        taskToChange.description = this.state.modifiedTaskName
        const modifiedTasks = [...left,taskToChange,...right]

        this.setState({
            "tasks":modifiedTasks
        })
    }
}




// create new taskName in state because doing create operation
// massage data of newTaskName for consistency - when using onclick arrow function of addTask
// then do 3 steps: clone array, modify (push), replace original using setState
// spread operator (...) can be used on objects as well. In JavaScript, the spread syntax allows you to create a shallow copy of an object or merge multiple objects into a new object.
// !clone.done here means will go for the boolean opposite - if state is true, check will uncheck, if state is false, check will check
// remember slice 2nd argument is non inclusive so need +1
// cannot do direct this.checkTask because now we are passing value in the argument, it will call it direct.
// update state with new property taskBeingEdited to allow keeping track of which one we editing. Initial is 0 as a placeholder.
// modifiedTaskName will later be added into the tasks to replace the description
// can use task.id within the onClick callback without explicitly passing it as an argument. It will refer to the id property of the task object associated with the current iteration of the .map function.



