const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const targetMenuStr = '<a href="/contact" class="nav-link">Contact</a>';
const newMenuStr = `<div class="nav-dropdown">
                    <a href="#" class="nav-link" style="display: flex; align-items: center; gap: 5px;">Guides <i class="fas fa-chevron-down" style="font-size: 0.7em;"></i></a>
                    <div class="dropdown-menu">
                        <a href="/howard-county" class="dropdown-item">Howard County</a>
                        <a href="/anne-arundel-county" class="dropdown-item">Anne Arundel County</a>
                        <a href="/prince-georges-county" class="dropdown-item">Prince George's County</a>
                    </div>
                </div>
                <!-- MARKET UPDATES LINK -->
                <a href="/market-updates" class="nav-link">Market Updates</a>
                <a href="/contact" class="nav-link">Contact</a>`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace Contact link area with new dropdown and Market Updates BEFORE Contact
    let updated = content.replace(targetMenuStr, newMenuStr);

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Added dropdown and Market Updates to ${file}`);
    } else {
        console.log(`Could not find the target menu string in ${file} or already updated`);
    }
});
