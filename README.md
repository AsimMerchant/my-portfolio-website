# 🚀 Landing Page Generator (landgen)

**Convert markdown resumes into beautiful HTML landing pages with a single command!**

A Python CLI tool that transforms your markdown resume into a professional, responsive website ready for deployment. No coding required - just write your resume in markdown and generate a stunning landing page.

## ✨ Features

- 🎨 **Beautiful, responsive design** - Works perfectly on desktop and mobile
- 📝 **Smart markdown parsing** - Automatically extracts contact info, sections, and content
- ⚡ **One-command generation** - `landgen generate resume.md` creates your website
- 🎯 **Professional styling** - Modern CSS with clean typography and layout
- 📱 **Mobile-first responsive** - Looks great on all device sizes
- 🖨️ **Print-friendly** - Optimized for PDF generation and printing
- 💼 **Contact integration** - Extracts email, phone, GitHub, LinkedIn automatically

## � Quick Start

1. **Install landgen**:
   ```bash
   pip install landgen
   ```

2. **Create your resume** in markdown format (see [resume.md](resume.md) for example)

3. **Generate your landing page**:
   ```bash
   landgen generate resume.md
   ```

4. **Open the generated HTML file** in your browser - you're done! 🎉

## 📦 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Install from PyPI (Coming Soon)
```bash
pip install landgen
```

### Install for Development
```bash
# Clone this repository
git clone https://github.com/AsimMerchant/my_own_landing.git
cd my_own_landing

# Install in development mode
pip install -e .
```

### Verify Installation
```bash
landgen --help
```

You should see the landgen help message with available commands.

## 💻 Usage

### Basic Commands

```bash
# Generate HTML from markdown resume
landgen generate resume.md

# Generate with custom output filename  
landgen generate resume.md --output my_website.html

# Preview parsed resume data (for debugging)
landgen preview resume.md

# Show help
landgen --help
```

### Example Workflow

1. **Create your resume** (`my_resume.md`):
   ```markdown
   # John Doe
   
   john@email.com | (555) 123-4567 | https://github.com/johndoe | https://linkedin.com/in/johndoe
   
   ## Experience
   
   ### Software Engineer | ABC Company | 2020-Present
   - Built amazing web applications
   - Led team of 5 developers
   
   ## Skills
   - Python, JavaScript, React
   - Docker, AWS, CI/CD
   ```

2. **Generate your landing page**:
   ```bash
   landgen generate my_resume.md
   ```

3. **Result**: Beautiful `my_resume.html` file ready to deploy!

## 📝 Resume Format

Your markdown resume should follow this structure:

### Required Elements
- **Header**: `# Your Name` (first line)
- **Contact Info**: Email, phone, links separated by `|` (second section)
- **Sections**: Use `## Section Name` for main sections

### Contact Information Format
```markdown
email@example.com | (555) 123-4567 | https://github.com/username | https://linkedin.com/in/username
```

The tool automatically detects and formats:
- 📧 Email addresses  
- 📞 Phone numbers
- 💻 GitHub profiles
- 💼 LinkedIn profiles
- 🌐 Personal websites

### Example Structure
```markdown
# Your Name

contact@email.com | phone | github | linkedin

## Areas of interest

- Technology interests, specializations, domains of expertise

## Industry Experience

### Company Name Location | Position Title | Date Range

**Brief Description:** Overview of role and responsibilities

**Projects (Technology Stack):**
- **Project Name**: Detailed description with technologies and achievements

## Skills

- **Programming**: **Python (5 years)**, **JavaScript (3 years)**
- **Frameworks**: **React (2 years)**, **Django (3 years)**
- **Tools**: **Docker (2 years)**, **AWS (1 year)**
```

For a complete example, see [resume.md](resume.md) in this repository.
## �️ Technical Details

### Built With
- **Python 3.8+** - Core language and parsing logic
- **Jinja2** - Templating engine for HTML generation  
- **Click** - Professional CLI interface framework
- **Regex** - Smart contact information extraction
- **CSS Grid/Flexbox** - Modern responsive layout system

