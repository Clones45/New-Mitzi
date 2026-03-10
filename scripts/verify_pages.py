import os

base = "d:\\Antigravity Proj\\Mitzi's Website"

pages_to_check = [
    'bowie-md-realtor.html',
    'howard-county.html',
    'relocate-with-mitzi.html',
    'sold/6409-summer-sunrise-columbia-md.html',
    'sold/627-tripp-creek-annapolis-md.html',
    'index.html',
    'prince-georges-county.html',
    'anne-arundel-county.html',
]

for page in pages_to_check:
    path = os.path.join(base, page)
    if not os.path.exists(path):
        print(f'MISSING: {page}')
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    has_bowie_nav = '/bowie-md-realtor' in content
    has_schema = 'application/ld+json' in content
    has_canonical = 'canonical' in content
    file_size = os.path.getsize(path)
    status = 'OK' if (has_bowie_nav and has_schema) else 'WARN'
    print(f'{status} [{file_size:>6}b] nav:{has_bowie_nav} schema:{has_schema} canonical:{has_canonical}  {page}')

# Also verify sitemap has new pages
sm_path = os.path.join(base, 'sitemap.xml')
sm = open(sm_path, encoding='utf-8').read()
print('\n--- SITEMAP CHECK ---')
checks = [
    'bowie-md-realtor',
    '6409-summer-sunrise-columbia-md',
    '627-tripp-creek-annapolis-md',
]
for c in checks:
    print(f'  {c}: {"FOUND" if c in sm else "MISSING"}')
