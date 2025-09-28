# Resume Template Specification

## 📝 Overview

This document defines the standardized markdown format that resumes must follow to be properly parsed by the Landing Page Generator tool. The format is based on the reference resume structure and optimized for automatic data extraction.

---

## 🏗️ Required Structure

### File Format
- **Extension**: `.md` (Markdown)
- **Encoding**: UTF-8
- **Line Endings**: LF or CRLF (both supported)

### Document Structure
```markdown
# [Full Name]

[Contact Line: Phone | Email | GitHub | LinkedIn | Portfolio]

## Areas of interest

· [Comma-separated list of technical interests and specializations]

## Industry Experience

### [Company Name] [Location] | [Position Title] | [Start Date] – [End Date]

**Brief Description:** [1-2 sentence overview of role and responsibilities]

**Projects ([Technologies]):**
- **[Project Name]**: [Detailed description of project, technologies used, and achievements]
- **[Another Project]**: [Description...]

[Repeat for each company...]

## Skills

- **[Skill Category]**: **[Skill Name] ([X years])**, [Other skills...]

[Additional skill categories as bullet points...]
```

---

## 📋 Detailed Field Specifications

### 1. Header Section

#### Full Name (Required)
```markdown
# Asim Merchant
```
- **Format**: H1 heading (`#`)
- **Content**: First and last name
- **Position**: First line of document
- **Extraction**: Used for page title, meta tags, and hero section

#### Contact Information (Required)
```markdown
9724882198 | asimthatsme@gmail.com | https://github.com/AsimMerchant | https://www.linkedin.com/in/asim-merchant-baaa0684/
```
- **Format**: Single line with pipe (`|`) separators
- **Required Fields**: Phone, Email, GitHub URL, LinkedIn URL
- **Optional Fields**: Portfolio URL, Twitter, personal website
- **Position**: Immediately after name
- **Extraction**: Used for contact section and social media links

### 2. Areas of Interest (Required)

```markdown
## Areas of interest

- Java, Android Development, Embedded Systems Design, RTOS, Machine Learning, Internet of things (IoT).
```
- **Format**: H2 heading followed by bullet point list
- **Content**: Technical interests, specializations, domains of expertise
- **Usage**: Hero section tagline and about section content

### 3. Industry Experience (Required)

#### Company Entry Format
```markdown
### [Company Name] [Location] | [Position] | [Date Range]

**Brief Description:** [Overview of role and company]

**Projects ([Technology Stack]):**
- **[Project Name]**: [Detailed description with technologies and achievements]
```

**Field Details**:
- **Company Name**: Full company name
- **Location**: City and/or state
- **Position**: Job title
- **Date Range**: `MONTH YEAR – MONTH YEAR` or `MONTH YEAR – Present`
- **Brief Description**: 1-2 sentences about role and company context
- **Projects**: Bulleted list with bold project names and detailed descriptions

**Technology Stack Format**:
- Include in parentheses after "Projects"
- Example: `**Projects (C, Python, FreeRTOS):**`

### 4. Skills (Required)

```markdown
## Skills

- **Programming**: **Python (5 years)**, **CPP (4 years)**, **C programming (7 years)**
- **Software**: Vivado **(3 years)**, SDx/Vitis **(3 years)**
- **Embedded Platforms**: **ARM** (Xilinx **(3 years)**), TI, Renesas
```

**Format Rules**:
- H2 section heading "Skills"
- Bullet points using `-` (hyphen) for each skill category
- Bold formatting for categories and individual skills
- Years of experience in parentheses for key skills
- Multi-line bullet content is supported and will be properly combined



---

## 🎯 Parsing Rules & Guidelines

### Text Formatting
- **Bold text** (`**text**`): Used for emphasis, skill names, project names
- *Italic text* (`*text*`): Used for additional emphasis
- `Code text` (`` `text` ``): Preserved for technical terms
- Regular text: Standard content

### Special Characters
- **Bullet Points**: Use `-` (hyphen)
- **Separators**: Use `|` (pipe) for contact info and education entries
- **Date Ranges**: Use `–` (en dash) or `-` (hyphen)
- **Parentheses**: Use for years of experience and technology stacks

### Section Ordering
1. Name (H1)
2. Contact Information  
3. Areas of Interest (H2)
4. Industry Experience (H2)
5. Skills (H2)

### Content Guidelines
- **Concise Language**: Clear, professional descriptions
- **Action Words**: Use strong verbs for project descriptions
- **Quantifiable Results**: Include metrics and achievements when possible
- **Technical Accuracy**: Correct spelling of technologies and tools
- **Consistent Formatting**: Follow the same style throughout

---

## ✅ Validation Rules

### Required Sections
- [ ] Name header (H1)
- [ ] Contact information line
- [ ] Areas of interest section
- [ ] Industry experience section
- [ ] Skills section

