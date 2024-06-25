from odoo import fields, models, api


class OwlTodo(models.Model):
    _name = 'owl.todo.list'
    _description = 'Owl Todo List App'


    name = fields.Char(string='Task Name')
    completed = fields.Boolean()
    color = fields. Char()