// Trending Topics Functionality for TrendAI.in
let trendingTopics = [];
let refreshInterval;
const REFRESH_INTERVAL = 30000; // 30 seconds

// Initialize trending topics on home page
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'home') {
        initializeTrendingTopics();
    }
});

function initializeTrendingTopics() {
    console.log('Initializing trending topics...');
    loadTrendingTopics();
    startAutoRefresh();
}

function loadTrendingTopics() {
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        trendingTopics = generateTrendingTopics();
        displayTrendingTopics();
        updateLastUpdatedTime();
        hideLoading();
    }, 1500);
}

function generateTrendingTopics() {
    const topics = [
        {
            id: 'ai-breakthrough-2024',
            title: 'Revolutionary AI Model Achieves Human-Level Reasoning',
            description: 'Scientists unveil a new AI system that demonstrates unprecedented problem-solving capabilities across multiple domains.',
            category: 'AI Research',
            trend: '↗ +245%',
            trending: true
        },
        {
            id: 'quantum-ai-fusion',
            title: 'Quantum Computing Meets AI: The Next Frontier',
            description: 'Major tech companies are exploring the integration of quantum computing with artificial intelligence for exponential speedups.',
            category: 'Technology',
            trend: '↗ +189%',
            trending: true
        },
        {
            id: 'ai-healthcare-diagnosis',
            title: 'AI Diagnoses Rare Diseases 3x Faster Than Specialists',
            description: 'New medical AI system shows remarkable accuracy in identifying complex conditions that typically take months to diagnose.',
            category: 'Healthcare',
            trend: '↗ +156%',
            trending: true
        },
        {
            id: 'autonomous-vehicles-breakthrough',
            title: 'Self-Driving Cars Achieve 99.9% Safety Rating',
            description: 'Latest autonomous vehicle technology demonstrates near-perfect safety record in extensive real-world testing.',
            category: 'Automotive',
            trend: '↗ +134%',
            trending: true
        },
        {
            id: 'ai-climate-solutions',
            title: 'AI Discovers New Materials for Clean Energy',
            description: 'Machine learning algorithms have identified promising new compounds for next-generation solar panels and batteries.',
            category: 'Environment',
            trend: '↗ +112%',
            trending: true
        },
        {
            id: 'language-models-multilingual',
            title: 'New Language Model Speaks 1000+ Languages Fluently',
            description: 'Breakthrough in multilingual AI could revolutionize global communication and preserve endangered languages.',
            category: 'NLP',
            trend: '↗ +98%',
            trending: true
        }
    ];

    // Randomly select 3-5 topics and add some variation
    const numTopics = Math.floor(Math.random() * 3) + 3; // 3-5 topics
    const selectedTopics = topics
        .sort(() => Math.random() - 0.5)
        .slice(0, numTopics)
        .map(topic => ({
            ...topic,
            trend: generateRandomTrend(),
            timestamp: new Date().toISOString()
        }));

    return selectedTopics;
}

function generateRandomTrend() {
    const directions = ['↗', '↑', '→'];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    const percentage = Math.floor(Math.random() * 200) + 50; // 50-250%
    return `${direction} +${percentage}%`;
}

function displayTrendingTopics() {
    const topicsGrid = document.getElementById('topicsGrid');
    if (!topicsGrid) return;

    topicsGrid.innerHTML = trendingTopics.map(topic => `
        <article class="topic-card" onclick="handleTopicClick('${topic.id}')">
            <div class="topic-header">
                <span class="topic-category">${topic.category}</span>
                <span class="topic-trend">${topic.trend}</span>
            </div>
            <h3 class="topic-title">${topic.title}</h3>
            <p class="topic-description">${topic.description}</p>
        </article>
    `).join('');
}

function handleTopicClick(topicId) {
    const topic = trendingTopics.find(t => t.id === topicId);
    if (!topic) return;

    // Generate or get existing blog post for this topic
    let posts = JSON.parse(localStorage.getItem('trendAI_posts') || '[]');
    let existingPost = posts.find(p => p.topicId === topicId);

    if (!existingPost) {
        // Generate new blog post
        existingPost = generateBlogPostFromTopic(topic);
        posts.unshift(existingPost); // Add to beginning of array
        localStorage.setItem('trendAI_posts', JSON.stringify(posts));
    }

    // Navigate to the blog post
    window.location.href = `post.html?id=${existingPost.id}`;
}

