import { useContext, useState } from "react"
import TasksContext from "../CreateContext/Tasks"

function Form(){

    const[title, setTitle] = useState('')
    const[description, setDescription] = useState('')
    const {dispatch } = useContext(TasksContext)
    const[formErrors, setFormErrors] = useState({})
    const errors = {}

    function runValidations(){
        if(title.trim().length === 0){
            errors.title = 'title is required'
        }
        if(description.trim().length === 0){
            errors.description = 'description is required'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                id : Number(new Date()),
                title : title,
                description: description,
                status : 'TO DO'
            }
            dispatch({type: 'ADD_TASK',payload: formData})
            setTitle('')
            setDescription('')
        } else {
            setFormErrors(errors)
        }
       
    }

    return(
        <div className="g-col-6">
            <h3>Add Task</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)} 
                        id="title"
                        className="form-control "
                 />
                 {formErrors.title && <span>{formErrors.title}</span>}
                </div>

                <div className="form-group">

                    <label htmlFor="description" className="form-label"> Enter Description</label>
                    <textarea
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                     className="form-control"
                    >
                    </textarea>
                    {formErrors.description && <span>{formErrors.description}</span>}
                </div>
                <input type="submit"  className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default Form