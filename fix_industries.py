import re

with open('industries.ts', 'r') as f:
    content = f.read()

# I want to add `extraIndustries` elements to the `industries` array.
# Let's just do it directly.

with open('App.tsx', 'r') as f:
    app_content = f.read()

app_content = app_content.replace('export const industries: IndustryConfig[] = [', 'export const industries: IndustryConfig[] = [ ...extraIndustries, ')
# Actually the cleanest way to do this is to just prepend `export const extraIndustries = [...]` right before `industries: IndustryConfig[] = [` and then add `...extraIndustries, `