function generateBlogPostFromTopic(topic) {
    const wordCount = Math.floor(Math.random() * 201) + 500; // 500-700 words
    const readTime = Math.ceil(wordCount / 200); // Approximate reading time

    return {
        id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        topicId: topic.id,
        title: topic.title,
        excerpt: topic.description,
        content: generateDetailedContent(topic),
        category: topic.category,
        date: new Date().toISOString(),
        readTime: `${readTime} min read`,
        wordCount: wordCount
    };
}

function generateDetailedContent(topic) {
    const templates = {
        'AI Research': generateAIResearchContent,
        'Technology': generateTechnologyContent,
        'Healthcare': generateHealthcareContent,
        'Automotive': generateAutomotiveContent,
        'Environment': generateEnvironmentContent,
        'NLP': generateNLPContent
    };

    const generator = templates[topic.category] || generateAIResearchContent;
    return generator(topic);
}

function generateAIResearchContent(topic) {
    return `
        <h2>Breakthrough in Artificial Intelligence</h2>
        <p>The field of artificial intelligence has witnessed yet another groundbreaking development that promises to reshape our understanding of machine intelligence. ${topic.description}</p>
        
        <p>This remarkable achievement represents years of dedicated research and collaboration between leading AI scientists, engineers, and researchers from around the world. The implications of this breakthrough extend far beyond the laboratory, potentially transforming industries and revolutionizing how we approach complex problem-solving.</p>
        
        <h2>Technical Innovation</h2>
        <p>At the core of this advancement lies a sophisticated neural architecture that combines multiple AI techniques in novel ways. The system demonstrates an unprecedented ability to understand context, reason through complex scenarios, and provide solutions that were previously thought to be exclusively within human capability.</p>
        
        <p>The research team has published detailed findings that show significant improvements in benchmark tests across various domains. These results suggest that we may be approaching a new era in artificial intelligence development.</p>
        
        <h3>Key Features</h3>
        <p>The new system exhibits several remarkable characteristics that set it apart from previous AI models. Its ability to transfer knowledge between different domains, maintain consistent reasoning across extended conversations, and adapt to new situations with minimal training data represents a significant step forward.</p>
        
        <p>Additionally, the model demonstrates improved efficiency in computational resource usage, making it more practical for real-world deployment. This combination of enhanced capability and efficiency could accelerate the adoption of advanced AI systems across various industries.</p>
        
        <h2>Industry Impact</h2>
        <p>The potential applications of this technology span numerous sectors, from healthcare and education to finance and manufacturing. Early pilots have shown promising results in areas such as medical diagnosis, scientific research, and complex data analysis.</p>
        
        <p>Companies are already exploring how to integrate these capabilities into their existing workflows, recognizing the competitive advantages that such advanced AI systems could provide. The technology's versatility makes it suitable for a wide range of applications.</p>
        
        <h2>Future Implications</h2>
        <p>As this technology continues to evolve, researchers anticipate even greater capabilities and broader applications. The current breakthrough serves as a foundation for future developments that could further expand the boundaries of what's possible with artificial intelligence.</p>
        
        <p>The research community is actively working on addressing potential challenges and ensuring that these powerful capabilities are developed and deployed responsibly. This includes considerations around safety, ethics, and the broader societal impact of advanced AI systems.</p>
        
        <h2>Conclusion</h2>
        <p>This latest advancement in AI research marks a significant milestone in the journey toward more capable and beneficial artificial intelligence. As we continue to push the boundaries of what's possible, we move closer to realizing the full potential of AI to address some of humanity's most pressing challenges.</p>
        
        <p>The ongoing research and development in this field promise exciting developments in the months and years ahead. For those following AI advancements, this breakthrough represents a glimpse into the future of intelligent systems and their potential to transform our world.</p>
    `;
}

