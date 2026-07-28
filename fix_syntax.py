import re

with open('App.tsx', 'r') as f:
    content = f.read()

# I messed up the syntax of the array. Let's find the 'landscaping' object and make sure it has a comma before it, and a closing bracket at the end of 'pestcontrol' object.

# Right now it's:
#       quote: "..."
#     },
#   {
#     id: 'landscaping',
# ...
#   }
# ];

content = content.replace('    },\n  {\n    id: \'landscaping\',', '    }\n  },\n  {\n    id: \'landscaping\',')

with open('App.tsx', 'w') as f:
    f.write(content)

