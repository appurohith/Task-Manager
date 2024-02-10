import { useState, useContext,useEffect } from "react"
import TasksContext from "../CreateContext/Tasks"

import {Button, Modal , ModalBody, ModalHeader, ModalFooter} from 'reactstrap'

function List(){

    const {tasks, dispatch } = useContext(TasksContext)
    const[modal, setModal] = useState(false)
    const[isEdit, setIsEdit] = useState(false)
    const [task, setTask] = useState(undefined)


    useEffect(() => {
        if(tasks.data.length > 0){
            setTask(tasks.data.find(ele=> ele.id === tasks.selectedTask))
        }
    }, [tasks.selectedTask])

    const handleRemove = (id) => {
        const userInput = window.confirm("Are you sure macha?")
        if(userInput){
            dispatch({type: 'REMOVE_TASK',payload : id})
        }
    }
    const handleSelect = (id) => {
        dispatch({ type : "SET_TASK", payload: id})
        setModal(true)
    }

    const toggle = () => {
        setModal(!modal)
        setIsEdit(false)
        setTask(undefined)
        dispatch({type : "CLEAR_SELECTED_TASK"})

    }

    const handleEdit = () => {
        setIsEdit(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleChange =(e) => {
        setTask({...task,[e.target.name]: e.target.value})
    }

    const handleSave = () => {
        dispatch({type: 'UPDATE_TASK',payload: task})
        dispatch({type: 'CLEAR_SELECTED_TASK'})
        setModal(false)
        setIsEdit(false)
        setTask(undefined)
    }

    const chooseColor = (status) => {
        if(status === 'TO DO'){
            return "badge text-bg-warning "
        } else if (status === 'In Progress'){
            return "badge text-bg-primary  "
        } else if (status === 'Done'){
            return "badge text-bg-success"
        }
    }

    return(
        <div className="g-col-6" >
            <h2>Listing Tasks - {tasks.data.length}</h2>

               {/* <h3> selected task -{tasks.selectedTask}</h3> */}
             { task && (  
                <div>
                    <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle}> 
                            { isEdit ? 'Edit Task ' : (
                                <> { task.title} <span className={chooseColor(task.status)}>{ task.status } </span> </>
                            )}
                            
                            
                        </ModalHeader>
                        <ModalBody>
                            
                            { isEdit ?  (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Title</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            value={task.title} 
                                            name="title"
                                            onChange={handleChange}
                                        /> 
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            value={task.description}
                                            name="description"
                                            onChange={handleChange}
                                        >
                                        </textarea>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Select Status</label>
                                        <select value={task.status} className="form-control" name="status" onChange={handleChange}>
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </div>
                                </form> ) : task.description 
                            }   
                        </ModalBody>
                        <ModalFooter>
                            { isEdit ? <Button color="success" onClick={handleSave}>Save</Button> : <Button color="primary" onClick={handleEdit}>Edit</Button>}
                            
                            <Button color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </Modal>
                </div> 
            )}

                <ul className="list-group">
                    {tasks.data.map((ele) => {
                        return <li key={ele.id} 
                        className="list-group-item">{ele.title} 

                        <div className="float-end">
                
                         <span className={chooseColor(ele.status)}>{ele.status}</span>
                        <button className="btn btn-outline-danger" 
                          onClick={() => {handleRemove(ele.id)}}>delete
                        </button>
                        <button onClick={() => {
                            handleSelect(ele.id)
                        }}>view</button>
                        </div>
                        </li>

                    })}
                </ul>
        </div>
    )
}

export default List