import re

with open('App.tsx', 'r') as f:
    content = f.read()

# I replaced `"Bronco Roofing", "Highbridge Restoration", ...` with `{industry.companies.join(", ")}`
# which resulted in:
# {[
#   {industry.companies.join(", ")}
# ].map((logo, i) => ( ...

# So let's replace `[\n                  {industry.companies.join(", ")}\n                ]` with `industry.companies`
# Wait, it might be in two places.

content = re.sub(r'\[\s*\{industry\.companies\.join\(\", \"\)\}\s*\]', 'industry.companies', content)

with open('App.tsx', 'w') as f:
    f.write(content)

