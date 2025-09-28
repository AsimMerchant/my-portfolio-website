"""Template Engine Module

Generates HTML pages from parsed resume data using Jinja2 templates.
"""

from typing import Dict, Any, Optional
from pathlib import Path
import jinja2


class TemplateEngine:
    """Generate HTML pages from resume data using templates."""
    
    def __init__(self, template_dir: Optional[str] = None):
        """Initialize the template engine.
        
        Args:
            template_dir: Path to template directory. If None, uses default templates.
        """
        if template_dir:
            self.template_dir = Path(template_dir)
        else:
            # Use current directory where templates are stored
            self.template_dir = Path(__file__).parent
            
        self.env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(str(self.template_dir)),
            autoescape=jinja2.select_autoescape(['html', 'xml'])
        )
        
    def render_resume(self, data: Dict[str, Any], template_name: str = "resume.html") -> str:
        """Render resume data to HTML using specified template.
        
        Args:
            data: Parsed resume data dictionary
            template_name: Name of template file to use
            
        Returns:
            Rendered HTML string
        """
        try:
            template = self.env.get_template(template_name)
            return template.render(**data)
        except jinja2.TemplateNotFound:
            raise FileNotFoundError(f"Template not found: {template_name}")
        except jinja2.TemplateError as e:
            raise RuntimeError(f"Template rendering error: {e}")
            
    def save_html(self, html_content: str, output_path: str) -> None:
        """Save HTML content to file.
        
        Args:
            html_content: Rendered HTML content
            output_path: Path where to save the HTML file
        """
        output = Path(output_path)
        output.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output, 'w', encoding='utf-8') as f:
            f.write(html_content)
            
    def render_and_save(self, data: Dict[str, Any], output_path: str, 
                       template_name: str = "resume.html") -> None:
        """Render resume and save to file in one step.
        
        Args:
            data: Parsed resume data dictionary
            output_path: Path where to save the HTML file
            template_name: Name of template file to use
        """
        html = self.render_resume(data, template_name)
        self.save_html(html, output_path)