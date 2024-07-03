/** @odoo-module **/

import { registry } from "@web/core/registry"
import { kanbanView } from "@web/views/kanban/kanban_view"
import { KanbanController } from "@web/views/kanban/kanban_controller"
import { useService } from "@web/core/utils/hooks"

const { onWillStart } = owl
const isFromContactsKanban = Symbol('isFromContactsKanban'); //defining this as a symbol - guaranteed to be unique

class ResPartnerKanbanController extends KanbanController {
    setup() {
        super.setup()
        this.action = useService('action')
        this.orm = useService('orm')

        //fetching customer locations on start before displaying
        onWillStart(async () => {
            this.customerLocations = await this.orm.readGroup('res.partner', [], ['state_id'], ['state_id'])
        })
    }

    openSalesView() {
        this.action.doAction({ // doAction - used to navigate to different views or executing actions
            type: 'ir.actions.act_window',
            name: 'Customer Sales',
            res_model: 'sale.order',
            views: [[false, 'list'], [false, 'form']],

        })
    }

    openInvoicesView() {
        this.action.doAction({
            type: 'ir.actions.act_window',
            name: 'Invoices',
            res_model: 'account.move',
            views: [[false, 'list'], [false, 'form']],
        })
    }

    selectLocations(state) {
        const id = state[0]
        const name = state[1]

        // turn off filters - only one filter at a time
        const customerFilters = this.env.searchModel.getSearchItems((searchItem) => {
            console.log('filter currently using is:', searchItem);
            searchItem[isFromContactsKanban];
        });

        for (const customerFilter of customerFilters) {
            if (customerFilter.isActive) {
                console.log('toggling off filter:', customerFilter);
                this.env.searchModel.toggleSearchItem(customerFilter.id);
            }
        }

        // create new filter for location in search view
        this.env.searchModel.createNewFilters([{
            description: name,
            domain: [["state_id", "=", id]],
            [isFromContactsKanban]: true, // custom key to identify our filters
        }]);

    }

}

ResPartnerKanbanController.template = 'owl.ResPartnerKanbanView'

export const resPartnerKanbanView = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: "owl.ResPartnerKanbanView.Buttons",
}

registry.category('views').add('res_partner_kanban_view', resPartnerKanbanView)