### Architecture
```
landgen/
├── parser/
│   └── resume_parser.py    # Markdown parsing and data extraction
├── templates/
│   ├── template_engine.py  # Jinja2 HTML generation 
│   └── resume.html         # Beautiful responsive template
└── cli.py                  # Command-line interface
```

### Generated Output Features
- **Responsive Design** - Mobile-first layout that works on all screen sizes
- **Professional Styling** - Clean typography with proper hierarchy
- **Contact Integration** - Automatic email/phone/social links with icons  
- **Print Optimization** - CSS optimized for PDF generation
- **Semantic HTML** - Proper structure for accessibility and SEO

## 🎨 Output Examples

### Generated HTML Features
- **Clean Header Section** - Name and title prominently displayed
- **Contact Bar** - Email, phone, GitHub, LinkedIn with intuitive icons
- **Professional Sections** - Experience, skills, areas of interest cleanly formatted  
- **Responsive Layout** - Adapts beautifully to desktop, tablet, and mobile
- **Print Ready** - Optimized CSS for clean PDF generation

### Sample Output
When you run `landgen generate resume.md`, you get a professional HTML page with:
- Modern typography using system fonts
- Responsive grid layout  
- Professional color scheme
- Proper spacing and visual hierarchy
- Contact information with clickable links
- Mobile-optimized design

## 🐛 Troubleshooting

### Common Issues

**Error: "Template not found"**
```bash
# Make sure you're in the right directory
cd /path/to/your/resume

# Or specify full path
landgen generate /full/path/to/resume.md
```

**Error: "ResumeParser not found"** 
```bash
# Reinstall landgen
pip uninstall landgen
pip install landgen
```

**Contact info not parsing correctly**
- Make sure contact info is on one line separated by `|`
- Example: `email@example.com | (555) 123-4567 | https://github.com/username`

**Sections not appearing**
- Use `## Section Name` format for section headers
- Make sure there's no content before the first `##` section

### Getting Help
- Check the example [resume.md](resume.md) for proper formatting
- Use `landgen preview resume.md` to see how your resume is being parsed
- Open an issue on GitHub if you find bugs

## 🚀 Deployment

Your generated HTML file is ready to deploy anywhere! Here are some popular options:

### GitHub Pages (Free)
```bash
# Create a new repository on GitHub
# Upload your generated HTML file as index.html
# Enable GitHub Pages in repository settings
```

