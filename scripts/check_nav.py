import os

base = "d:\\Antigravity Proj\\Mitzi's Website"
pages = ['prince-georges-county.html', 'anne-arundel-county.html', 'index.html']

for page in pages:
    path = os.path.join(base, page)
    if not os.path.exists(path):
        print(f'SKIP (not found): {page}')
        continue
    with open(path, encoding='utf-8') as f:
        content = f.read()
    if '/bowie-md-realtor' in content:
        print(f'ALREADY UPDATED: {page}')
    else:
        print(f'NEEDS UPDATE: {page}')
