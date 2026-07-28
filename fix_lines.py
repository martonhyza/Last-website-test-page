with open('App.tsx', 'r') as f:
    lines = f.readlines()

# line 430 is `    },`
# line 431 is `  {`
# Let's fix this area.

for i in range(428, 435):
    if "}," in lines[i] and lines[i+1].startswith("  {"):
        lines[i] = "    }\n  },\n"

with open('App.tsx', 'w') as f:
    f.writelines(lines)

