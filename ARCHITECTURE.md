# Technical Architecture Document

## 🏗️ System Overview

The Landing Page Generator is a Python-based tool that transforms markdown resumes into professional landing pages using a template-driven approach. The system follows a modular architecture with clear separation of concerns.

---

## 📐 Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Input Layer   │    │  Processing     │    │  Output Layer   │
│                 │    │    Layer        │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Markdown    │ │───▶│ │ Resume      │ │───▶│ │ Static      │ │
│ │ Resume      │ │    │ │ Parser      │ │    │ │ Website     │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │         │       │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ Config      │ │───▶│ │ Template    │ │───▶│ │ Assets      │ │
│ │ File        │ │    │ │ Engine      │ │    │ │ (CSS/JS)    │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
│                 │    │         │       │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │ CLI         │ │───▶│ │ Assets      │ │───▶│ │ SEO Meta    │ │
│ │ Arguments   │ │    │ │ Manager     │ │    │ │ Tags        │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 🧩 Core Components

### 1. Resume Parser Module

**Purpose**: Extract structured data from markdown resume files

**Key Classes**:
```python
class ResumeParser:
    def parse_markdown(self, file_path: str) -> ResumeData
    def extract_header(self, content: str) -> PersonalInfo
    def extract_experience(self, content: str) -> List[WorkExperience]
    def extract_skills(self, content: str) -> Skills
    def extract_education(self, content: str) -> List[Education]
    
class ResumeData:
    personal_info: PersonalInfo
    areas_of_interest: List[str]
    work_experience: List[WorkExperience]
    skills: Skills
    education: List[Education]
    publications: List[Publication]
```

**Data Structures**:
```python
@dataclass
class PersonalInfo:
    full_name: str
    phone: str
    email: str
    github_url: str
    linkedin_url: str
    portfolio_url: Optional[str] = None

@dataclass
class WorkExperience:
    company: str
    location: str
    position: str
    start_date: str
    end_date: str
    description: str
    projects: List[Project]
    technologies: List[str]

@dataclass
class Project:
    name: str
    description: str
    technologies: List[str]

@dataclass
class Skills:
    technical: Dict[str, List[Skill]]
    soft_skills: Optional[List[str]] = None

@dataclass
class Skill:
    name: str
    years_experience: Optional[int] = None
```

### 2. Template Engine Module

**Purpose**: Generate HTML from templates and parsed data

**Key Classes**:
```python
class TemplateEngine:
    def __init__(self, template_dir: str)
    def render_page(self, resume_data: ResumeData, config: Config) -> str
    def load_template(self, template_name: str) -> Template
    def apply_theme(self, content: str, theme: Theme) -> str

class TemplateRenderer:
    def render_hero_section(self, personal_info: PersonalInfo) -> str
    def render_experience_section(self, experience: List[WorkExperience]) -> str
    def render_skills_section(self, skills: Skills) -> str
    def render_education_section(self, education: List[Education]) -> str
```

**Template Structure**:
```
templates/
├── base.html                 # Main page template
├── components/
│   ├── hero.html            # Hero section component
│   ├── about.html           # About section component
│   ├── experience.html      # Work experience component
│   ├── skills.html          # Skills section component
│   ├── education.html       # Education component
│   └── contact.html         # Contact section component
└── themes/
    ├── default/
    │   ├── colors.css       # Color variables
    │   └── layout.css       # Layout customizations
    └── dark/
        ├── colors.css
        └── layout.css
```

### 3. Assets Manager Module

**Purpose**: Handle static files, themes, and optimizations

**Key Classes**:
```python
class AssetsManager:
    def copy_assets(self, source_dir: str, target_dir: str) -> None
    def apply_theme(self, theme_config: Theme, target_dir: str) -> None
    def optimize_assets(self, target_dir: str) -> None
    def generate_manifest(self, site_info: SiteInfo, target_dir: str) -> None

class ThemeManager:
    def load_theme(self, theme_name: str) -> Theme
    def apply_color_scheme(self, css_content: str, colors: ColorScheme) -> str
    def customize_fonts(self, css_content: str, fonts: FontConfig) -> str
```

**Asset Pipeline**:
```
assets/
├── css/
│   ├── style.css           # Main stylesheet
│   ├── themes/             # Theme variations
│   └── components/         # Component-specific styles
├── js/
│   ├── script.js          # Main JavaScript
│   └── modules/           # Modular JS components
├── images/
│   ├── icons/             # Favicon and app icons
│   └── placeholder/       # Default profile images
└── fonts/                 # Custom web fonts
```

