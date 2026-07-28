import re

with open('App.tsx', 'r') as f:
    content = f.read()

with open('industries.ts', 'r') as f:
    industries_ts = f.read()

# Insert after the last import statement safely.
# Look for the last `import ` statement.
imports = list(re.finditer(r'^import .*?;\n', content, flags=re.MULTILINE | re.DOTALL))
if imports:
    last_import = imports[-1]
    # actually wait, the lucide-react import spans multiple lines:
    # import {
    #   Hexagon,
    #   ...
    # } from 'lucide-react';
    lucide_match = re.search(r"\} from 'lucide-react';", content)
    insert_pos = lucide_match.end() if lucide_match else last_import.end()
    content = content[:insert_pos] + "\n\n" + industries_ts + "\n\n" + content[insert_pos:]

# Replace Navbar definition and props
content = content.replace('const Navbar = () => {', 'const Navbar = ({ industries, selectedIndustryId, setSelectedIndustryId }: any) => {')

nav_links_match = re.search(r'(<a href="#strategy".*?>\s*Book a Call\s*</a>)', content)
if nav_links_match:
    selector_code = """
          <select 
            value={selectedIndustryId} 
            onChange={(e) => setSelectedIndustryId(e.target.value)}
            className="bg-bg-deep border border-white/10 rounded-md px-3 py-1.5 text-sm text-text-muted focus:outline-none focus:border-accent ml-4 hidden lg:block"
          >
            {industries.map((ind: any) => (
              <option key={ind.id} value={ind.id}>{ind.name}</option>
            ))}
          </select>
"""
    content = content[:nav_links_match.end()] + selector_code + content[nav_links_match.end():]

mobile_links_match = re.search(r'(<button onClick={scrollToStrategy}.*?>\s*Book a Call\s*</button>)', content)
if mobile_links_match:
    mobile_selector_code = """
            <div className="pt-4 border-t border-white/10 w-full flex flex-col gap-2">
              <span className="text-sm text-text-muted">Select Industry:</span>
              <select 
                value={selectedIndustryId} 
                onChange={(e) => {
                  setSelectedIndustryId(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="bg-bg border border-white/10 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-accent w-full"
              >
                {industries.map((ind: any) => (
                  <option key={ind.id} value={ind.id}>{ind.name}</option>
                ))}
              </select>
            </div>
"""
    content = content[:mobile_links_match.end()] + mobile_selector_code + content[mobile_links_match.end():]


# Move PHRASES into App
content = content.replace('const PHRASES = [\n  "capturing leads while you sleep",\n  "responding to emergencies in 2 minutes",\n  "turning missed calls into booked service jobs",\n  "automating your follow-ups",\n  "making you the first roofer they call"\n];\n', '')
content = content.replace('const PHRASES = [\n  "capturing leads while you sleep",\n  "responding to emergencies in 2 minutes",\n  "turning missed calls into booked service jobs",\n  "automating your follow-ups",\n  "making you the first electrician they call"\n];\n', '')

# Remove activeScenario from outside (wait, where was activeScenario? Inside App)
# Remove SCENARIOS from outside
content = re.sub(r'const SCENARIOS = \{.*?\n\};\n', '', content, flags=re.DOTALL)

