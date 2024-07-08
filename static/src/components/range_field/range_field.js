/** @odoo-module **/

import { Component, useState, onWillUpdateProps } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";

export class RangeField extends Component {
    setup(){
        this.state = useState({
            range: this.props.value || '',
        });
    }


}
RangeField.props={
    ...standardFieldProps,
}
RangeField.supportedTypes = ['integer']
RangeField.template = "owl.RangeField"
registry.category("fields").add("range", RangeField);