### 4. Configuration Manager

**Purpose**: Handle user configuration and customization options

**Configuration Schema**:
```yaml
# config.yaml
site:
  title: "{{name}} - Software Developer"
  description: "Professional portfolio of {{name}}"
  keywords: ["developer", "software", "portfolio"]

theme:
  name: "default"  # default, dark, minimal
  colors:
    primary: "#007acc"
    secondary: "#f8f9fa"
    accent: "#28a745"
    text: "#333333"
    background: "#ffffff"
  
  fonts:
    primary: "Inter"
    heading: "Inter"
    mono: "JetBrains Mono"

layout:
  sections:
    - hero
    - about
    - experience
    - skills
    - education
    - contact
  
  hero:
    show_terminal: true
    typing_animation: true
    background_pattern: "circuit"

  contact:
    show_phone: true
    show_email: true
    show_github: true
    show_linkedin: true
    contact_form: false

seo:
  generate_sitemap: true
  generate_robots: true
  google_analytics: null
  open_graph: true

output:
  minify_css: true
  minify_js: true
  optimize_images: true
  generate_pwa: true
```

### 5. Command Line Interface

**Purpose**: Provide user-friendly command-line interaction

**CLI Structure**:
```python
class LandingPageGeneratorCLI:
    def generate(self, resume_path: str, output_dir: str, config_path: str) -> None
    def init_config(self, output_path: str) -> None
    def validate_resume(self, resume_path: str) -> ValidationResult
    def preview(self, resume_path: str, port: int) -> None

# Command examples:
# landgen generate resume.md ./output
# landgen generate resume.md ./output --config custom.yaml
# landgen init-config ./my-config.yaml
# landgen validate resume.md
# landgen preview resume.md --port 8080
```

---

## 🔄 Processing Pipeline

### 1. Input Processing
```
Markdown Resume → Parser → Structured Data
     ↓
Configuration File → Config Loader → Theme Settings
     ↓
CLI Arguments → Argument Parser → Generation Options
```

### 2. Data Transformation
```
Resume Data → Data Validator → Validated Data
     ↓
Template Selection → Template Loader → Jinja2 Templates
     ↓
Theme Application → Theme Engine → Styled Templates
```

### 3. Output Generation
```
Template Rendering → HTML Generator → Complete Website
     ↓
Asset Processing → Asset Manager → Optimized Assets
     ↓
SEO Generation → Meta Generator → Search-Optimized Output
```

---

## 🗄️ Data Flow Specification

### Input Data Types
1. **Markdown Resume**: Text file following specification
2. **Configuration File**: YAML with theme and layout settings
3. **CLI Parameters**: Command-line arguments and flags

### Internal Data Structures
1. **ResumeData**: Structured resume information
2. **Config**: User preferences and customizations
3. **Theme**: Visual styling and layout options

### Output Artifacts
1. **HTML Files**: Generated website pages
2. **CSS Files**: Styled and optimized stylesheets
3. **JavaScript Files**: Interactive functionality
4. **Assets**: Images, fonts, and other static files
5. **Meta Files**: manifest.json, robots.txt, sitemap.xml

---

## 🔧 Technology Stack

### Core Dependencies
```python
# requirements.txt
markdown>=3.4.0           # Markdown parsing
jinja2>=3.1.0            # Template engine
pyyaml>=6.0              # Configuration parsing
click>=8.0.0             # CLI framework
beautifulsoup4>=4.11.0   # HTML processing
cssmin>=0.2.0            # CSS minification
jsmin>=3.0.0             # JavaScript minification
pillow>=9.0.0            # Image processing
```

### Optional Dependencies
```python
# Optional features
watchdog>=2.1.0          # File watching for development
livereload>=2.6.0        # Live preview server
pytest>=7.0.0            # Testing framework
black>=22.0.0            # Code formatting
mypy>=0.910              # Type checking
```

### External Tools
- **Node.js**: For advanced asset processing (optional)
- **ImageOptim/TinyPNG**: Image optimization
- **Google Fonts API**: Font loading
- **CDN Services**: Font Awesome, external libraries

---

## 🔒 Security Considerations

### Input Validation
- **Markdown Sanitization**: Prevent XSS via malicious markdown
- **Path Traversal Protection**: Validate file paths and directories
- **Configuration Validation**: Ensure config values are safe
- **URL Validation**: Verify external links in contact info