### Format Validation
- [ ] Proper markdown heading hierarchy
- [ ] Contact info contains email and at least one social link
- [ ] Experience entries have company, position, and date range
- [ ] Skills section includes technical subsection
- [ ] Education entries follow institution | year | program format

### Content Validation
- [ ] No empty required sections
- [ ] Valid email format in contact info
- [ ] Valid URL formats for social links
- [ ] Consistent date formatting
- [ ] No malformed markdown syntax

---

## 🔧 Common Issues & Solutions

### Issue: Missing Section Headers
**Problem**: Parser can't find required sections
**Solution**: Ensure exact heading text matches specification

### Issue: Malformed Contact Line
**Problem**: Contact information not parsed correctly
**Solution**: Use pipe separators and include all required fields

### Issue: Inconsistent Date Formats
**Problem**: Date parsing fails
**Solution**: Use consistent `MONTH YEAR – MONTH YEAR` format

### Issue: Technology Stack Not Extracted
**Problem**: Project technologies not identified
**Solution**: Include technologies in parentheses after "Projects:"

### Issue: Skills Not Properly Categorized
**Problem**: Skills section parsing incomplete
**Solution**: Follow exact bullet point and bold formatting rules

---

## 📝 Examples

### Minimal Valid Resume
```markdown
# John Doe

555-0123 | john.doe@email.com | https://github.com/johndoe | https://linkedin.com/in/johndoe

## Areas of interest

· Web Development, JavaScript, React, Node.js

## Industry Experience

### Tech Company Inc. San Francisco | Software Developer | JAN 2022 – Present

**Brief Description:** Full-stack developer building web applications.

**Projects (JavaScript, React, Node.js):**
- **E-commerce Platform**: Built responsive shopping cart with React and Express backend

## Skills & Abilities (Years of Experience)

### TECHNICAL

· **Programming**: **JavaScript (3 years)**, **Python (2 years)**

## Education and Certifications

### BACHELOR OF COMPUTER SCIENCE | 2021 | STATE UNIVERSITY

· 3.8 GPA
```

### Complex Resume Example
```markdown
# Jane Smith

+1-555-0199 | jane.smith@email.com | https://github.com/janesmith | https://linkedin.com/in/jane-smith | https://janesmith.dev

## Areas of interest

· Machine Learning, Data Science, Python Development, Cloud Computing, DevOps

## Industry Experience

### Google LLC Mountain View | Senior ML Engineer | MAR 2023 – Present

**Brief Description:** Lead machine learning engineer developing recommendation systems for YouTube with 2B+ users.

**Projects (Python, TensorFlow, Kubernetes, GCP):**
- **Video Recommendation Engine**: Redesigned ML pipeline improving user engagement by 15% using deep learning and collaborative filtering
- **Model Deployment Platform**: Built automated ML model deployment system handling 10M+ predictions per second

### Netflix Los Gatos | Data Scientist | JUN 2021 – FEB 2023

**Brief Description:** Developed personalization algorithms and A/B testing frameworks for content recommendations.

**Projects (Python, Scala, Spark, AWS):**
- **Content Personalization**: Created multi-armed bandit algorithms for content ranking, increasing view completion by 12%
- **A/B Testing Framework**: Built statistical testing platform used by 50+ product teams

## Skills & Abilities (Years of Experience)

### TECHNICAL

· **Programming**: **Python (6 years)**, **Scala (3 years)**, **R (4 years)**, SQL **(5 years)**
· **ML/AI**: **TensorFlow (4 years)**, **PyTorch (3 years)**, **Scikit-learn (5 years)**
· **Cloud**: **AWS (4 years)**, **GCP (3 years)**, **Docker (3 years)**, **Kubernetes (2 years)**
· **Data**: **Spark (3 years)**, **Hadoop (2 years)**, **Kafka (2 years)**

### SOFT SKILLS

· **Leadership**: Team management, mentoring, technical strategy
· **Communication**: Technical writing, presentations, stakeholder management

## Education and Certifications

### PH.D. IN COMPUTER SCIENCE | 2021 | STANFORD UNIVERSITY

· Machine Learning Specialization, 3.9 GPA

### AWS CERTIFIED MACHINE LEARNING SPECIALTY | 2022 | AMAZON WEB SERVICES

· Professional certification

### B.S. IN MATHEMATICS | 2017 | MIT

· Magna Cum Laude, 3.8 GPA

## Publications

· Research paper "Deep Learning for Recommendation Systems" published in ICML 2022 conference, team of 6 researchers
· Technical blog post "Scaling ML Pipelines" on Medium with 10K+ views
```

---

## 🔄 Version History

- **v1.0** (September 2025): Initial specification based on reference resume
- **Future**: Will be updated based on user feedback and parser improvements

---

*This specification ensures consistent, parseable resume formats for optimal landing page generation.*