// Main JavaScript for TrendAI.in
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupPerformanceOptimizations();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
        case 'post':
            initializePostPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.includes('index.html')) return 'home';
    if (path.includes('blog.html')) return 'blog';
    if (path.includes('post.html')) return 'post';
    return 'other';
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    preloadCriticalResources();
}

function preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2';
    document.head.appendChild(fontLink);
}

function initializeHomePage() {
    // This will be called by trending.js
    console.log('Home page initialized');
}

function initializeBlogPage() {
    loadBlogPosts();
}

function initializePostPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId) {
        loadBlogPost(postId);
    }
}

function loadBlogPosts() {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;
    
    // Get posts from localStorage or generate new ones
    let posts = JSON.parse(localStorage.getItem('trendAI_posts') || '[]');
    
    if (posts.length === 0) {
        // Generate initial posts if none exist
        posts = generateInitialPosts();
        localStorage.setItem('trendAI_posts', JSON.stringify(posts));
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Render posts
    blogGrid.innerHTML = posts.map(post => `
        <article class="blog-card">
            <a href="post.html?id=${post.id}" class="blog-card-link">
                <div class="blog-card-content">
                    <div class="blog-meta">
                        <span class="blog-category">${post.category}</span>
                        <span class="blog-date">${formatDate(post.date)}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                </div>
            </a>
        </article>
    `).join('');
}

function loadBlogPost(postId) {
    const posts = JSON.parse(localStorage.getItem('trendAI_posts') || '[]');
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
        document.querySelector('.post-content').innerHTML = '<p>Post not found.</p>';
        return;
    }
    
    // Update page title
    document.title = `${post.title} - TrendAI.in`;
    
    // Update post header
    const postHeader = document.querySelector('.post-header .container');
    if (postHeader) {
        postHeader.innerHTML = `
            <h1 class="post-title">${post.title}</h1>
            <div class="post-meta">
                <span class="post-category">${post.category}</span>
                <span class="post-date">${formatDate(post.date)}</span>
                <span class="post-read-time">${post.readTime}</span>
            </div>
        `;
    }
    
    // Update post content
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        postContent.innerHTML = post.content;
    }
}

function generateInitialPosts() {
    const categories = ['AI Technology', 'Machine Learning', 'Deep Learning', 'Natural Language Processing', 'Computer Vision'];
    const posts = [];
    
    for (let i = 0; i < 12; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const date = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within last 30 days
        
        const post = {
            id: `post-${Date.now()}-${i}`,
            title: generatePostTitle(category),
            excerpt: generatePostExcerpt(category),
            content: generatePostContent(category),
            category: category,
            date: date.toISOString(),
            readTime: '5-7 min read'
        };
        
        posts.push(post);
    }
    
    return posts;
}

function generatePostTitle(category) {
    const titles = {
        'AI Technology': [
            'The Future of Artificial Intelligence in 2024',
            'Breaking: New AI Breakthrough Changes Everything',
            'How AI is Revolutionizing Healthcare',
            'The Ethics of AI: What We Need to Know'
        ],
        'Machine Learning': [
            'Understanding Machine Learning Algorithms',
            'ML Models That Are Changing Industries',
            'The Rise of AutoML: Democratizing Machine Learning',
            'Edge Computing Meets Machine Learning'
        ],
        'Deep Learning': [
            'Deep Learning: The Next Generation',
            'Neural Networks and Their Applications',
            'Transformer Models: A Deep Dive',
            'Computer Vision with Deep Learning'
        ],
        'Natural Language Processing': [
            'Large Language Models: Current State',
            'NLP Applications in Real World',
            'The Evolution of Chatbots and Virtual Assistants',
            'Understanding Context in NLP'
        ],
        'Computer Vision': [
            'Computer Vision in Autonomous Vehicles',
            'Real-time Image Processing Advances',
            'Medical Imaging with AI',
            'The Future of Visual Recognition'
        ]
    };
    
    const categoryTitles = titles[category] || titles['AI Technology'];
    return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
}

