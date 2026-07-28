import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Replace activeScenario state
content = content.replace("const [activeScenario, setActiveScenario] = useState('storm');", "const [activeScenario, setActiveScenario] = useState('emergency');")

# Move SCENARIOS inside App
scenarios_code = """
  const SCENARIOS = {
    emergency: [
      { type: 'user', content: industry.scenarios.emergency.user },
      { type: 'ai', content: industry.scenarios.emergency.ai1 },
      { type: 'user', content: "4521 Elm St, Columbus OH" },
      { type: 'ai', content: industry.scenarios.emergency.ai2 }
    ],
    estimate: [
      { type: 'user', content: industry.scenarios.estimate.user },
      { type: 'ai', content: industry.scenarios.estimate.ai }
    ],
    cost: [
      { type: 'user', content: industry.scenarios.cost.user },
      { type: 'ai', content: industry.scenarios.cost.ai }
    ]
  };
"""

content = re.sub(r'const SCENARIOS = {.*?\n};\n', '', content, flags=re.DOTALL)
app_match = re.search(r'export default function App\(\) {', content)
if app_match:
    app_start = app_match.end()
    content = content[:app_start] + scenarios_code + content[app_start:]

# Fix any stray "{industry...}" quotes from earlier python script
content = content.replace('"{industry.scenarios.emergency.user}"', 'industry.scenarios.emergency.user')
content = content.replace('"{industry.scenarios.emergency.ai1}"', 'industry.scenarios.emergency.ai1')
content = content.replace('"{industry.scenarios.emergency.ai2}"', 'industry.scenarios.emergency.ai2')
content = content.replace('"{industry.scenarios.estimate.user}"', 'industry.scenarios.estimate.user')
content = content.replace('"{industry.scenarios.estimate.ai}"', 'industry.scenarios.estimate.ai')
content = content.replace('"{industry.scenarios.cost.user}"', 'industry.scenarios.cost.user')
content = content.replace('"{industry.scenarios.cost.ai}"', 'industry.scenarios.cost.ai')

# We need to change the buttons that set activeScenario
content = content.replace('setActiveScenario("storm")', 'setActiveScenario("emergency")')
content = content.replace('setActiveScenario("insurance")', 'setActiveScenario("estimate")')
content = content.replace('activeScenario === "storm"', 'activeScenario === "emergency"')
content = content.replace('activeScenario === "insurance"', 'activeScenario === "estimate"')
content = content.replace('activeScenario === "cost"', 'activeScenario === "cost"')
content = content.replace('key: "storm"', 'key: "emergency"')
content = content.replace('key: "insurance"', 'key: "estimate"')
content = content.replace('key: "cost"', 'key: "cost"')

# What about the hardcoded section 10 WHY ROOFING ONLY?
content = content.replace('{/* --- SECTION 10: WHY ROOFING ONLY --- */}', '{/* --- SECTION 10: WHY CONTRACTORS ONLY --- */}')

# Now for the specific leftover texts like STORM ALERT ENGINE
content = content.replace('STORM ALERT ENGINE', '{industry.service1.toUpperCase()}')
content = content.replace('Never miss a lead again. Your AI responds to every website visitor in under 2 minutes — day or night, storm or sunshine. Captures name, phone, address, and service needed before you wake up.', '{industry.heroParagraph}')
content = content.replace('We map every place you\'re losing leads: after-hours, storms, slow follow-up, low reviews. No sales pitch — just an honest gap analysis.', '{industry.roiDesc}')
content = content.replace('Our team builds and connects everything: AI chatbot, storm alert triggers, review system, and lead capture. We integrate with your existing tools.', 'Our team builds and connects everything: AI chatbot, {industry.service1.toLowerCase()} triggers, review system, and lead capture. We integrate with your existing tools.')

# Also "Confirmed. You're scheduled for 8am. I'm texting you our storm guide now!" might be hardcoded somewhere else, like in a chat bubble
content = content.replace("Confirmed. You're scheduled for 8am. I'm texting you our storm guide now!", "{industry.scenarios.emergency.ai2}")
content = content.replace("My roof was hit by hail last night, it's leaking bad!", "{industry.scenarios.emergency.user}")
content = content.replace("Hi! I'm your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?", "{industry.scenarios.emergency.ai1}")


with open('App.tsx', 'w') as f:
    f.write(content)

