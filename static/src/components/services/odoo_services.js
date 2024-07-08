/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { ConfirmationDialog } from '@web/core/confirmation_dialog/confirmation_dialog';


const { component, useSubEnv, useState } = owl


export class OwlOdooServices extends Component {
    setup(){
        console.log('owl odoo services')
        this.display = {
            controlPanel: {"top-right": false, "bottom-right": false}
        }

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config,
            }
        })

        // this.cookieServive = useService("cookie")
        // console.log(this.cookieServive)

        this.state = useState({
            get_http_data: [],
            post_http_data: [],
        })

    }

    showNotification(){
        const notification = this.env.services.notification
        notification.add('This is a sample notification',{
            title: "Odoo notification service",
            type: "info", //bootsrap colors - info,danger,success,warning
            sticky: true, //doesnt automatically close
            //className: "p-4", //adding class 
            buttons: [
                {
                    name: 'Notification Action',
                    onClick: ()=>{
                        console.log('Notification Action')
                    },
                    primary: true,
                },
    
            ]

        })
    }

    showDialog(){
        const dialog = this.env.services.dialog
        dialog.add(ConfirmationDialog, {
            title: 'Dialog Service',
            body: 'Are you sure you want to continue?',
            confirm: ()=>{
                console.log('Action confirmed')
            },
            cancel: ()=>{
                console.log('Action cancelled')
            },
            // onClose: ()=>{
            //     console.log('Action closed')
            // }
        })
        console.log('this is dialog')
    }

    showEffect(){
        const effect = this.env.services.effect
        console.log(effect)
        effect.add({
            type: 'rainbow_man', //can also create custom effects
            message: 'This is an effect service',
        })
    }

    // setCookieService(){
         
    // }

    async getHttpService(){ //expecting a response
        const http = this.env.services.http
        console.log(http)
        const data = await http.get('https://dummyjson.com/products')
        console.log(data)
        this.state.get_http_data = data.products
    }

    async postHttpService(){
        const http = this.env.services.http
        console.log(http)
        const data = await http.post('https://dummyjson.com/products/add', {title: 'BMW Pencil'})
        console.log(data)
        this.state.post_http_data = data
    }
    
}


OwlOdooServices.template = 'owl.OdooServices'
OwlOdooServices.components = { Layout }

registry.category('actions').add('owl.OdooServices', OwlOdooServices)
