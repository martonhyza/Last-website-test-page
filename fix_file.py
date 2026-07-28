with open('App.tsx', 'r') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if line.strip() == "," and lines[i+1].strip() == "{":
        lines[i] = "  },\n"
        print(f"Fixed at line {i+1}")

with open('App.tsx', 'w') as f:
    f.writelines(lines)
