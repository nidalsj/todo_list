/** @odoo-module **/

import { registry } from '@web/core/registry';
const { Component, useState, onWillStart, useRef } = owl;
//Component - base class, building blocks of OWL applications, structure, logic, styling
//useState - create reactive state variables within the component, tells the component to refresh when its value changes.  
//onWillStart - fetching data from a server, runs before component is displayed
//useRef - lets us to create ref to DOM element like input
import { useService } from "@web/core/utils/hooks"; // useService is a hook that allows you to use services within a component
// LEARN WHAT IS A HOOKS IN OWL

export class OwlTodoList extends Component { //initialize the component
    setup(){
        this.state = useState({ //reactive state variables - component auto render when value is changed in them
            task:{name:"", color:"#FF0000", completed:false},
            taskList:[],
            isEdit: false,
            activeId: false,
        })
        this.orm = useService("orm")
        this.model = "owl.todo.list"
        this.searchInput = useRef("search-input") //ref to search input element. allows component to interact with DOM element directly 

        onWillStart(async ()=>{ //life-cycle hook. runs before the component is displayed. 
            await this.getAllTasks() // awaiting this function. assigns to taskList array before component displayed. (Promise) 
        })
    }

    async getAllTasks(){ //fetches tasks. in the context, no domain filters so [], then list of fields
        this.state.taskList = await this.orm.searchRead(this.model, [], ["name", "color", "completed"])
    }

    addTask(){
        this.resetForm() //reset task form to default values
        this.state.activeId = false //no existing task is currently active
        this.state.isEdit = false //component in add mode
    }

    editTask(task){
        this.state.activeId = task.id //active task id
        this.state.isEdit = true //component in edit mode
        this.state.task = {...task} //fill the form by current values
    }

    async saveTask(){

        if (!this.state.isEdit){ //checks if the component is not in edit mode
            await this.orm.create(this.model, [this.state.task]) //creates new task with  an array new task data from the component state
            //the CREATE method always expects values in an ARRAY so we have values in an array
            //because if needed we can create multiple records in a single call
            this.resetForm()
        } else {
            await this.orm.write(this.model, [this.state.activeId], this.state.task) //update existing
            //the WRITE method expects array of record ids to update and updated data as plain object
            //because you might want to update multiple records at once
        }

        await this.getAllTasks()
    }

    resetForm(){
        this.state.task = {name:"", color:"#FF0000", completed:false}
    }

    async deleteTask(task){
        await this.orm.unlink(this.model, [task.id])
        await this.getAllTasks()
    }

    async searchTasks(){
        const text = this.searchInput.el.value
        this.state.taskList = await this.orm.searchRead(this.model, [['name','ilike',text]], ["name", "color", "completed"])
    }

    async toggleTask(e, task){ //an event e and task object as params
        await this.orm.write(this.model, [task.id], {completed: e.target.checked})
        await this.getAllTasks()
    }

    async updateColor(e, task){ //toggles complete status of a task and refreshes the task list
        await this.orm.write(this.model, [task.id], {color: e.target.value})
        await this.getAllTasks()
    }
}

//specifying the template and client action
OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);
