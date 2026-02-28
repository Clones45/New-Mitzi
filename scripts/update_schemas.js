const fs = require('fs');
const files = [
    {
        file: 'listing-waldorf.html',
        title: '2978 Mourning Dove Pl UNIT D | For Rent | Mitzi Santayana REALTOR®',
        desc: 'For Rent: $2,750 / mo - 4 Bed, 2.5 Bath Townhome in Waldorf, MD.',
        img: 'https://mitzisantayana.com/MWF/MWF1.jpeg',
        url: 'https://mitzisantayana.com/listing-waldorf',
        address: '2978 Mourning Dove Pl UNIT D, Waldorf, MD 20601',
        street: '2978 Mourning Dove Pl UNIT D',
        city: 'Waldorf',
        zip: '20601',
        beds: 4,
        baths: 2.5
    },
    {
        file: 'listing-longford.html',
        title: '8269 Longford Rd | For Rent | Mitzi Santayana REALTOR®',
        desc: 'For Rent: $3,300/mo - 3 Bed, 2.5 Bath Luxury Home in Millersville, MD.',
        img: 'https://mitzisantayana.com/P_Listings/L1.jpeg',
        url: 'https://mitzisantayana.com/listing-longford',
        address: '8269 Longford Rd, Millersville, MD 21108',
        street: '8269 Longford Rd',
        city: 'Millersville',
        zip: '21108',
        beds: 3,
        baths: 2.5
    },
    {
        file: 'listing-sequoia.html',
        title: '2632 Sequoia Ln | Under Contract | Mitzi Santayana REALTOR®',
        desc: 'Under Contract: $650,000 - 4 Bed, 3.5 Bath Luxury Townhome in Gambrills, MD.',
        img: 'https://mitzisantayana.com/Sequoia/S1.jpeg',
        url: 'https://mitzisantayana.com/listing-sequoia',
        address: '2632 Sequoia Ln, Gambrills, MD 21054',
        street: '2632 Sequoia Ln',
        city: 'Gambrills',
        zip: '21054',
        beds: 4,
        baths: 3.5
    },
    {
        file: 'listing-summersunrise.html',
        title: '6409 Summer Sunrise Dr | Mitzi Santayana REALTOR®',
        desc: 'Coming Soon: $1,223,600 - 5 Bed, 3.5 Bath Single Family Residence in Columbia, MD.',
        img: 'https://mitzisantayana.com/Upcoming/U5.jpeg',
        url: 'https://mitzisantayana.com/listing-summersunrise',
        address: '6409 Summer Sunrise Dr, Columbia, MD 21044',
        street: '6409 Summer Sunrise Dr',
        city: 'Columbia',
        zip: '21044',
        beds: 5,
        baths: 3.5
    },
    {
        file: 'listing-sunrise.html',
        title: '6409 Summer Sunrise Dr | Sold | Mitzi Santayana REALTOR®',
        desc: 'Sold for $1,175,000 - 5 Bed, 4 Bath Single Family Residence in Columbia, MD.',
        img: 'https://mitzisantayana.com/sunrise/SS1.jfif',
        url: 'https://mitzisantayana.com/listing-sunrise',
        address: '6409 Summer Sunrise Dr, Columbia, MD 21044',
        street: '6409 Summer Sunrise Dr',
        city: 'Columbia',
        zip: '21044',
        beds: 5,
        baths: 4
    },
    {
        file: 'listing-sunset.html',
        title: '108 Sunset Dr | For Sale | Mitzi Santayana REALTOR®',
        desc: 'For Sale: $359,000 - 3 Bed, 1.5 Bath Ranch Home in Glen Burnie, MD.',
        img: 'https://mitzisantayana.com/gb/5.jfif',
        url: 'https://mitzisantayana.com/listing-sunset',
        address: '108 Sunset Dr, Glen Burnie, MD 21060',
        street: '108 Sunset Dr',
        city: 'Glen Burnie',
        zip: '21060',
        beds: 3,
        baths: 1.5
    },
    {
        file: 'listing-suslin.html',
        title: '8719 Susini Dr | Sold | Mitzi Santayana REALTOR®',
        desc: 'Sold for $575,000 - 3 Bed, 3 Bath Single Family Residence in Laurel, MD.',
        img: 'https://mitzisantayana.com/susini/SD1.jfif',
        url: 'https://mitzisantayana.com/listing-suslin',
        address: '8719 Susini Dr, Laurel, MD 20723',
        street: '8719 Susini Dr',
        city: 'Laurel',
        zip: '20723',
        beds: 3,
        baths: 3
    },
    {
        file: 'listing-trippcreek.html',
        title: '627 Tripp Creek Ct | Sold | Mitzi Santayana REALTOR®',
        desc: 'Sold for $375,000 - 4 Bed, 2.5 Bath Townhouse in Annapolis, MD.',
        img: 'https://mitzisantayana.com/Tct/T1.jpeg',
        url: 'https://mitzisantayana.com/listing-trippcreek',
        address: '627 Tripp Creek Ct, Annapolis, MD 21401',
        street: '627 Tripp Creek Ct',
        city: 'Annapolis',
        zip: '21401',
        beds: 4,
        baths: 2.5
    },
    {
        file: 'listing-heron.html',
        title: '1358 Heron Rookery Way | Sold | Mitzi Santayana REALTOR®',
        desc: 'Sold for $800,000 - 5 Bed, 3.5 Bath Single Family Residence in Odenton, MD.',
        img: 'https://mitzisantayana.com/Heron/H1.jpeg',
        url: 'https://mitzisantayana.com/listing-heron',
        address: '1358 Heron Rookery Way, Odenton, MD 21113',
        street: '1358 Heron Rookery Way',
        city: 'Odenton',
        zip: '21113',
        beds: 5,
        baths: 3.5
    },
    {
        file: 'listing-minerun.html',
        title: '7911 Mine Run Rd | For Sale | Mitzi Santayana REALTOR®',
        desc: 'For Sale: $545,000 - 3 Bed, 2 Full/2 Half Bath Townhome in Hanover, MD.',
        img: 'https://mitzisantayana.com/minerun/1.jfif',
        url: 'https://mitzisantayana.com/listing-minerun',
        address: '7911 Mine Run Rd, Hanover, MD 21076',
        street: '7911 Mine Run Rd',
        city: 'Hanover',
        zip: '21076',
        beds: 3,
        baths: 4
    },
    {
        file: 'listing-pasadena.html',
        title: '802 203rd St | Under Contract | Mitzi Santayana REALTOR®',
        desc: 'Under Contract: $400,000 - 3 Bed, 2 Bath Split-Foyer in Pasadena, MD.',
        img: 'https://mitzisantayana.com/Ps/P1.jpeg',
        url: 'https://mitzisantayana.com/listing-pasadena',
        address: '802 203rd St, Pasadena, MD 21122',
        street: '802 203rd St',
        city: 'Pasadena',
        zip: '21122',
        beds: 3,
        baths: 2
    }
];

