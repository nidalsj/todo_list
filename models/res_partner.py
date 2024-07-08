from odoo import models, fields, api

class ResPaertner(models.Model):
    _inherit = 'res.partner'

    expected_salary = fields.Integer()