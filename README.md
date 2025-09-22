# Asim Merchant - Portfolio Website

A modern, responsive portfolio website showcasing embedded systems expertise, professional experience, and GitHub projects.

## 🚀 Features

- **Modern Design**: Clean, professional layout with embedded systems theme
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Smooth animations, typing effects, and scroll-triggered animations
- **GitHub Integration**: Dynamically loads repositories and profile data
- **Performance Optimized**: Fast loading with optimized assets and code
- **Accessible**: WCAG 2.1 compliant with keyboard navigation support
- **SEO Friendly**: Optimized meta tags and semantic HTML structure

## 🛠 Technologies Used

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+**: Interactive features and GitHub API integration
- **Font Awesome**: Professional iconography
- **Google Fonts**: Inter and JetBrains Mono typefaces

## 📁 Project Structure

```
my_own_landing/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Main stylesheet
│   ├── js/
│   │   └── script.js       # JavaScript functionality
│   └── images/             # Image assets
├── resume.md              # Source resume content
└── README.md              # This file
```

## 🎨 Design Features

### Color Palette
- Primary: #00d4ff (Cyan Blue)
- Secondary: #ff6b35 (Orange Red)
- Accent: #00ff88 (Green)
- Background: #0a0a0f (Dark)
- Text: #ffffff, #b8c5d6, #8892b0

### Typography
- **Primary Font**: Inter (Clean, modern sans-serif)
- **Code Font**: JetBrains Mono (For terminal and code elements)

### Sections
1. **Hero**: Introduction with animated terminal
2. **About**: Personal information and statistics
3. **Experience**: Timeline of professional experience
4. **Skills**: Interactive skill bars and technology tags
5. **Projects**: GitHub integration with repository showcase
6. **Contact**: Contact form and social links

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- Desktop: 1024px and above
- Tablet: 768px - 1023px
- Mobile: 320px - 767px

## ⚡ Performance Features

- **Lazy Loading**: Images and animations load as needed
- **Optimized Assets**: Minified CSS and JavaScript
- **Efficient Animations**: Hardware-accelerated CSS animations
- **Throttled Scroll Events**: Smooth scrolling without performance issues

## 🔧 Customization

### Updating Content
1. **Personal Information**: Edit the HTML content in `index.html`
2. **Styling**: Modify CSS variables in `style.css`
3. **GitHub Username**: Update the username in `script.js`

### CSS Variables
```css
:root {
    --primary-color: #00d4ff;
    --secondary-color: #ff6b35;
    --accent-color: #00ff88;
    /* ... more variables */
}
```

### GitHub Integration
Update the GitHub username in `assets/js/script.js`:
```javascript
config: {
    githubUsername: 'YourGitHubUsername',
    // ... other config
}
```

## 🚀 Deployment

### Local Development
1. Clone or download the project
2. Open `index.html` in a web browser
3. For live server, use any local server (Live Server extension in VS Code recommended)

### Web Hosting
Upload all files to your web hosting provider:
- **GitHub Pages**: Perfect for static hosting
- **Netlify**: Drag and drop deployment
- **Vercel**: Git-based deployment
- **Traditional Hosting**: Upload via FTP

### GitHub Pages Deployment
1. Create a new repository
2. Upload all files
3. Go to Settings > Pages
4. Select source branch (main/master)
5. Your site will be available at `https://username.github.io/repository-name`

## 📞 Contact Form Setup

The contact form currently shows a demo submission. To make it functional:

1. **EmailJS**: Sign up and configure service
2. **Formspree**: Add form action to Formspree endpoint
3. **Netlify Forms**: Deploy on Netlify and add `netlify` attribute
4. **Custom Backend**: Integrate with your preferred backend service

## 🎯 Features Breakdown

### Hero Section
- Animated typing terminal effect
- Responsive grid layout
- Call-to-action buttons
- Scroll indicator

### Experience Timeline
- Chronological work history
- Technology tags for each role
- Hover effects and animations
- Detailed project descriptions

### Skills Section
- Animated progress bars
- Categorized skill groups
- Years of experience indicators
- Technology tag clouds

### GitHub Integration
- Live repository data
- Profile statistics
- Repository cards with language indicators
- Fallback content if API is unavailable

### Animations
- Scroll-triggered animations
- Loading screen with typing effect
- Smooth transitions and hover effects
- Performance-optimized with throttling

## 🔧 Browser Support

- **Modern Browsers**: Chrome 70+, Firefox 65+, Safari 12+, Edge 79+
- **Fallbacks**: Graceful degradation for older browsers
- **Mobile**: iOS Safari 12+, Chrome Mobile 70+

## 📈 SEO Optimization

- Semantic HTML structure
- Meta tags and Open Graph data
- Alt attributes for images
- Clean URL structure
- Fast loading times

## ♿ Accessibility Features

- ARIA labels and roles
- Keyboard navigation support
- High contrast mode support
- Screen reader friendly
- Focus indicators
- Reduced motion preferences

## 🐛 Known Issues & Limitations

- GitHub API rate limiting (60 requests/hour for unauthenticated)
- Contact form requires backend integration for functionality
- Some animations may not work in older browsers

## 🔄 Future Enhancements

- [ ] Blog section integration
- [ ] Dark/Light theme toggle
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Advanced analytics integration
- [ ] Certificate and achievement showcase

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and adapt it for your own portfolio. If you make improvements, consider sharing them back!

## 📞 Support

For questions or support, please contact:
- **Email**: asimthatsme@gmail.com
- **GitHub**: [@AsimMerchant](https://github.com/AsimMerchant)
- **LinkedIn**: [Asim Merchant](https://www.linkedin.com/in/asim-merchant-baaa0684/)

---

**Built with ❤️ by Asim Merchant**