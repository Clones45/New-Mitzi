const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '..');
const lightboxHtml = `
    <!-- PHOTO LIGHTBOX MODAL -->
    <div id="photoLightbox" class="photo-lightbox">
        <button class="lightbox-close" onclick="closeLightbox()">&times;</button>
        <button class="lightbox-prev" onclick="changePhoto(-1)">
            <i class="fas fa-chevron-left"></i>
        </button>
        <button class="lightbox-next" onclick="changePhoto(1)">
            <i class="fas fa-chevron-right"></i>
        </button>

        <div class="lightbox-content">
            <img id="lightboxImage" src="" alt="Property Photo">
            <div class="lightbox-counter">
                <span id="currentPhoto">1</span> / <span id="totalPhotos">1</span>
            </div>
        </div>
    </div>
`;

fs.readdirSync(directoryPath).forEach(file => {
    if (file.startsWith('listing-') && file.endsWith('.html')) {
        let content = fs.readFileSync(path.join(directoryPath, file), 'utf8');
        if (!content.includes('id="photoLightbox"')) {
            // Find a good insertion point: just before "<!-- FLOATING CALL WIDGET -->" or "<!-- FOOTER"
            if (content.includes('<!-- FLOATING CALL WIDGET -->')) {
                content = content.replace('<!-- FLOATING CALL WIDGET -->', lightboxHtml + '\n    <!-- FLOATING CALL WIDGET -->');
            } else if (content.includes('<!-- FOOTER')) {
                content = content.replace('<!-- FOOTER', lightboxHtml + '\n    <!-- FOOTER');
            } else if (content.includes('<!-- ✅ FOOTER -->')) {
                content = content.replace('<!-- ✅ FOOTER -->', lightboxHtml + '\n    <!-- ✅ FOOTER -->');
            }
            
            // Also need to fix the case where the keydown listener doesn't check if lightbox exists in some files 
            // The previous error was that addEventListener was being called on null inside listing files.
            // Oh wait, listing-waldorf.html has document.getElementById('photoLightbox').addEventListener('click', ...);
            
            fs.writeFileSync(path.join(directoryPath, file), content);
            console.log('Added lightbox HTML to ' + file);
        }
    }
});