function generatePostExcerpt(category) {
    const excerpts = {
        'AI Technology': 'Exploring the latest developments in artificial intelligence and their potential impact on society, business, and technology.',
        'Machine Learning': 'Diving deep into machine learning algorithms, their applications, and how they\'re transforming industries across the globe.',
        'Deep Learning': 'Understanding the complexities of neural networks and how deep learning is pushing the boundaries of what\'s possible.',
        'Natural Language Processing': 'Examining how machines understand and process human language, from chatbots to language translation.',
        'Computer Vision': 'Discovering how computers see and interpret visual information, revolutionizing fields from healthcare to autonomous vehicles.'
    };
    
    return excerpts[category] || excerpts['AI Technology'];
}

function generatePostContent(category) {
    return `
        <h2>Introduction</h2>
        <p>The world of ${category.toLowerCase()} is evolving at an unprecedented pace, bringing new opportunities and challenges that reshape how we interact with technology. In this comprehensive analysis, we explore the latest trends, breakthrough innovations, and future implications of this rapidly advancing field.</p>
        
        <h2>Current State of the Technology</h2>
        <p>Today's landscape in ${category.toLowerCase()} is characterized by remarkable achievements and continuous innovation. Leading research institutions and technology companies are pushing the boundaries of what's possible, creating solutions that were once considered science fiction.</p>
        
        <p>The integration of advanced algorithms with powerful computing infrastructure has enabled unprecedented capabilities. From real-time processing to complex pattern recognition, these technologies are becoming increasingly sophisticated and accessible.</p>
        
        <h2>Key Developments and Breakthroughs</h2>
        <p>Recent developments have focused on improving efficiency, accuracy, and scalability. Researchers have made significant strides in optimizing performance while reducing computational requirements, making these technologies more practical for widespread adoption.</p>
        
        <p>Notable breakthroughs include enhanced model architectures, improved training methodologies, and novel applications across various industries. These advancements are not only pushing technical boundaries but also creating new possibilities for practical implementation.</p>
        
        <h3>Industry Applications</h3>
        <p>The practical applications of ${category.toLowerCase()} span across multiple sectors, each leveraging unique aspects of the technology to solve specific challenges. Healthcare, finance, automotive, and entertainment industries are leading the adoption, demonstrating measurable improvements in efficiency and outcomes.</p>
        
        <p>Companies are investing heavily in research and development, recognizing the competitive advantages that these technologies provide. The return on investment is becoming increasingly clear as implementations mature and demonstrate tangible benefits.</p>
        
        <h2>Challenges and Considerations</h2>
        <p>Despite the promising developments, several challenges remain. Technical limitations, ethical considerations, and regulatory frameworks continue to evolve as the technology advances. Addressing these challenges requires collaboration between technologists, policymakers, and society at large.</p>
        
        <p>Data privacy, algorithmic bias, and the need for transparency are among the key concerns that the industry must address. Establishing best practices and ethical guidelines is crucial for sustainable growth and public trust.</p>
        
        <h2>Future Outlook</h2>
        <p>Looking ahead, the future of ${category.toLowerCase()} appears bright with continued innovation and expanding applications. Emerging trends suggest even more sophisticated capabilities and broader accessibility in the coming years.</p>
        
        <p>The convergence with other emerging technologies promises to unlock new possibilities and create synergistic effects that could revolutionize how we live and work. Investment in education and skill development will be crucial to fully realize this potential.</p>
        
        <h2>Conclusion</h2>
        <p>As we stand at the forefront of this technological revolution, it's clear that ${category.toLowerCase()} will continue to play a pivotal role in shaping our future. The ongoing developments promise exciting opportunities while requiring careful consideration of their implications.</p>
        
        <p>Staying informed about these developments and their potential impact is essential for individuals and organizations looking to leverage these technologies effectively. The journey ahead is filled with possibilities, and we're just beginning to scratch the surface of what's achievable.</p>
    `;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for use in other modules
window.TrendAI = {
    formatDate,
    loadBlogPost,
    loadBlogPosts,
    debounce,
    throttle
};