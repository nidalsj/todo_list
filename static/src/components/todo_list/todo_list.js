/* @odoo-module */
import { registry } from "@web/core/registry";
const { Component, useState } = owl;

export class OwlTodoList extends Component {
    setup(){
        this.state = useState 
    }

}

OwlTodoList.template = 'owl.TodoList'
registry.category('actions').add('owl.action_todo_list_js', OwlTodoList);