files.forEach(item => {
    try {
        let content = fs.readFileSync(item.file, 'utf8');

        // Cleanup any old incomplete meta blocks to avoid doubling up
        content = content.replace(/<!-- Open Graph & Twitter Cards -->[\s\S]*?<!-- Schema Markup -->[\s\S]*?<\/script>/gi, '');
        content = content.replace(/<!-- Schema Markup -->[\s\S]*?<\/script>/gi, '');

        // Remove individual og/twitter tags just in case
        content = content.replace(/<meta property="og:[^>]*>/g, '');
        content = content.replace(/<meta name="twitter:[^>]*>/g, '');

        // Remove any old SingleFamilyResidence LD+JSON script block
        // Assuming we removed it with above cleanups.

        const schemaOg = `
    <!-- Open Graph & Twitter Cards -->
    <meta property="og:title" content="${item.title}">
    <meta property="og:description" content="${item.desc}">
    <meta property="og:image" content="${item.img}">
    <meta property="og:url" content="${item.url}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${item.img}">

    <!-- Schema Markup -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "SingleFamilyResidence",
      "name": "${item.address}",
      "description": "${item.desc}",
      "url": "${item.url}",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "${item.street}",
        "addressLocality": "${item.city}",
        "addressRegion": "MD",
        "postalCode": "${item.zip}",
        "addressCountry": "US"
      },
      "numberOfBathroomsTotal": ${item.baths},
      "numberOfBedrooms": ${item.beds}
    }
    </script>
`;

        // Update Title & Description specifically
        content = content.replace(/<title>.*?<\/title>/s, `<title>${item.title}</title>`);
        content = content.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/s, `<meta name="description" content="${item.desc}" />`);

        // Insert OG and Schema right before Google Fonts link
        content = content.replace(/<!-- Google Fonts -->/, schemaOg + '    <!-- Google Fonts -->');

        fs.writeFileSync(item.file, content, 'utf8');
        console.log(`Successfully updated ${item.file}`);
    } catch (err) {
        console.error(`Error processing ${item.file}: ${err.message}`);
    }
});
