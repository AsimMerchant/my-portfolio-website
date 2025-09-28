"""Landing Page Generator - Convert markdown resumes to professional websites."""

__version__ = "0.1.0"
__author__ = "Asim Merchant"
__email__ = "asimthatsme@gmail.com"

# Import modules only when needed to avoid dependency issues
__all__ = ['ResumeParser', 'TemplateEngine', 'cli']

def get_parser():
    """Get ResumeParser class."""
    from .parser import ResumeParser
    return ResumeParser

def get_template_engine():
    """Get TemplateEngine class (requires jinja2)."""
    from .templates import TemplateEngine
    return TemplateEngine

def get_cli():
    """Get CLI function (requires click)."""
    from .cli import cli
    return cli