function generateTechnologyContent(topic) {
    return `
        <h2>Revolutionary Technology Integration</h2>
        <p>The convergence of cutting-edge technologies continues to drive innovation at an unprecedented pace. ${topic.description}</p>
        
        <p>This technological advancement represents a significant milestone in our quest to harness the power of emerging technologies for practical applications. The integration demonstrates how different technological domains can work together to create solutions that exceed the capabilities of individual systems.</p>
        
        <h2>Technical Breakthrough</h2>
        <p>The underlying technology combines advanced computational methods with innovative hardware architectures to achieve remarkable performance improvements. This breakthrough addresses long-standing challenges in the field and opens new possibilities for future developments.</p>
        
        <p>Research teams have overcome significant technical hurdles through creative engineering solutions and novel algorithmic approaches. The result is a system that demonstrates capabilities previously thought to be years away from practical implementation.</p>
        
        <h3>Implementation Details</h3>
        <p>The successful implementation required careful coordination between hardware and software components, each optimized for specific aspects of the overall system performance. This holistic approach has yielded results that surpass expectations and set new benchmarks for the industry.</p>
        
        <p>The technology's scalability ensures that it can be adapted for various use cases, from small-scale applications to enterprise-level deployments. This flexibility makes it attractive to organizations of all sizes looking to leverage advanced technological capabilities.</p>
        
        <h2>Market Impact</h2>
        <p>Industry analysts predict that this technological advancement will have far-reaching effects across multiple market segments. Early adopters are already reporting significant improvements in efficiency, performance, and capability compared to existing solutions.</p>
        
        <p>The technology's potential to disrupt traditional approaches has attracted significant investment and attention from major technology companies. This interest is driving rapid development and accelerating the path to widespread adoption.</p>
        
        <h2>Future Outlook</h2>
        <p>As this technology matures, researchers and engineers are exploring additional applications and improvements. The current breakthrough serves as a foundation for even more ambitious projects that could further transform how we approach complex technological challenges.</p>
        
        <p>The continued development of this technology promises to unlock new capabilities and create opportunities that were previously unimaginable. The potential for positive impact across numerous domains makes this an exciting area of ongoing research and development.</p>
        
        <h2>Conclusion</h2>
        <p>This technological breakthrough represents a significant step forward in our ability to solve complex problems through innovative engineering solutions. As development continues, we can expect to see even greater capabilities and broader applications.</p>
        
        <p>The success of this project demonstrates the power of interdisciplinary collaboration and the importance of continued investment in advanced technology research. The future holds great promise for further breakthroughs that will continue to push the boundaries of what's possible.</p>
    `;
}

function generateHealthcareContent(topic) {
    return `
        <h2>Medical Innovation Through AI</h2>
        <p>The healthcare industry continues to benefit from remarkable technological advancements that improve patient outcomes and streamline medical processes. ${topic.description}</p>
        
        <p>This breakthrough represents a significant advancement in medical technology, demonstrating how artificial intelligence can augment human expertise to deliver better healthcare outcomes. The integration of AI into medical practice is transforming how healthcare professionals diagnose, treat, and monitor patients.</p>
        
        <h2>Clinical Applications</h2>
        <p>The medical AI system has shown exceptional performance in clinical trials, consistently outperforming traditional diagnostic methods in both speed and accuracy. Healthcare professionals report that the technology serves as a valuable second opinion, helping them make more informed decisions about patient care.</p>
        
        <p>The system's ability to analyze complex medical data and identify patterns invisible to the human eye has proven particularly valuable in challenging cases. This capability is especially important for rare diseases where diagnostic expertise may be limited.</p>
        
        <h3>Patient Benefits</h3>
        <p>Patients are experiencing significant benefits from this technological advancement, including faster diagnosis times, more accurate treatment plans, and improved overall care quality. The technology's ability to process and analyze vast amounts of medical data enables more personalized treatment approaches.</p>
        
        <p>Early intervention capabilities have improved dramatically, allowing healthcare providers to identify and address potential health issues before they become serious problems. This preventive approach has the potential to save lives and reduce healthcare costs.</p>
        
        <h2>Healthcare System Impact</h2>
        <p>The implementation of this AI system is having a transformative effect on healthcare delivery. Hospitals and clinics report improved efficiency, reduced diagnostic errors, and better resource allocation. The technology is helping healthcare systems handle increasing patient loads while maintaining high-quality care.</p>
        
        <p>The system's integration with existing healthcare infrastructure has been remarkably smooth, allowing for rapid adoption without major disruptions to established workflows. This seamless integration is crucial for widespread acceptance and implementation.</p>
        
        <h2>Regulatory and Ethical Considerations</h2>
        <p>The deployment of AI in healthcare requires careful attention to regulatory compliance and ethical considerations. The development team has worked closely with regulatory agencies to ensure that the system meets all necessary safety and efficacy standards.</p>
        
        <p>Patient privacy and data security remain paramount concerns, and the system incorporates robust protections to safeguard sensitive medical information. Transparency in AI decision-making processes is also a key focus to maintain trust between patients and healthcare providers.</p>
        
        <h2>Future Developments</h2>
        <p>Ongoing research is focused on expanding the system's capabilities to cover additional medical specialties and conditions. The potential for AI to revolutionize healthcare extends to drug discovery, treatment optimization, and personalized medicine approaches.</p>
        
        <p>Collaboration between technology companies, healthcare providers, and research institutions continues to drive innovation in this field. The future promises even more sophisticated AI tools that will further enhance medical practice and patient care.</p>
        
        <h2>Conclusion</h2>
        <p>This medical AI breakthrough represents a significant milestone in the evolution of healthcare technology. As the system continues to evolve and improve, it holds the promise of making high-quality healthcare more accessible and effective for patients worldwide.</p>
        
        <p>The successful integration of AI into medical practice demonstrates the potential for technology to augment human expertise and improve health outcomes. This advancement paves the way for a future where AI and healthcare professionals work together to provide the best possible care for patients.</p>
    `;
}

