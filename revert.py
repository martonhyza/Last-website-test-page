import sys

with open('App.tsx', 'r') as f:
    content = f.read()

replacements = {
    'activeScenario, setActiveScenario] = useState(\'emergency\')': 'activeScenario, setActiveScenario] = useState(\'storm\')',
    
    '  emergency: [': '  storm: [',
    '{ type: \'user\', content: "Our master panel is buzzing and half our outlets just stopped working!" }': '{ type: \'user\', content: "My roof was hit by hail last night, it\'s leaking bad!" }',
    '{ type: \'ai\', content: "Hi! I\'m your AI assistant. That sounds like a potential electrical emergency. We can have an emergency technician out to your property within the hour. Can I get your address?" }': '{ type: \'ai\', content: "Hi! I\'m your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?" }',
    '{ type: \'ai\', content: "Perfect. I\'ve dispatched an emergency technician to 4521 Elm St. They should arrive shortly. For your safety, please avoid touching the panel. Texting you live dispatch tracking now." }': '{ type: \'ai\', content: "Perfect. I\'ve scheduled you for an emergency inspection tomorrow at 8am. We handle the entire insurance claim for you. texting you our storm guide now." }',

    '  charger: [': '  insurance: [',
    '{ type: \'user\', content: "Do you guys install EV wall connectors?" }': '{ type: \'user\', content: "Does my insurance cover this?" }',
    '{ type: \'ai\', content: "Absolutely. We install Level 2 EV chargers, including Tesla wall connectors, ChargePoint, and generic home chargers. We handle the permit, load calculations, and install. Want to get a quick estimate?" }': '{ type: \'ai\', content: "If damage was caused by a storm, hail, or wind, your insurance typically covers roof replacement with only your deductible out of pocket. Want to schedule a free inspection to document the damage?" }',
    
    '{ type: \'user\', content: "How much does a panel upgrade cost?" }': '{ type: \'user\', content: "How much does a new roof cost?" }',
    '{ type: \'ai\', content: "A typical 200-amp panel upgrade runs between $2,500 and $4,500 depending on your home\'s setup and local utility requirements. Would you like us to schedule a free on-site consultation to give you an exact quote?" }': '{ type: \'ai\', content: "Roof costs vary based on size and materials — typically $8k–$18k for a standard home in Central Ohio. If damage is storm-related, insurance often covers most of it. Would you like a free inspection and estimate?" }',

    'Our house main panel is smoking and the power is half-out!': 'My roof was hit by hail last night, it\'s leaking bad!',
    'Hi! I\'m your AI assistant. That sounds like a major emergency. We can have an emergency technician out in under 45 minutes. Can I get your address?': 'Hi! I\'m your AI assistant. We can have an emergency team out first thing tomorrow. Can I get your address?',
    'Confirmed. We\'ve dispatched an emergency technician to your address. Please keep away from the panel until they arrive!': 'Confirmed. You\'re scheduled for 8am. I\'m texting you our storm guide now!',

    '"Apex Electrical Co.", "Volt Restoration", "Sparky Brothers", \n                "Summit Power Partners", "Live-Wire Contractors", "Franklin County Electricians",\n                "Dustin Halsey Electrical", "Peak Electric", "The Panel Guys"': '"Bronco Roofing", "Highbridge Restoration", "All Weather R&R", \n                "Summit Roofing Co.", "Storm Shield Contractors", "Franklin County Roofing",\n                "Dustin Halsey R&R", "Peak Performers", "The Roof Guys"',
    
    'THE $4,500 PROBLEM HAPPENING EVERY NIGHT': 'THE $12,000 PROBLEM HAPPENING EVERY NIGHT',
    
    '11:47 PM — Panel Buzzer': '11:47 PM — Hail hits',
    'A power surge hits Franklin County. A homeowner hears their breaker panel buzzing, and half their lights go dead. They grab their phone and Google \'emergency electrician Columbus.\'': 'A hailstorm hits Franklin County. A homeowner walks outside, sees their roof is damaged. They grab their phone and Google \'emergency roofer Columbus.\'',
    
    'Two have contact forms or voicemail: \'We\'ll call you back on Monday.\' The third has a chat widget that responds instantly and initiates active dispatch coordinates. They choose the third one.': 'Two have contact forms: \'We\'ll respond in 1-2 business days.\' The third has a chat widget that responds instantly. They call the third one.',
    
    'Service call worth $4,500+': 'Job worth $14,500',
    'The electrician who won it was asleep. Their AI wasn\'t. How many times did this happen last month while you were sleeping?': 'The roofer who won it was asleep. Their AI wasn\'t. How many times did this happen last month while you were sleeping?',
    
    'Revenue generated for Bronco Electric in first 90 days': 'Revenue generated for Bronco Roofing in first 90 days',
    
    'Your Complete AI <br className="hidden md:block" /> System for Electricians': 'Your Complete AI <br className="hidden md:block" /> System for Roofing',
    'Never miss a lead again. Your AI responds to every website visitor in under 2 minutes — day or night. Captures name, phone, address, and electrical issue details automatically while you sleep.': 'Never miss a lead again. Your AI responds to every website visitor in under 2 minutes — day or night, storm or sunshine. Captures name, phone, address, and service needed before you wake up.',
    
    'EMERGENCY DISPATCH TRIGGER': 'STORM ALERT ENGINE',
    'When storm blackouts or localized breaker emergencies strike, your AI automatically registers priority dispatches, updating your availability, notifying stand-by technicians, and routing urgent calls.': 'When hail hits your county, your AI automatically activates — sending messages to your lead list, updating your Google Business Profile, and routing emergency calls to the front of the queue.',
    
    'ESTIMATE & PERMIT WORKFLOW': 'INSURANCE AUTOMATION',
    'Follow up on electrical estimates automatically. Our AI answers questions on panel clearances, Tesla home wall chargers, or county code permits so clients book without delay.': 'Follow up with every insurance lead automatically. Our AI knows what adjusters need, when to follow up, and how to keep the homeowner engaged through the entire 6-8 week claims process.',
    
    'We map every place you\'re losing leads: after-hours, emergencies, slow follow-up, low reviews.': 'We map every place you\'re losing leads: after-hours, storms, slow follow-up, low reviews.',
    'Our team builds and connects everything: AI chatbot, emergency dispatch triggers, review system, and lead capture.': 'Our team builds and connects everything: AI chatbot, storm alert triggers, review system, and lead capture.',
    'Leads Come In. You Focus on Electrical Work.': 'Leads Come In. You Focus on Roofing.',
    
    'REAL RESULTS. REAL ELECTRICIANS.': 'REAL RESULTS. REAL ROOFERS.',
    'What Happens When <br className="hidden md:block" /> Electrical Contractors Go AI-First': 'What Happens When <br className="hidden md:block" /> Roofing Contractors Go AI-First',
    
    'VOLT ELECTRICAL': 'BRONCO ROOFING',
    '23 Google reviews. No after-hours capture. Losing 3–5 emergency calls per week to competitors after 6pm.': '23 Google reviews. No after-hours capture. Losing 3–5 leads per week to competitors after 6pm.',
    'HyzaLabs AI chatbot + emergency dispatch automation + review automation': 'HyzaLabs AI chatbot + storm alert system + review automation',
    'The AI responded to a residential power outage at 2am and dispatched the technician before I even had my morning coffee.': 'The AI responded to a storm damage inquiry at 2am and booked the inspection before I had my morning coffee.',
    
    'SUMMIT ELECTRIC': 'HIGHBRIDGE RESTORATION',
    'Michael Fondas, Owner · Master Electrician': 'Michael Fondas, Owner · GAF + CertainTeed',
    'Legacy template website. Single page despite offering 50+ commercial or residential electrical services. Zero digital lead capture.': 'Hibu template website. Positioned as just a roofer despite 50+ services. Zero digital lead capture.',
    'Full HyzaLabs AI system + EV charger follow-up automation + web overhaul': 'Full HyzaLabs AI system + insurance claim automation + website overhaul',
    'EV charger installations': 'kitchen remodel leads',
    'Client follow-ups automated': 'Insurance follow-up automated',
    'The AI easily answers customer technical questions about electrical panels, level-2 chargers, and code clearances instantly.': 'I didn\'t realize how much revenue I was leaving on the table until HyzaLabs showed me the math.',
    
    '{ icon: "⚡", label: "Emergency Outage Inquiry", key: "emergency" }': '{ icon: "🌩️", label: "Storm Damage Inquiry", key: "storm" }',
    '{ icon: "🔌", label: "EV Charger Installation", key: "charger" }': '{ icon: "💰", label: "Insurance Question", key: "insurance" }',
    '{ icon: "❓", label: "How Much Is a Panel Upgrade?", key: "cost" }': '{ icon: "❓", label: "How Much Does a Roof Cost?", key: "cost" }',
    
    'Electrical Expert AI': 'Roofing Expert AI',
    
    'We Don\'t Do Everything. <br /> We Do Electrical.': 'We Don\'t Do Everything. <br /> We Do Roofing.',
    'Most AI agencies sell generic chatbots to anyone who will pay. We made a different choice. We went deep on one industry — electrical contracting — and learned everything: emergency outage dynamics, panel load calculations, EV charger installation permits, standby generator wiring, and how homeowners choose an electrician at midnight when half their house loses power.': 'Most AI agencies sell generic chatbots to anyone who will pay. We made a different choice. We went deep on one industry — roofing — and learned everything: storm seasons, hail maps, insurance claim timelines, GAF certifications, and how homeowners choose a roofer at 11pm.',
    'We know the difference between a double-pole breaker and a GFCI outlet. We know what \'load-balancing\' means to a busy electrical contractor. And we\'ve built our AI systems around all of it.': 'We know the difference between a Timberline HDZ and an Owens Corning Duration. We know what \'storm chaser\' means to a reputable contractor. And we\'ve built our AI systems around all of it.',
    
    'Peak Seasonal Load & Outage Volume — Central Ohio': 'Storm Season Lead Volume — Central Ohio',
    '{ month: "M-J", h: "100%", label: "Grid Overloads", glow: true }': '{ month: "M-J", h: "100%", label: "Hail Season", glow: true }',
    '{ month: "S-O", h: "90%", label: "Storm Outages", glow: true }': '{ month: "S-O", h: "90%", label: "Wind Season", glow: true }',
    'Our outage detection system is calibrated to Central Ohio grid demands and local weather patterns — automatically.': 'Our storm alert system is calibrated to Central Ohio and NE Ohio weather patterns — automatically.',
    
    'placeholder="Volt Electrical"': 'placeholder="Summit Roofing"',
    'placeholder="123 Sparky Lane, Dallas, TX"': 'placeholder="123 Roofing Ave, Dallas, TX"',
    
    'Strategic AI for Electrical Contractors': 'Strategic AI for Roofing Contractors',
    
    '{ name: "Emergency Dispatch", id: "services" }': '{ name: "Storm Alert", id: "services" }',
    '{ name: "Estimate Workflow", id: "services" }': '{ name: "Insurance Automation", id: "services" }',
    '{ name: "Outage Demand Guide", id: "how-it-works" }': '{ name: "Storm Season Guide", id: "how-it-works" }',
    
    'const [jobValue, setJobValue] = useState(4500)': 'const [jobValue, setJobValue] = useState(10000)',
    'type="range" min="1000" max="15000" step="250"': 'type="range" min="3000" max="30000" step="500"'
}

for old, new in replacements.items():
    if old not in content:
        print(f"NOT FOUND: {old}")
    content = content.replace(old, new)

with open('App.tsx', 'w') as f:
    f.write(content)
