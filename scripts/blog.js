// ===== BLOG FETCH =====
async function fetchBlog() {
    try {
        const res   = await fetch('https://www.moreware.org/wp/wp-json/wp/v2/posts?per_page=6&author=5&_embed');
        const posts = await res.json();
        const container = document.getElementById('blogContainer');

        container.innerHTML = posts.map(post => {
            const date    = new Date(post.date).toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            const thumb   = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
            const excerpt = post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
            return `
                <div class="blog-card">
                    ${thumb ? `<img src="${thumb}" alt="" loading="lazy">` : ''}
                    <div class="blog-body">
                        <p class="blog-date">${date}</p>
                        <h3><a href="${post.link}" target="_blank">${post.title.rendered}</a></h3>
                        <p class="blog-excerpt">${excerpt}</p>
                    </div>
                </div>`;
        }).join('');
    } catch(e) {
        console.warn('Blog fetch error:', e);
        document.getElementById('blogContainer').innerHTML =
            '<p style="text-align:center;color:var(--text-muted);font-size:1.4rem;">Unable to load articles.</p>';
    }
}
