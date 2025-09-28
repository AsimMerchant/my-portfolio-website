# 🚀 Landgen Usage Examples

Quick examples to get you started with landgen!

## 📝 Basic Usage

### 1. Simple Generation
```bash
# Create resume.html from resume.md
landgen generate resume.md
```

### 2. Custom Output Name
```bash
# Create custom filename
landgen generate resume.md --output my_website.html
landgen generate resume.md -o portfolio.html
```

### 3. Preview Before Generating
```bash
# Check how your resume will be parsed
landgen preview resume.md
```

## 📋 Sample Resume Formats

### Minimal Resume Example
```markdown
# Jane Smith

jane@email.com | (555) 123-4567 | https://github.com/janesmith

## Experience

### Software Engineer | Tech Corp | 2020-Present
Built web applications using React and Node.js

## Skills
- JavaScript, Python, React
- AWS, Docker, Git
```

### Complete Resume Example
```markdown
# John Developer

john.dev@email.com | (555) 987-6543 | https://github.com/johndev | https://linkedin.com/in/johndev | https://johndev.com

## Summary
Experienced full-stack developer with 5+ years building scalable web applications.

## Experience

### Senior Software Engineer | StartupXYZ | 2021-Present
- Led team of 4 developers building React/Node.js applications
- Improved app performance by 40% through optimization
- Implemented CI/CD pipeline reducing deployment time by 60%

### Software Engineer | BigTech Corp | 2019-2021
- Developed microservices handling 1M+ daily requests
- Collaborated with product team on feature specifications
- Mentored 3 junior developers

## Technical Skills
- **Languages**: JavaScript, Python, TypeScript, Java
- **Frontend**: React, Vue.js, HTML5, CSS3, Tailwind
- **Backend**: Node.js, Express, Django, Spring Boot
- **Database**: PostgreSQL, MongoDB, Redis
- **DevOps**: AWS, Docker, Kubernetes, Jenkins

## Education

### Bachelor of Computer Science | University of Tech | 2015-2019
- Graduated Magna Cum Laude (3.8 GPA)
- Relevant Coursework: Data Structures, Algorithms, Software Engineering
```

## 🛠 Workflow Examples

### Daily Development Workflow
```bash
# 1. Edit your resume
vim resume.md

# 2. Preview changes
landgen preview resume.md

# 3. Generate updated HTML
landgen generate resume.md

# 4. Open in browser to review
start resume.html  # Windows
open resume.html   # macOS
xdg-open resume.html  # Linux
```

### Deployment Workflow  
```bash
# 1. Generate your landing page
landgen generate resume.md -o index.html

# 2. Deploy to GitHub Pages
git add index.html
git commit -m "Update landing page"
git push origin main

# 3. Or upload to Netlify
# Simply drag index.html to netlify.com/drop
```

## 🎨 Customization Tips

### Contact Information Tips
```markdown
# ✅ Good - Clear contact info
email@example.com | (555) 123-4567 | https://github.com/username | https://linkedin.com/in/username

# ❌ Avoid - Mixed formats  
Email: email@example.com
Phone: 555-123-4567
GitHub: username
```

### Section Organization Tips
```markdown
# ✅ Good - Clear hierarchy
## Experience
### Job Title | Company | Dates
Job description here.

### Previous Job | Previous Company | Dates  
Previous job description.

## Skills
Technical skills list here.

# ❌ Avoid - Inconsistent structure
## Experience
Job Title at Company (Dates)
Description

### Different Format Job
Description
```

## 🐛 Common Issues & Solutions

### Issue: "Template not found"
**Problem**: Running landgen from wrong directory
**Solution**:
```bash
# Option 1: Navigate to resume directory
cd /path/to/your/resume
landgen generate resume.md

# Option 2: Use full path
landgen generate /path/to/your/resume.md
```

### Issue: Contact info not displaying
**Problem**: Incorrect contact format
**Solution**:
```markdown
# ✅ Correct format (single line, pipe separated)
email@example.com | (555) 123-4567 | https://github.com/username

# ❌ Incorrect (multiple lines)
email@example.com
(555) 123-4567
https://github.com/username
```

### Issue: Sections not appearing  
**Problem**: Missing `##` section headers
**Solution**:
```markdown
# ✅ Correct
## Experience
Content here

## Skills  
Content here

# ❌ Incorrect (single #)
# Experience
Content here
```

### Issue: Installation problems
**Problem**: Package conflicts or missing dependencies
**Solution**:
```bash
# Clean reinstall
pip uninstall landgen
pip install landgen

# Or for development
pip install -e .
```

## 🚀 Advanced Examples

### Multiple Sections
```markdown
# Your Name
contact@email.com | phone | github | linkedin

## Summary
Professional summary here.

## Experience
Work experience here.

## Projects
Personal/side projects here.

## Technical Skills
Programming languages and tools.

## Certifications
Professional certifications.

## Education
Educational background.

## Publications
Papers, articles, blog posts.

## Awards
Professional recognition.
```

### Rich Content Formatting
```markdown
## Experience

### Senior Software Engineer | Amazing Company | Jan 2020 - Present
**Key Achievements:**
- Increased system performance by 50% through database optimization
- Led migration to microservices architecture serving 10M+ users
- **Technologies**: React, Node.js, PostgreSQL, AWS, Docker

**Major Projects:**
- **Project Alpha**: Real-time analytics dashboard processing 1TB+ daily
- **Project Beta**: Mobile API supporting iOS/Android apps (500K+ users)
```

---

**💡 Tip**: Use `landgen preview resume.md` to see exactly how your resume will be parsed before generating the final HTML!