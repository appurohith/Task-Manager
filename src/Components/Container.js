import { useReducer, createContext } from "react"
import Form from "./Form"
import List from "./List"
import TasksContext from "../CreateContext/Tasks"
import 'bootstrap/dist/css/bootstrap.min.css'

function reducer(state, action){
    switch(action.type){
        case 'ADD_TASK': {
            return {...state, data:[...state.data,action.payload]}
        }
        case 'REMOVE_TASK': {
            return{...state, data: state.data.filter(ele => ele.id !== action.payload)}
        }
        case 'SET_TASK' : {
            return{...state, selectedTask: action.payload}
        }
        case 'CLEAR_SELECTED_TASK' : {
            return{...state, selectedTask: ''}
        }
        case 'UPDATE_TASK' : {
            return{...state, data: state.data.map(ele => {
                if(ele.id === action.payload.id){
                    return{...ele, ...action.payload}
                } else {
                    return {...ele}
                }
            })}
        }

        default: {
            return{...state.data}
        }
    }
}



function Container(){
const [tasks, dispatch]= useReducer(reducer, {data: [], selectedTask: ''})

    return(
        <div class="row" >
            <TasksContext.Provider value={{tasks:tasks, dispatch:dispatch}}>
            <h2>Container component</h2>
           
            <div class="col" >
            <List/>
            </div>
            <div class="col" >
            <Form dispatch={dispatch}/>
            </div>
           
            </TasksContext.Provider>
            
        </div>
    )
}

export default Container