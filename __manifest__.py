{
    'name':'To-Do List',
    'author':'Nidal SJ',
    'category':'Work',
    'summary':'To-Do List OWL Framework',
    'license':'LGPL-3',
    'version':'1.0',
    'depends': ['base'],
    'data':[
        'security/ir.model.access.csv',
        'views/todo_list.xml', 
        'views/menu_items.xml', 
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
