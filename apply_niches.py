import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Make sure we don't duplicate the imports if we already added it
if 'export const industries' not in content:
    with open('industries.ts', 'r') as f:
        industries_ts = f.read()
    
    # We will insert the industries array and types right after imports in App.tsx
    import_match = re.search(r'(import .*?;?\n)+', content)
    if import_match:
        end_imports = import_match.end()
        content = content[:end_imports] + '\n' + industries_ts + '\n' + content[end_imports:]

# Now we need to modify the default export App
# Find `export default function App() {`
app_match = re.search(r'export default function App\(\) {', content)
if app_match:
    # insert state
    app_start = app_match.end()
    state_code = "\n  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('roofing');\n  const industry = industries.find(i => i.id === selectedIndustryId) || industries[0];\n"
    content = content[:app_start] + state_code + content[app_start:]

    # Add selector to Navbar
    # We need to pass industry and setSelectedIndustryId to Navbar? Or since it's inside App, we can just render the selector in the Hero or Navbar.
    # Actually, Navbar is declared OUTSIDE App.
    # Let's move the state to a Context or just put the selector in the Hero.
    # The Hero is in App().

    # We can replace text in the App component with {industry.xxx}
    # For example:
    replacements = {
        '"making you the first roofer they call"': 'industry.leadPlaceholder',
        'Built for Roofing Contractors': '{industry.heroTitle}',
        'Stop Losing Roofing Jobs': '{industry.heroSub}',
        'Every night, homeowners with storm-damaged roofs search for a roofer. They call the first one who responds. HyzaLabs builds the AI system that makes sure that\'s always you — even at 2am, even during a hailstorm.': '{industry.heroParagraph}',
        
        # Scenarios
        'My roof was hit by hail last night, it\'s leaking bad!': '{industry.scenarios.emergency.user}',
        'Hi! I\'m your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?': '{industry.scenarios.emergency.ai1}',
        'Perfect. I\'ve scheduled you for an emergency inspection tomorrow at 8am. We handle the entire insurance claim for you. texting you our storm guide now.': '{industry.scenarios.emergency.ai2}',
        
        'Does my insurance cover this?': '{industry.scenarios.estimate.user}',
        'If damage was caused by a storm, hail, or wind, your insurance typically covers roof replacement with only your deductible out of pocket. Want to schedule a free inspection to document the damage?': '{industry.scenarios.estimate.ai}',
        
        'How much does a new roof cost?': '{industry.scenarios.cost.user}',
        'Roof costs vary based on size and materials — typically $8k–$18k for a standard home in Central Ohio. If damage is storm-related, insurance often covers most of it. Would you like a free inspection and estimate?': '{industry.scenarios.cost.ai}',
        
        '"Bronco Roofing", "Highbridge Restoration", "All Weather R&R", \n                "Summit Roofing Co.", "Storm Shield Contractors", "Franklin County Roofing",\n                "Dustin Halsey R&R", "Peak Performers", "The Roof Guys"': '{industry.companies.join(", ")}',
        
        'THE $12,000 PROBLEM HAPPENING EVERY NIGHT': '{industry.problemTitle}',
        'A hailstorm hits Franklin County. A homeowner walks outside, sees their roof is damaged. They grab their phone and Google \'emergency roofer Columbus.\'': '{industry.problemDesc}',
        'Two have contact forms: \'We\'ll respond in 1-2 business days.\' The third has a chat widget that responds instantly. They call the third one.': '{industry.problemScenario}',
        'Job worth $14,500': '{industry.problemValue}',
        'Revenue generated for Bronco Roofing in first 90 days': '{industry.roiValue}',
        'The roofer who won it was asleep. Their AI wasn\'t. How many times did this happen last month while you were sleeping?': '{industry.roiDesc}',
        'Roofing Expert AI': '{industry.expertRole}',
        
        'We Don\'t Do Everything. <br /> We Do Roofing.': '{industry.deepDiveTitle}',
        'Most AI agencies sell generic chatbots to anyone who will pay. We made a different choice. We went deep on one industry — roofing — and learned everything: storm seasons, hail maps, insurance claim timelines, GAF certifications, and how homeowners choose a roofer at 11pm.': '{industry.deepDiveDesc}',
        'We know the difference between a Timberline HDZ and an Owens Corning Duration. We know what \'storm chaser\' means to a reputable contractor. And we\'ve built our AI systems around all of it.': '{industry.deepDiveDetail}',
        
        'Storm Season Lead Volume — Central Ohio': '{industry.chartLabel}',
        'Our storm alert system is calibrated to Central Ohio and NE Ohio weather patterns — automatically.': '{industry.chartSub}',
        
        'placeholder="Summit Roofing"': 'placeholder={industry.placeholderCompany}',
        'placeholder="123 Roofing Ave, Dallas, TX"': 'placeholder={industry.placeholderAddress}',
        
        'Strategic AI for Roofing Contractors': '{industry.footerNiche}',
        
        'REAL RESULTS. REAL ROOFERS.': 'REAL RESULTS. REAL CONTRACTORS.',
        'What Happens When <br className="hidden md:block" /> Roofing Contractors Go AI-First': 'What Happens When <br className="hidden md:block" /> {industry.contractorTerm} Go AI-First',
        
        'BRONCO ROOFING': '{industry.caseStudy1.client}',
        '23 Google reviews. No after-hours capture. Losing 3–5 leads per week to competitors after 6pm.': '{industry.caseStudy1.challenge}',
        'HyzaLabs AI chatbot + storm alert system + review automation': '{industry.caseStudy1.solution}',
        'The AI responded to a storm damage inquiry at 2am and booked the inspection before I had my morning coffee.': '{industry.caseStudy1.quote}',
        
        'HIGHBRIDGE RESTORATION': '{industry.caseStudy2.client}',
        'Michael Fondas, Owner · GAF + CertainTeed': '{industry.caseStudy2.owner}',
        'Hibu template website. Positioned as just a roofer despite 50+ services. Zero digital lead capture.': '{industry.caseStudy2.challenge}',
        'Full HyzaLabs AI system + insurance claim automation + website overhaul': '{industry.caseStudy2.solution}',
        'I didn\'t realize how much revenue I was leaving on the table until HyzaLabs showed me the math.': '{industry.caseStudy2.quote}',
        
        'const [jobValue, setJobValue] = useState(10000)': 'const [jobValue, setJobValue] = useState(industry.jobValue)',
        
        '{ name: "Storm Alert", id: "services" }': '{ name: industry.service1, id: "services" }',
        '{ name: "Insurance Automation", id: "services" }': '{ name: industry.service2, id: "services" }',
        '{ name: "Storm Season Guide", id: "how-it-works" }': '{ name: industry.resource1, id: "how-it-works" }',
        
        '{ icon: "🌩️", label: "Storm Damage Inquiry", key: "storm" }': '{ icon: industry.scenarios.emergency.icon, label: industry.scenarios.emergency.label, key: "emergency" }',
        '{ icon: "💰", label: "Insurance Question", key: "insurance" }': '{ icon: industry.scenarios.estimate.icon, label: industry.scenarios.estimate.label, key: "estimate" }',
        '{ icon: "❓", label: "How Much Does a Roof Cost?", key: "cost" }': '{ icon: industry.scenarios.cost.icon, label: industry.scenarios.cost.label, key: "cost" }',
        
        'Your Complete AI <br className="hidden md:block" /> System for Roofing': 'Your Complete AI <br className="hidden md:block" /> System for {industry.name}',
        'Leads Come In. You Focus on Roofing.': 'Leads Come In. You Focus on {industry.name}.',
    }

    # Custom handling for some components to inject industry prop if they are outside App
    # Actually wait! The `PHRASES` array is outside `App`.
    # Let's move `PHRASES` inside `App`.
    content = content.replace('const PHRASES = [\n  "capturing leads while you sleep",\n  "responding to emergencies in 2 minutes",\n  "turning missed calls into booked service jobs",\n  "automating your follow-ups",\n  "making you the first roofer they call"\n];\n', '')
    
    # We will add PHRASES inside App.
    phrases_code = """
  const PHRASES = [
    "capturing leads while you sleep",
    "responding to emergencies in 2 minutes",
    "turning missed calls into booked service jobs",
    "automating your follow-ups",
    industry.leadPlaceholder
  ];
"""
    app_match = re.search(r'export default function App\(\) {', content)
    if app_match:
        app_start = app_match.end()
        content = content[:app_start] + phrases_code + content[app_start:]

    for old, new in replacements.items():
        if old in content:
            content = content.replace(old, new)
        else:
            print(f"Failed to find: {old}")

with open('App.tsx', 'w') as f:
    f.write(content)