### Output Security
- **HTML Escaping**: Proper escaping of user-generated content
- **CSP Headers**: Content Security Policy in generated sites
- **Safe File Operations**: Prevent directory traversal in output
- **Asset Integrity**: Verify integrity of copied assets

### Privacy
- **No Data Collection**: Tool doesn't send data externally
- **Local Processing**: All generation happens locally
- **Optional Analytics**: User controls Google Analytics inclusion

---

## 📊 Performance Specifications

### Generation Performance
- **Target Time**: < 5 seconds for typical resume
- **Memory Usage**: < 100MB peak usage
- **File Size**: Generated site < 2MB total
- **Concurrent Processing**: Support parallel asset processing

### Output Performance
- **Page Load**: < 3 seconds on 3G connection
- **First Paint**: < 1.5 seconds
- **Lighthouse Score**: > 90 for all metrics
- **Mobile Optimization**: Full responsive design

### Scalability
- **Batch Processing**: Handle multiple resumes
- **Large Resumes**: Support resumes with 50+ jobs/projects
- **Asset Optimization**: Automatic image compression
- **Caching**: Template and asset caching for speed

---

## 🧪 Testing Strategy

### Unit Testing
```python
# Test structure
tests/
├── test_parser.py          # Resume parsing tests
├── test_template_engine.py # Template rendering tests
├── test_assets_manager.py  # Asset handling tests
├── test_config_manager.py  # Configuration tests
└── test_cli.py            # Command-line interface tests
```

### Integration Testing
- End-to-end generation pipeline
- Template + data integration
- Asset processing workflow
- CLI command validation

### Test Data
```
test_data/
├── resumes/
│   ├── valid/              # Properly formatted resumes
│   ├── edge_cases/         # Unusual but valid formats
│   └── invalid/            # Malformed resumes for error testing
├── configs/                # Various configuration files
└── expected_outputs/       # Reference output for comparison
```

### Performance Testing
- Generation time benchmarks
- Memory usage profiling
- Output size validation
- Stress testing with large resumes

---

## 🔄 Error Handling Strategy

### Error Categories
1. **Input Errors**: Malformed markdown, missing files
2. **Configuration Errors**: Invalid YAML, unknown themes
3. **Template Errors**: Missing templates, rendering failures
4. **Asset Errors**: Missing files, processing failures
5. **Output Errors**: Permission issues, disk space

### Error Recovery
```python
class GenerationError(Exception):
    """Base exception for generation errors"""
    pass

class ParsingError(GenerationError):
    """Resume parsing failed"""
    pass

class TemplateError(GenerationError):
    """Template rendering failed"""
    pass

# Error handling example
try:
    resume_data = parser.parse_markdown(resume_path)
except ParsingError as e:
    logger.error(f"Failed to parse resume: {e}")
    # Provide helpful error message with line numbers
    # Suggest fixes based on common issues
```

### User-Friendly Messages
- Clear error descriptions
- Suggested fixes for common problems
- Line number references for parsing errors
- Links to documentation for complex issues

---

## 📈 Monitoring and Logging

### Logging Strategy
```python
import logging

# Configure logging levels
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('landgen.log'),
        logging.StreamHandler()
    ]
)

# Log key events
logger.info("Starting resume parsing...")
logger.debug("Extracted sections: {sections}")
logger.warning("Missing optional section: {section}")
logger.error("Failed to render template: {error}")
```

### Metrics Collection
- Generation time per resume
- Success/failure rates
- Common error patterns
- Template usage statistics
- Performance bottlenecks

---

## 🚀 Deployment Architecture

### Distribution Methods

#### 1. PyPI Package
```python
# setup.py configuration
setup(
    name="landing-page-generator",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[...],
    entry_points={
        'console_scripts': [
            'landgen=landgen.cli:main',
        ],
    },
)
```

#### 2. Standalone Executable
```bash
# PyInstaller build
pyinstaller --onefile --name landgen cli.py
# Results in single executable file
```

#### 3. Docker Container
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
ENTRYPOINT ["python", "-m", "landgen"]
```

### CI/CD Pipeline
```yaml
# GitHub Actions workflow
name: Build and Release
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: pytest
  
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build package
        run: python setup.py sdist bdist_wheel
      
      - name: Build executable
        run: pyinstaller landgen.spec
```

---

*This architecture provides a solid foundation for building a robust, maintainable, and extensible landing page generator tool.*