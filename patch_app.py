import re

with open('industries.ts', 'r') as f:
    industries_content = f.read()

# extraIndustries is at the end of industries.ts
# let's extract the array elements.
match = re.search(r'export const extraIndustries = \[\n(.*?)\n\];\n', industries_content, flags=re.DOTALL)
if match:
    extra = match.group(1)
    
    with open('App.tsx', 'r') as f:
        app_content = f.read()
    
    # insert into the existing `industries` array definition inside `App.tsx`!
    # find the end of `export const industries: IndustryConfig[] = [` ... `];`
    
    # It's better to just search for `id: 'plumbing'` object and append after it.
    plumbing_end = app_content.find("    }\n  }\n];")
    if plumbing_end != -1:
        app_content = app_content[:plumbing_end+6] + ",\n" + extra + app_content[plumbing_end+6:]
    
    with open('App.tsx', 'w') as f:
        f.write(app_content)
else:
    print("Could not find extraIndustries in industries.ts")

