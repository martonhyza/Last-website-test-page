import re

with open('App.tsx', 'r') as f:
    content = f.read()

# I need to add `}` before `, { id: 'landscaping'`
content = content.replace('    },\n  {\n    id: \'landscaping\',', '    }\n  },\n  {\n    id: \'landscaping\',')

with open('App.tsx', 'w') as f:
    f.write(content)
