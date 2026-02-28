const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const newMenuStr1 = `<div class="nav-dropdown">
                    <a href="#" class="nav-link" style="display: flex; align-items: center; gap: 5px;">Guides <i class="fas fa-chevron-down" style="font-size: 0.7em;"></i></a>
                    <div class="dropdown-menu">
                        <a href="/howard-county" class="dropdown-item">Howard County</a>
                        <a href="/anne-arundel-county" class="dropdown-item">Anne Arundel County</a>
                        <a href="/prince-georges-county" class="dropdown-item">Prince George's County</a>
                    </div>
                </div>
                <!-- MARKET UPDATES LINK -->
                <a href="/market-updates" class="nav-link">Market Updates</a>
                <a href="contact.html" class="nav-link">Contact</a>`;

const newMenuStr2 = `<div class="nav-dropdown">
        <a href="#" class="nav-link" style="display: flex; align-items: center; gap: 5px;">Guides <i class="fas fa-chevron-down" style="font-size: 0.7em;"></i></a>
        <div class="dropdown-menu">
            <a href="/howard-county" class="dropdown-item">Howard County</a>
            <a href="/anne-arundel-county" class="dropdown-item">Anne Arundel County</a>
            <a href="/prince-georges-county" class="dropdown-item">Prince George's County</a>
        </div>
    </div>
    <!-- MARKET UPDATES LINK -->
    <a href="/market-updates" class="nav-link">Market Updates</a>
    <a href="/contact" class="nav-link active">Contact</a>`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if it already has Market Updates to avoid double patching
    if (content.includes('Market Updates')) return;

    let updated = content;

    if (file === 'howard-county.html' || file === 'googledd2c36501868289a.html') {
        updated = content.replace('<a href="contact.html" class="nav-link">Contact</a>', newMenuStr1);
    } else if (file === 'contact.html') {
        updated = content.replace('<a href="/contact" class="nav-link active">Contact</a>', newMenuStr2);
    }

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Patched edge cases in ${file}`);
    }
});
