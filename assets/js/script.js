// ==========================================
// Main Application Object
// ==========================================
const App = {
    // Configuration
    config: {
        typingSpeed: 50,
        deletingSpeed: 30,
        githubUsername: 'AsimMerchant',
        emailService: 'emailjs', // Configure if needed
        animationOffset: 100
    },

    // State management
    state: {
        isLoading: true,
        currentSection: 'home',
        mobileMenuOpen: false,
        githubData: null,
        typingIndex: 0,
        isTyping: true
    },

    // Terminal commands for typing animation
    terminalCommands: [
        'whoami',
        'ls -la skills/',
        'cat experience.txt',
        'git status',
        'npm run portfolio',
        'echo "Welcome to my portfolio!"'
    ],

    // Initialize the application
    init() {
        this.bindEvents();
        this.handleLoading();
        this.initializeAnimations();
        this.initializeNavigation();
        this.initializeTerminal();
        this.loadGitHubData();
        this.initializeScrollAnimations();
        this.initializeContactForm();
    },

    // ==========================================
    // Event Binding
    // ==========================================
    bindEvents() {
        // Window events
        window.addEventListener('load', () => this.handlePageLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Navigation events
        document.addEventListener('click', (e) => this.handleNavigation(e));
        
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Back to top button
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => this.scrollToTop());
        }

        // Form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleFormSubmission(e));
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
        });
    },

    // ==========================================
    // Loading & Page Setup
    // ==========================================
    handleLoading() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    this.state.isLoading = false;
                    this.triggerEntranceAnimations();
                }, 500);
            }
        }, 2000);
    },

    handlePageLoad() {
        // Initialize skill bar animations
        this.animateSkillBars();
        // Initialize counter animations
        this.animateCounters();
        // Set active navigation
        this.updateActiveNav();
    },

    // ==========================================
    // Navigation
    // ==========================================
    initializeNavigation() {
        // Update navigation on scroll
        this.updateActiveNav();
    },

    handleNavigation(e) {
        const navLink = e.target.closest('.nav-link');
        if (navLink && navLink.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = navLink.getAttribute('href').slice(1);
            this.scrollToSection(targetId);
            this.closeMobileMenu();
        }
    },

    handleAnchorClick(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').slice(1);
        this.scrollToSection(targetId);
    },

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = section.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        this.state.mobileMenuOpen = !this.state.mobileMenuOpen;
        
        if (navMenu) navMenu.classList.toggle('active');
        if (mobileMenu) mobileMenu.classList.toggle('active');
    },

    closeMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const mobileMenu = document.getElementById('mobile-menu');
        
        this.state.mobileMenuOpen = false;
        
        if (navMenu) navMenu.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
    },

    updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        this.state.currentSection = sectionId;
                    }
                });
            }
        });
    },

    // ==========================================
    // Scroll Handling
    // ==========================================
    handleScroll() {
        const navbar = document.getElementById('navbar');
        const backToTop = document.getElementById('back-to-top');
        const scrollY = window.scrollY;

        // Update navbar appearance
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Show/hide back to top button
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Update active navigation
        this.updateActiveNav();

        // Trigger scroll animations
        this.handleScrollAnimations();
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },

    // ==========================================
    // Terminal Animation
    // ==========================================
    initializeTerminal() {
        const commandElement = document.getElementById('typing-command');
        const outputElement = document.getElementById('terminal-output');
        
        if (!commandElement || !outputElement) return;

        this.typeCommand(commandElement, outputElement);
    },

    async typeCommand(commandElement, outputElement) {
        const commands = this.terminalCommands;
        let commandIndex = 0;

        while (true) {
            const currentCommand = commands[commandIndex];
            
            // Type the command
            await this.typeText(commandElement, currentCommand);
            await this.wait(1000);
            
            // Show output
            await this.showCommandOutput(outputElement, currentCommand);
            await this.wait(2000);
            
            // Clear and move to next command
            await this.deleteText(commandElement);
            commandIndex = (commandIndex + 1) % commands.length;
            await this.wait(500);
        }
    },

    async typeText(element, text) {
        element.textContent = '';
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.wait(this.config.typingSpeed);
        }
    },

    async deleteText(element) {
        const text = element.textContent;
        for (let i = text.length; i >= 0; i--) {
            element.textContent = text.substring(0, i);
            await this.wait(this.config.deletingSpeed);
        }
    },

    async showCommandOutput(element, command) {
        const outputs = {
            'whoami': 'asim-merchant\nSenior Firmware Development Engineer\nEmbedded Systems Specialist',
            'ls -la skills/': 'drwxr-xr-x  embedded-c/\ndrwxr-xr-x  python/\ndrwxr-xr-x  freertos/\ndrwxr-xr-x  wi-sun/',
            'cat experience.txt': 'Experience: 7+ years\nSpecialty: Embedded Systems\nCurrent: Senior Engineer @ Altimetrik',
            'git status': 'On branch main\nYour portfolio is up to date.',
            'npm run portfolio': 'Building amazing embedded solutions...\n✓ Compiled successfully!',
            'echo "Welcome to my portfolio!"': 'Welcome to my portfolio!\nExplore my projects and experience below.'
        };

        const output = outputs[command] || 'Command completed successfully.';
        element.textContent = output;
    },

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // ==========================================
    // Animations
    // ==========================================
    initializeAnimations() {
        // Add intersection observer for scroll animations
        this.observeElements();
    },

    triggerEntranceAnimations() {
        // Hero animations
        const heroElements = document.querySelectorAll('.hero-text, .hero-visual');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = `fadeInUp 0.8s ease-out forwards`;
            }, index * 200);
        });
    },

    initializeScrollAnimations() {
        const animatedElements = document.querySelectorAll('.timeline-item, .skill-item, .stat-item');
        
        animatedElements.forEach(element => {
            element.classList.add('animate-on-scroll');
        });
    },

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // Trigger specific animations based on element type
                    if (entry.target.classList.contains('stat-item')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: `-${this.config.animationOffset}px`
        });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    },

    handleScrollAnimations() {
        // Additional scroll-based animations can be added here
    },

    // ==========================================
    // Counter Animations
    // ==========================================
    animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        counters.forEach(counter => {
            this.animateCounter(counter);
        });
    },

    animateCounter(counter) {
        if (counter.classList.contains('counted')) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
                counter.classList.add('counted');
            }
            counter.textContent = Math.floor(current);
        }, 16);
    },

    // ==========================================
    // Skill Bar Animations
    // ==========================================
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress[data-width]');
        
        skillBars.forEach(bar => {
            this.animateSkillBar(bar.closest('.skill-item'));
        });
    },

    animateSkillBar(skillItem) {
        if (skillItem.classList.contains('animated-skill')) return;
        
        const progressBar = skillItem.querySelector('.skill-progress[data-width]');
        if (progressBar) {
            const width = progressBar.getAttribute('data-width');
            setTimeout(() => {
                progressBar.style.width = width + '%';
                skillItem.classList.add('animated-skill');
            }, 300);
        }
    },

    // ==========================================
    // GitHub Integration
    // ==========================================
    async loadGitHubData() {
        try {
            const username = this.config.githubUsername;
            
            // Fetch user profile
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            const userData = await userResponse.json();
            
            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
            const reposData = await reposResponse.json();
            
            this.state.githubData = {
                user: userData,
                repos: reposData
            };
            
            this.renderGitHubProfile(userData);
            this.renderGitHubRepos(reposData);
            
        } catch (error) {
            console.warn('GitHub data could not be loaded:', error);
            this.renderGitHubFallback();
        }
    },

    renderGitHubProfile(userData) {
        const profileContainer = document.getElementById('github-profile');
        if (!profileContainer || !userData) return;

        profileContainer.innerHTML = `
            <img src="${userData.avatar_url}" alt="${userData.name || userData.login}" class="github-avatar">
            <h3 class="github-name">${userData.name || userData.login}</h3>
            <p class="github-bio">${userData.bio || 'Senior Firmware Development Engineer'}</p>
            <div class="github-stats">
                <div class="github-stat">
                    <span class="github-stat-number">${userData.public_repos}</span>
                    <span class="github-stat-label">Repositories</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">${userData.followers}</span>
                    <span class="github-stat-label">Followers</span>
                </div>
                <div class="github-stat">
                    <span class="github-stat-number">${userData.following}</span>
                    <span class="github-stat-label">Following</span>
                </div>
            </div>
        `;
    },

    renderGitHubRepos(reposData) {
        const reposContainer = document.getElementById('github-repos');
        if (!reposContainer || !reposData) return;

        const reposHTML = reposData.map(repo => {
            const languageColor = this.getLanguageColor(repo.language);
            const stars = repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : '';
            const forks = repo.forks_count > 0 ? `<span>🍴 ${repo.forks_count}</span>` : '';
            
            return `
                <a href="${repo.html_url}" target="_blank" rel="noopener" class="repo-card">
                    <h4 class="repo-name">
                        <i class="fab fa-github"></i>
                        ${repo.name}
                    </h4>
                    <p class="repo-description">
                        ${repo.description || 'No description available'}
                    </p>
                    <div class="repo-stats">
                        ${repo.language ? `
                            <span class="repo-language">
                                <span class="language-dot" style="background-color: ${languageColor}"></span>
                                ${repo.language}
                            </span>
                        ` : ''}
                        ${stars}
                        ${forks}
                    </div>
                </a>
            `;
        }).join('');

        reposContainer.innerHTML = reposHTML;
    },

    renderGitHubFallback() {
        const profileContainer = document.getElementById('github-profile');
        const reposContainer = document.getElementById('github-repos');

        if (profileContainer) {
            profileContainer.innerHTML = `
                <div class="github-fallback">
                    <h3>Asim Merchant</h3>
                    <p>Senior Firmware Development Engineer</p>
                    <a href="https://github.com/AsimMerchant" target="_blank" rel="noopener" class="btn btn-primary">
                        <i class="fab fa-github"></i>
                        Visit GitHub Profile
                    </a>
                </div>
            `;
        }

        if (reposContainer) {
            reposContainer.innerHTML = `
                <div class="repo-fallback">
                    <p>Visit my GitHub profile to see my latest projects and contributions.</p>
                </div>
            `;
        }
    },

    getLanguageColor(language) {
        const colors = {
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'C': '#555555',
            'C++': '#f34b7d',
            'Java': '#b07219',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'TypeScript': '#2b7489',
            'Shell': '#89e051',
            'Assembly': '#6E4C13',
            'Makefile': '#427819'
        };
        return colors[language] || '#586069';
    },

    // ==========================================
    // Contact Form
    // ==========================================
    initializeContactForm() {
        // Form validation and styling
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                if (!e.target.value) {
                    e.target.parentElement.classList.remove('focused');
                }
            });
        });
    },

    async handleFormSubmission(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual service)
            await this.wait(2000);
            
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'var(--success-color)';
            
            // Reset form
            form.reset();
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
        } catch (error) {
            // Error state
            submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error';
            submitButton.style.background = 'var(--error-color)';
            
            this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    },

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--background-card);
            color: var(--text-primary);
            padding: 1rem;
            border-radius: var(--radius-md);
            border: 1px solid var(--${type === 'success' ? 'success' : 'error'}-color);
            box-shadow: var(--shadow-lg);
            z-index: var(--z-modal);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    },

    // ==========================================
    // Utility Functions
    // ==========================================
    handleResize() {
        // Close mobile menu on resize
        if (window.innerWidth > 768 && this.state.mobileMenuOpen) {
            this.closeMobileMenu();
        }
    },

    // Throttle function for performance
    throttle(func, limit) {
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
    },

    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
};

// ==========================================
// Additional Utilities
// ==========================================

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@1.4.10/src/smoothscroll.js';
    document.head.appendChild(script);
}

// Add CSS custom properties support for older browsers
if (!CSS.supports('color', 'var(--primary-color)')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/css-vars-ponyfill@2.4.7/dist/css-vars-ponyfill.min.css';
    document.head.appendChild(link);
}

// ==========================================
// Performance Monitoring
// ==========================================
const Performance = {
    init() {
        // Monitor loading performance
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        });
        
        // Monitor scroll performance
        let scrollHandler = App.throttle(() => {
            App.handleScroll();
        }, 16); // 60 FPS
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
    }
};

// ==========================================
// Initialize Application
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    Performance.init();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = App;
}