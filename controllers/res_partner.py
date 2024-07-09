from odoo import http


class ResPartner(http.Controller):
    @http.route('/owl/rpc_service', type='json', auth='user')
    def get_customers(self):
        return http.request.env['res.partner'].search_read([], ['name','email'])