### Netlify (Free)
1. Drag and drop your HTML file to [netlify.com/drop](https://netlify.com/drop)
2. Get instant live URL - no account required!

### Vercel (Free)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy your HTML file  
vercel --name my-resume
```

### Traditional Web Hosting
Upload the generated HTML file to any web host via FTP/SSH. The file is completely self-contained with embedded CSS.

## 📚 Documentation

### Additional Resources
- **[RESUME_TEMPLATE.md](RESUME_TEMPLATE.md)** - Detailed resume format specification
- **[resume.md](resume.md)** - Complete example resume  
- **[PROJECT_PLAN.md](PROJECT_PLAN.md)** - Development roadmap and architecture
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical system design

### Development
If you want to contribute or modify landgen:

```bash
# Clone the repository  
git clone https://github.com/AsimMerchant/my_own_landing.git
cd my_own_landing

# Install development dependencies
pip install -e .

# Run tests
pytest

# Make changes to src/landgen/
# Test your changes
landgen generate resume.md
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Ways to Contribute
- 🐛 **Report bugs** - Open an issue with details
- 💡 **Suggest features** - Ideas for new templates or functionality  
- 📝 **Improve docs** - Help make instructions clearer
- 🎨 **Add templates** - Create new design themes
- 🧪 **Write tests** - Help improve reliability

### Development Setup
```bash
git clone https://github.com/AsimMerchant/my_own_landing.git
cd my_own_landing
pip install -e .
pytest  # Run tests
```

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🌟 Future Features

### Coming Soon
- 🎨 **Multiple themes** - Different color schemes and layouts
- 📄 **PDF export** - Direct resume to PDF conversion  
- ⚙️ **Configuration files** - Customize colors, fonts, and layout
- 🌐 **Web interface** - Browser-based resume builder
- 📱 **Social media cards** - Auto-generate sharing images

### Ideas Welcome!
Have an idea for landgen? [Open an issue](https://github.com/AsimMerchant/my_own_landing/issues) and let's discuss it!

---

**Made with ❤️ by [Asim Merchant](https://github.com/AsimMerchant)**

*Transform your markdown resume into a beautiful website in seconds!*
- 📋 Implement configuration system
- 📋 Create comprehensive test suite
- 📋 Package for PyPI distribution

### Long Term (Q2+ 2026)
- 📋 Web-based generator interface
- 📋 Multiple template designs
- 📋 Integration with LinkedIn/GitHub APIs
- 📋 Enterprise features and customization

## 💡 Use Cases

### For Developers
- **Job Seekers**: Create professional portfolios quickly
- **Freelancers**: Generate client-ready websites
- **Students**: Build impressive graduation portfolios
- **Career Changers**: Professional web presence in minutes

### For Organizations
- **Recruiting Agencies**: Standardized candidate presentations
- **Universities**: Student portfolio generation
- **Companies**: Employee showcase pages
- **Training Programs**: Graduate portfolio creation

## 🔗 Related Resources

### Documentation
- [Project Plan](PROJECT_PLAN.md) - Complete development roadmap
- [Architecture Guide](ARCHITECTURE.md) - Technical system design
- [Resume Template](RESUME_TEMPLATE.md) - Markdown format specification

### External Resources
- [Markdown Guide](https://www.markdownguide.org/) - Learn markdown syntax
- [Jinja2 Documentation](https://jinja.palletsprojects.com/) - Template engine docs
- [GitHub Pages](https://pages.github.com/) - Free static site hosting
- [Netlify](https://www.netlify.com/) - Modern web hosting platform

## � Support & Community

### Getting Help
- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Join project discussions for questions and ideas
- **Documentation**: Check existing docs before asking questions
- **Community**: Connect with other users and contributors

### Contact
- **Project Maintainer**: Asim Merchant (@AsimMerchant)
- **Email**: asimthatsme@gmail.com
- **GitHub**: [Project Repository](https://github.com/AsimMerchant/my-portfolio-website)
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

## 🔄 Recent Updates (September 2025)

### ✅ **Core Functionality Complete**
- **Enhanced Parser**: Now properly handles bullet points (`-`) and converts to HTML `<ul>/<li>`
- **Visual Fidelity**: Generated HTML now matches original portfolio design exactly
- **Template Improvements**: 
  - Fixed About section styling (`about-intro` class)
  - Areas of Interest now display as individual items with generic bullet icons  
  - Professional Experience timeline with proper bullet formatting
  - Dynamic terminal animation integration
- **User-Friendly**: Generic icons ensure compatibility with any user's interests
- **Production Ready**: Comprehensive testing completed, all major issues resolved

### 🎯 **What's Working Now**
All core features are fully functional:
- ✅ Markdown resume parsing with section detection
- ✅ Contact information extraction (email, phone, GitHub, LinkedIn)  
- ✅ Professional experience with bullet point support
- ✅ Areas of interest with comma-separated parsing
- ✅ Skills section processing
- ✅ Complete HTML generation with original assets
- ✅ CLI interface: `landgen generate resume.md --output mysite.html`

Feel free to fork this project and adapt it for your own portfolio. If you make improvements, consider sharing them back!

## 📞 Support

For questions or support, please contact:
- **Email**: asimthatsme@gmail.com
- **GitHub**: [@AsimMerchant](https://github.com/AsimMerchant)
- **LinkedIn**: [Asim Merchant](https://www.linkedin.com/in/asim-merchant-baaa0684/)

---

**Built with ❤️ by Asim Merchant**