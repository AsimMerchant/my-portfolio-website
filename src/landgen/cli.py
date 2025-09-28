"""Command Line Interface for landgen.

Provides CLI commands for generating landing pages from resume files.
"""

import click
from pathlib import Path
from .parser import ResumeParser
from .templates import TemplateEngine


@click.group()
@click.version_option(version="0.1.0")
def cli():
    """Landing page generator - Convert markdown resumes to HTML pages."""
    pass


@cli.command()
@click.argument('resume_file', type=click.Path(exists=True, path_type=Path))
@click.option('--output', '-o', type=click.Path(path_type=Path), 
              help='Output HTML file path')
@click.option('--template', '-t', default='resume.html',
              help='Template to use (default: resume.html)')
def generate(resume_file: Path, output: Path, template: str):
    """Generate HTML landing page from markdown resume file.
    
    RESUME_FILE: Path to markdown resume file to convert
    """
    try:
        # Parse the resume
        click.echo(f"Parsing resume: {resume_file}")
        parser = ResumeParser()
        data = parser.parse_file(str(resume_file))
        
        # Set default output if not provided
        if not output:
            output = resume_file.with_suffix('.html')
            
        # Generate HTML
        click.echo(f"Generating HTML with template: {template}")
        engine = TemplateEngine()
        engine.render_and_save(data, str(output), template)
        
        click.echo(f"✅ Landing page generated: {output}")
        
    except FileNotFoundError as e:
        click.echo(f"❌ Error: {e}", err=True)
        raise click.Abort()
    except Exception as e:
        click.echo(f"❌ Unexpected error: {e}", err=True)
        raise click.Abort()


@cli.command()
@click.argument('resume_file', type=click.Path(exists=True, path_type=Path))
def preview(resume_file: Path):
    """Preview parsed resume data structure.
    
    RESUME_FILE: Path to markdown resume file to preview
    """
    try:
        click.echo(f"Parsing resume: {resume_file}")
        parser = ResumeParser()
        data = parser.parse_file(str(resume_file))
        
        click.echo("\n📋 Parsed Resume Data:")
        click.echo("-" * 50)
        click.echo(f"Name: {data.get('name', 'N/A')}")
        click.echo(f"Title: {data.get('title', 'N/A')}")
        
        contact = data.get('contact', {})
        if contact:
            click.echo("\n📞 Contact Information:")
            for key, value in contact.items():
                click.echo(f"  {key.capitalize()}: {value}")
                
        if data.get('summary'):
            click.echo(f"\n📝 Summary: {data['summary'][:100]}...")
            
        sections = data.get('sections', [])
        if sections:
            click.echo(f"\n📚 Sections ({len(sections)}):")
            for section in sections:
                content_preview = section['content'][:80].replace('\n', ' ')
                click.echo(f"  • {section['title']}: {content_preview}...")
                
    except Exception as e:
        click.echo(f"❌ Error: {e}", err=True)
        raise click.Abort()


if __name__ == '__main__':
    cli()