/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component } from "@odoo/owl";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";


const { component, useSubEnv } = owl


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
    }
    
}


OwlOdooServices.template = 'owl.OdooServices'
OwlOdooServices.components = { Layout }

registry.category('actions').add('owl.OdooServices', OwlOdooServices)
