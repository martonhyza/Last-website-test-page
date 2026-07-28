import re

with open('App.tsx', 'r') as f:
    content = f.read()

content = content.replace('const Navbar = () => {', 'const Navbar = ({ industries, selectedIndustryId, setSelectedIndustryId }: any) => {')
content = content.replace('<Navbar />', '<Navbar industries={industries} selectedIndustryId={selectedIndustryId} setSelectedIndustryId={setSelectedIndustryId} />')

# Let's insert a select dropdown in Navbar right next to the links
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

# And also add it in the mobile menu
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

with open('App.tsx', 'w') as f:
    f.write(content)

