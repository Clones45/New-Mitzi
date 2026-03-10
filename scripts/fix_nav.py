import os

base = "d:\\Antigravity Proj\\Mitzi's Website"
pages = ['prince-georges-county.html', 'anne-arundel-county.html', 'index.html']

OLD_PG = '<a href="/prince-georges-county" class="dropdown-item">Prince George\'s County</a>\n                    </div>'
NEW_PG = '<a href="/prince-georges-county" class="dropdown-item">Prince George\'s County</a>\n                        <a href="/bowie-md-realtor" class="dropdown-item">Bowie, MD</a>\n                    </div>'

# Handles cases where the PG item is the last before </div> with different whitespace
import re

PATTERN = re.compile(
    r"(<a href=\"/prince-georges-county\" class=\"dropdown-item\">Prince George'?s County</a>)(\s*</div>)",
    re.DOTALL
)
REPLACEMENT = r'\1\n                        <a href="/bowie-md-realtor" class="dropdown-item">Bowie, MD</a>\2'

for page in pages:
    path = os.path.join(base, page)
    if not os.path.exists(path):
        print(f'SKIP: {page}')
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    if '/bowie-md-realtor' in content:
        print(f'ALREADY DONE: {page}')
        continue
    new_content, count = PATTERN.subn(REPLACEMENT, content, count=1)
    if count == 0:
        print(f'PATTERN NOT FOUND: {page}')
    else:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'UPDATED ({count} replacement): {page}')
