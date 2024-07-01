{
    'name':'To-Do List',
    'author':'Nidal SJ',
    'category':'Work',
    'summary':'Odoo Owl',
    'description': """
    Creating views using Odoo Owl
    """,
    'license':'LGPL-3',
    'version':'1.0',
    'depends': ['base','web'],
    'data':[
        'security/ir.model.access.csv',
        'views/todo_list.xml', 
        'views/menu_items.xml', 
        'views/res_partner.xml', 
    ],
    'installable': True,
    'auto_install': False,
    'application': False,
    'assets':{
        'web.assets_backend': [
            'todo_list/static/src/components/*/*.js',
            'todo_list/static/src/components/*/*.xml',
            'todo_list/static/src/components/*/*.scss',

        ],
    },
    
}