function generateAutomotiveContent(topic) {
    return `
        <h2>Autonomous Vehicle Revolution</h2>
        <p>The automotive industry is experiencing a technological revolution that promises to transform transportation as we know it. ${topic.description}</p>
        
        <p>This achievement in autonomous vehicle technology represents years of intensive research, development, and testing. The breakthrough addresses many of the safety and reliability concerns that have historically limited the widespread adoption of self-driving vehicles.</p>
        
        <h2>Safety and Reliability</h2>
        <p>The remarkable safety record achieved by these autonomous vehicles is the result of sophisticated sensor fusion, advanced machine learning algorithms, and robust safety systems. Multiple layers of redundancy ensure that the vehicles can handle unexpected situations safely and effectively.</p>
        
        <p>Extensive testing in diverse driving conditions has demonstrated the system's ability to navigate complex traffic scenarios, adverse weather conditions, and emergency situations. The technology's performance in real-world testing has exceeded expectations and regulatory requirements.</p>
        
        <h3>Technical Innovation</h3>
        <p>The autonomous driving system incorporates cutting-edge technologies including computer vision, lidar sensing, radar detection, and artificial intelligence processing. These components work together to create a comprehensive understanding of the vehicle's environment in real-time.</p>
        
        <p>Advanced algorithms process vast amounts of sensor data to make split-second decisions about navigation, obstacle avoidance, and traffic management. The system's ability to learn and adapt from experience continues to improve its performance over time.</p>
        
        <h2>Industry Transformation</h2>
        <p>The automotive industry is rapidly adapting to this technological shift, with manufacturers investing heavily in autonomous vehicle development. The potential for reduced accidents, improved traffic flow, and enhanced mobility for disabled individuals is driving widespread interest and investment.</p>
        
        <p>Transportation companies are exploring how autonomous vehicles can improve efficiency and reduce costs in logistics, ride-sharing, and public transportation. The technology's potential to reshape urban planning and transportation infrastructure is also gaining attention from city planners and policymakers.</p>
        
        <h2>Regulatory Framework</h2>
        <p>Government agencies are working to establish comprehensive regulatory frameworks for autonomous vehicles. The exceptional safety record of current systems is helping to build confidence among regulators and the public regarding the viability of self-driving technology.</p>
        
        <p>International cooperation on standards and regulations is ensuring that autonomous vehicle technology can be deployed safely and effectively across different markets and jurisdictions. This coordination is crucial for the global adoption of autonomous vehicle technology.</p>
        
        <h2>Future Mobility</h2>
        <p>The successful deployment of autonomous vehicles is expected to transform how people think about transportation and mobility. The technology promises to make transportation more accessible, efficient, and environmentally sustainable.</p>
        
        <p>Future developments in autonomous vehicle technology will focus on enhanced connectivity, improved AI capabilities, and integration with smart city infrastructure. These advancements will further improve the safety, efficiency, and user experience of autonomous transportation.</p>
        
        <h2>Conclusion</h2>
        <p>This breakthrough in autonomous vehicle safety represents a pivotal moment in transportation history. As the technology continues to evolve and gain acceptance, we can expect to see fundamental changes in how people and goods move around the world.</p>
        
        <p>The achievement of such high safety standards demonstrates the maturity of autonomous vehicle technology and its readiness for widespread deployment. The future of transportation is becoming increasingly autonomous, safe, and efficient.</p>
    `;
}

