import re

with open('App.tsx', 'r') as f:
    content = f.read()

content = content.replace('"Storm Alert Engine"', 'industry.service1')
content = content.replace('"Insurance claim follow-up"', 'industry.service2')

with open('App.tsx', 'w') as f:
    f.write(content)

