import os
import wget

# download blacklist
if os.path.exists('hosts'): os.remove('hosts')
wget.download('https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts')
print()

# get just the domains
whitelist = []

def clean(line):
    offset = len('0.0.0.0 ')
    rule = line[offset:].strip()
    domain = rule
    if ' ' in rule:
        domain = domain[:domain.find(' ')].strip()
    if '/' in rule:
        domain = domain[:domain.find('/')].strip()
    return domain

with open('hosts') as f:
    offset = len('0.0.0.0 ')
    domains = [clean(line) for line in f.readlines() if line.startswith("0.0.0.0")]
    # exclude first entry it's always going to be 0.0.0.0
    # remove dups as well
    # and convert to a regex format
    whitelist = [f'"{_}"' for _ in set(domains[1:])]

# make the js file
with open('whitelist.js', 'w') as f:
    f.write('const whitelist = [\n\t' + ',\n\t'.join(whitelist) + '\n]')

print("Finished making whitelist.")