app_match = re.search(r'export default function App\(\) {', content)
if app_match:
    app_start = app_match.end()
    
    app_code = """
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>('roofing');
  const industry = industries.find((i: any) => i.id === selectedIndustryId) || industries[0];

  const PHRASES = [
    "capturing leads while you sleep",
    "responding to emergencies in 2 minutes",
    "turning missed calls into booked service jobs",
    "automating your follow-ups",
    industry.leadPlaceholder
  ];

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
    content = content[:app_start] + app_code + content[app_start:]

# Fix activeScenario
content = content.replace("const [activeScenario, setActiveScenario] = useState('storm');", "const [activeScenario, setActiveScenario] = useState('emergency');")
content = content.replace("const [activeScenario, setActiveScenario] = useState('emergency');", "") # wait, if I do this I might remove the only definition!
# Let's just find and replace the definition safely
content = re.sub(r"const \[activeScenario, setActiveScenario\] = useState\('.*?'\);", "const [activeScenario, setActiveScenario] = useState('emergency');", content)

content = content.replace('setActiveScenario("storm")', 'setActiveScenario("emergency")')
content = content.replace('setActiveScenario("insurance")', 'setActiveScenario("estimate")')
content = content.replace('activeScenario === "storm"', 'activeScenario === "emergency"')
content = content.replace('activeScenario === "insurance"', 'activeScenario === "estimate"')
content = content.replace('activeScenario === "cost"', 'activeScenario === "cost"')
content = content.replace('key: "storm"', 'key: "emergency"')
content = content.replace('key: "insurance"', 'key: "estimate"')
content = content.replace('key: "cost"', 'key: "cost"')

content = content.replace('<Navbar />', '<Navbar industries={industries} selectedIndustryId={selectedIndustryId} setSelectedIndustryId={setSelectedIndustryId} />')


replacements = {
    'Built for Roofing Contractors': '{industry.heroTitle}',
    'Stop Losing Roofing Jobs': '{industry.heroSub}',
    'Every night, homeowners with storm-damaged roofs search for a roofer. They call the first one who responds. HyzaLabs builds the AI system that makes sure that\'s always you — even at 2am, even during a hailstorm.': '{industry.heroParagraph}',
    
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
    
    'STORM ALERT ENGINE': '{industry.service1.toUpperCase()}',
    'Never miss a lead again. Your AI responds to every website visitor in under 2 minutes — day or night, storm or sunshine. Captures name, phone, address, and service needed before you wake up.': '{industry.heroParagraph}',
    'We map every place you\'re losing leads: after-hours, storms, slow follow-up, low reviews. No sales pitch — just an honest gap analysis.': '{industry.roiDesc}',
    'Our team builds and connects everything: AI chatbot, storm alert triggers, review system, and lead capture. We integrate with your existing tools.': 'Our team builds and connects everything: AI chatbot, {industry.service1.toLowerCase()} triggers, review system, and lead capture. We integrate with your existing tools.',
    'INSURANCE AUTOMATION': '{industry.service2.toUpperCase()}',
    'Follow up with every insurance lead automatically. Our AI knows what adjusters need, when to follow up, and how to keep the homeowner engaged through the entire 6-8 week claims process.': 'Follow up with every lead automatically. Our AI knows what homeowners need, when to follow up, and how to keep them engaged.',
    '{/* --- SECTION 10: WHY ROOFING ONLY --- */}': '{/* --- SECTION 10: WHY CONTRACTORS ONLY --- */}',
    
    'When hail hits your county, your AI automatically activates — sending messages to your lead list, updating your Google Business Profile, and routing emergency calls to the front of the queue.': 'When emergencies hit your county, your AI automatically activates — sending messages to your lead list, updating your Google Business Profile, and routing emergency calls to the front of the queue.',
    
    # Chart handling
    '[{ month: "J-F", h: "40%", label: "Ice Dams", glow: false },\n                { month: "M-A", h: "60%", label: "Spring Wind", glow: false },\n                { month: "M-J", h: "100%", label: "Hail Season", glow: true },\n                { month: "J-A", h: "75%", label: "Summer Storms", glow: false },\n                { month: "S-O", h: "90%", label: "Wind Season", glow: true },\n                { month: "N-D", h: "35%", label: "Winter Maintenance", glow: false }\n              ].map': 'industry.chartPoints.map',
    
    '{/* Bars */}': '{/* Bars */}', # do nothing, just a placeholder to keep my mind organized
    
    # Ensure jobValue max is correctly replaced
    'type="range" min="3000" max="30000" step="500"': 'type="range" min="3000" max={industry.jobMax} step="500"',
}

for old, new in replacements.items():
    if old in content:
        content = content.replace(old, new)
    else:
        # For multiline replacements, sometimes whitespace is different
        pass


# There is a hardcoded list of chart points that we should replace with `industry.chartPoints`
chart_re = re.compile(r'\[\s*\{\s*month:\s*"J-F"[^\]]+\]\.map', re.MULTILINE | re.DOTALL)
content = chart_re.sub('industry.chartPoints.map', content)


with open('App.tsx', 'w') as f:
    f.write(content)