function generateEnvironmentContent(topic) {
    return `
        <h2>AI-Driven Environmental Solutions</h2>
        <p>The intersection of artificial intelligence and environmental science is yielding groundbreaking solutions to some of our planet's most pressing challenges. ${topic.description}</p>
        
        <p>This breakthrough demonstrates the power of AI to accelerate scientific discovery and innovation in the fight against climate change. By leveraging machine learning algorithms and vast computational resources, researchers are uncovering new possibilities for sustainable energy and environmental protection.</p>
        
        <h2>Scientific Discovery</h2>
        <p>The AI system has analyzed millions of potential material compositions and identified promising candidates for next-generation clean energy technologies. This computational approach has dramatically accelerated the discovery process, reducing the time from concept to prototype by orders of magnitude.</p>
        
        <p>Traditional materials research would have required decades to achieve similar results through conventional experimental methods. The AI-driven approach has enabled researchers to explore vast chemical spaces and identify optimal combinations that might never have been discovered through conventional means.</p>
        
        <h3>Clean Energy Applications</h3>
        <p>The newly discovered materials show exceptional promise for improving the efficiency and cost-effectiveness of solar panels, wind turbines, and energy storage systems. Laboratory testing has confirmed the AI predictions, with prototypes demonstrating significant performance improvements over existing technologies.</p>
        
        <p>These advancements could play a crucial role in accelerating the transition to renewable energy sources and reducing our dependence on fossil fuels. The potential for large-scale deployment makes this discovery particularly significant for global sustainability efforts.</p>
        
        <h2>Environmental Impact</h2>
        <p>The environmental implications of this breakthrough extend far beyond clean energy generation. The new materials could enable more efficient energy storage, reducing waste and improving grid stability. This advancement is particularly important for integrating renewable energy sources into existing power systems.</p>
        
        <p>The manufacturing processes for these materials have also been optimized for minimal environmental impact, using sustainable production methods and reducing harmful byproducts. This holistic approach ensures that the environmental benefits extend throughout the entire lifecycle of the technology.</p>
        
        <h2>Economic Opportunities</h2>
        <p>The commercialization of these AI-discovered materials promises to create new industries and economic opportunities while addressing environmental challenges. Investment in clean energy technologies is accelerating as the economic viability of these solutions becomes increasingly clear.</p>
        
        <p>Companies are already exploring partnerships and licensing agreements to bring these innovations to market. The potential for job creation in manufacturing, research, and deployment of clean energy technologies is substantial and could drive economic growth while addressing environmental concerns.</p>
        
        <h2>Global Collaboration</h2>
        <p>International cooperation in developing and deploying these technologies is essential for maximizing their environmental impact. Research institutions and governments around the world are collaborating to accelerate the development and deployment of these AI-discovered materials.</p>
        
        <p>Sharing research findings and coordinating development efforts will ensure that these technological advances benefit all nations in their efforts to address climate change and environmental degradation. This collaborative approach is crucial for achieving global sustainability goals.</p>
        
        <h2>Future Research</h2>
        <p>Ongoing research is focused on optimizing these materials for specific applications and exploring additional possibilities for AI-driven environmental solutions. The success of this project has inspired similar initiatives in other areas of environmental science and sustainability.</p>
        
        <p>Future AI discoveries may unlock even more powerful solutions for carbon capture, water purification, and ecosystem restoration. The potential for artificial intelligence to accelerate environmental problem-solving continues to grow as computational capabilities and algorithms improve.</p>
        
        <h2>Conclusion</h2>
        <p>This AI-driven breakthrough in clean energy materials represents a significant step forward in our ability to address environmental challenges through technological innovation. The successful application of artificial intelligence to materials discovery opens new pathways for sustainable development.</p>
        
        <p>As we continue to face urgent environmental challenges, the combination of AI capabilities and scientific expertise offers hope for developing the solutions needed to protect our planet for future generations. This breakthrough demonstrates the potential for technology to be a powerful force for environmental good.</p>
    `;
}

