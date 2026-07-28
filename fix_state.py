with open('App.tsx', 'r') as f:
    content = f.read()

# Extract from App to Home
start_marker = "export default function App() {\n"
end_marker = "  return (\n    <Router>"

import re
app_match = re.search(r'export default function App\(\) \{(.*?)\s*return \(\s*<Router>', content, flags=re.DOTALL)
if app_match:
    state_code = app_match.group(1)
    
    # Remove it from App
    content = content.replace(state_code, "\n")
    
    # Add activeScenario definition to state_code
    state_code += "\n  const [activeScenario, setActiveScenario] = useState('emergency');\n"

    # Insert into Home
    home_match = re.search(r'function Home\(\) \{', content)
    if home_match:
        home_start = home_match.end()
        content = content[:home_start] + "\n" + state_code + content[home_start:]
    
with open('App.tsx', 'w') as f:
    f.write(content)