function generateNLPContent(topic) {
    return `
        <h2>Multilingual AI Breakthrough</h2>
        <p>The field of natural language processing has achieved a remarkable milestone with the development of AI systems capable of understanding and communicating in over 1000 languages. ${topic.description}</p>
        
        <p>This unprecedented linguistic capability represents a significant advancement in making AI technology more inclusive and accessible to people around the world. The breakthrough addresses one of the fundamental barriers to global AI adoption: language diversity and the preservation of cultural heritage through language.</p>
        
        <h2>Technical Architecture</h2>
        <p>The multilingual AI system employs advanced transformer architectures and novel training methodologies to achieve fluency across such a vast range of languages. The model has been trained on diverse linguistic datasets, including both high-resource and low-resource languages, ensuring broad coverage and cultural sensitivity.</p>
        
        <p>The system's ability to understand context, cultural nuances, and linguistic variations within each language family demonstrates a sophisticated understanding of human communication. This level of linguistic competence was previously thought to require decades of additional research and development.</p>
        
        <h3>Language Preservation</h3>
        <p>One of the most significant impacts of this technology is its potential to help preserve endangered languages. Many of the world's languages are at risk of disappearing, and this AI system provides a powerful tool for documentation, education, and revitalization efforts.</p>
        
        <p>Indigenous communities and linguistic researchers are exploring how this technology can support language preservation initiatives. The AI's ability to understand and generate text in endangered languages offers new possibilities for creating educational materials and cultural documentation.</p>
        
        <h2>Global Communication</h2>
        <p>The breakthrough has immediate implications for global communication and cross-cultural understanding. Real-time translation capabilities could break down language barriers in international business, diplomacy, education, and social interaction.</p>
        
        <p>The technology's nuanced understanding of cultural context and idiomatic expressions makes it particularly valuable for facilitating meaningful communication between speakers of different languages. This capability goes beyond simple word-for-word translation to capture the true intent and emotion behind communications.</p>
        
        <h2>Educational Applications</h2>
        <p>Educational institutions worldwide are exploring how this multilingual AI can enhance language learning and cross-cultural education. The system's ability to provide personalized instruction in a student's native language while teaching other languages creates new possibilities for inclusive education.</p>
        
        <p>The technology can also support curriculum development for underrepresented languages and cultures, helping to ensure that educational content is accessible to diverse student populations. This accessibility is particularly important for maintaining cultural diversity in increasingly connected world.</p>
        
        <h2>Business and Economic Impact</h2>
        <p>Companies operating in global markets are already implementing this technology to improve customer service, content localization, and cross-border communication. The ability to communicate effectively with customers in their preferred language is driving significant business value and market expansion opportunities.</p>
        
        <p>The technology is also creating new economic opportunities for speakers of less common languages, who can now participate more fully in the global digital economy. This democratization of technology access has important implications for economic development and social equity.</p>
        
        <h2>Ethical Considerations</h2>
        <p>The development and deployment of such powerful language technology raises important ethical questions about cultural representation, bias, and the appropriate use of linguistic data. The research team has prioritized ethical AI development practices and community engagement throughout the development process.</p>
        
        <p>Ongoing efforts focus on ensuring that the technology respects cultural sensitivities and promotes rather than threatens linguistic diversity. Community input and oversight are essential components of the technology's continued development and deployment.</p>
        
        <h2>Future Developments</h2>
        <p>Research continues on expanding the system's capabilities to include spoken language processing, visual language understanding, and more sophisticated cultural adaptation. These enhancements will further improve the technology's ability to serve diverse global communities.</p>
        
        <p>Integration with other AI technologies promises to create even more powerful tools for global communication and cultural exchange. The future of multilingual AI holds great promise for creating a more connected and inclusive world.</p>
        
        <h2>Conclusion</h2>
        <p>This breakthrough in multilingual AI represents a transformative moment for global communication and cultural preservation. The technology's potential to break down language barriers while respecting and preserving linguistic diversity offers hope for a more inclusive digital future.</p>
        
        <p>As this technology continues to evolve and improve, it will play an increasingly important role in facilitating understanding, preserving cultural heritage, and creating opportunities for people of all linguistic backgrounds to participate fully in the global community.</p>
    `;
}

function updateLastUpdatedTime() {
    const lastUpdatedElement = document.getElementById('lastUpdated');
    if (lastUpdatedElement) {
        const now = new Date();
        lastUpdatedElement.textContent = `Last updated: ${now.toLocaleTimeString()}`;
    }
}

function showLoading() {
    const topicsGrid = document.getElementById('topicsGrid');
    if (topicsGrid) {
        topicsGrid.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Loading trending topics...</p>
            </div>
        `;
    }
}

function hideLoading() {
    // Loading is hidden when displayTrendingTopics() runs
}

function startAutoRefresh() {
    refreshInterval = setInterval(() => {
        loadTrendingTopics();
    }, REFRESH_INTERVAL);
}

function stopAutoRefresh() {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
}

// Cleanup when leaving the page
window.addEventListener('beforeunload', stopAutoRefresh);

// Function to get current page (imported from main.js)
function getCurrentPage() {
    const path = window.location.pathname;
    if (path === '/' || path.includes('index.html')) return 'home';
    if (path.includes('blog.html')) return 'blog';
    if (path.includes('post.html')) return 'post';
    return 'other';
}