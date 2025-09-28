"""Resume Parser Module

Parses markdown resume files into structured data for template generation.
"""

import re
from typing import Dict, List, Any
from pathlib import Path


class ResumeParser:
    """Parse markdown resume files into structured data."""
    
    def __init__(self):
        """Initialize the resume parser."""
        self.data = {}
        
    def parse_file(self, file_path: str) -> Dict[str, Any]:
        """Parse a markdown resume file.
        
        Args:
            file_path: Path to the markdown resume file
            
        Returns:
            Dictionary containing parsed resume data
        """
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"Resume file not found: {file_path}")
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        return self.parse_content(content)
    
    def parse_content(self, content: str) -> Dict[str, Any]:
        """Parse resume content from markdown string.
        
        Args:
            content: Markdown content as string
            
        Returns:
            Dictionary containing parsed resume data
        """
        self.data = {
            'name': '',
            'title': '',
            'contact': {},
            'summary': '',
            'sections': []
        }
        
        lines = content.split('\n')
        current_section = None
        section_content = []
        header_parsed = False
        
        for i, line in enumerate(lines):
            stripped = line.strip()
            
            # Skip empty lines at start
            if not stripped and not current_section and not header_parsed:
                continue
                
            # Parse header (first non-empty line is name)
            if not self.data['name'] and stripped:
                self.data['name'] = stripped.lstrip('# ').strip()
                header_parsed = True
                continue
                
            # Parse contact information (lines after name, before first ##)
            if header_parsed and not current_section and stripped and not stripped.startswith('##'):
                # This is contact information
                if not self.data['contact']:
                    self.data['contact'] = self._parse_contact(stripped)
                    # Check next line for additional contact info
                    if i + 1 < len(lines) and lines[i + 1].strip() and not lines[i + 1].strip().startswith('##'):
                        next_line = lines[i + 1].strip()
                        additional_contact = self._parse_contact(next_line)
                        self.data['contact'].update(additional_contact)
                continue
            
            # Parse sections
            if stripped.startswith('## '):
                # Save previous section
                if current_section:
                    self._save_section(current_section, section_content)
                    
                # Start new section
                current_section = stripped[3:].strip()
                section_content = []
                continue
                
            # Add content to current section
            if current_section:
                section_content.append(line)
        
        # Save final section
        if current_section:
            self._save_section(current_section, section_content)
            
        return self.data
    
    def _save_section(self, title: str, content: List[str]) -> None:
        """Save a parsed section to the data structure.
        
        Args:
            title: Section title
            content: List of content lines
        """
        section_text = '\n'.join(content).strip()
        
        # Special handling for contact section
        if title.lower() == 'contact':
            self.data['contact'] = self._parse_contact(section_text)
        else:
            # Special processing for different sections
            if 'experience' in title.lower():
                processed_content = self._process_experience_section(section_text)
            elif 'interest' in title.lower() or 'area' in title.lower():
                # Keep Areas of interest as raw text for template processing
                processed_content = section_text.strip()
            else:
                processed_content = self._process_section_content(section_text, title)
            
            self.data['sections'].append({
                'title': title,
                'content': processed_content
            })
    
    def _process_section_content(self, content: str, section_title: str = '') -> str:
        """Process section content to convert markdown elements to HTML.
        
        Args:
            content: Raw section content
            section_title: Title of the section being processed
            
        Returns:
            Processed content with HTML formatting
        """
        lines = content.split('\n')
        processed_lines = []
        in_list = False
        
        # Don't convert ### to <h3> in Skills sections - they should remain as subheadings
        is_skills_section = 'skill' in section_title.lower()
        
        current_bullet_content = None
        
        for i, line in enumerate(lines):
            line_stripped = line.strip()
            
            # Convert ### job titles to <h3> tags only in Experience sections
            if line_stripped.startswith('### '):
                # Finish any current bullet
                if current_bullet_content:
                    bullet_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', current_bullet_content)
                    processed_lines.append(f'<li>{bullet_content}</li>')
                    current_bullet_content = None
                
                # Close any open list first
                if in_list:
                    processed_lines.append('</ul>')
                    in_list = False
                job_title = line_stripped[4:].strip()
                
                # Only convert to job header if it looks like job format (contains |) AND we're in experience section
                if '|' in job_title and 'experience' in section_title.lower():
                    processed_lines.append(f'<h3>{job_title}</h3>')
                elif is_skills_section:
                    # Keep as subheading in skills sections  
                    processed_lines.append(f'<h4>{job_title}</h4>')
                else:
                    # For other sections, keep the ### as is
                    processed_lines.append(line)
                    
            elif line_stripped.startswith('- '):
                # Finish previous bullet if exists
                if current_bullet_content:
                    bullet_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', current_bullet_content)
                    processed_lines.append(f'<li>{bullet_content}</li>')
                
                # Start new bullet point
                if not in_list:
                    processed_lines.append('<ul>')
                    in_list = True
                current_bullet_content = line_stripped[2:].strip()
                
            elif not line_stripped:
                # Empty line - finish current bullet if exists
                if current_bullet_content:
                    bullet_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', current_bullet_content)
                    processed_lines.append(f'<li>{bullet_content}</li>')
                    current_bullet_content = None
                
                # For Skills sections, keep the list open across empty lines
                # For other sections, close the list on empty lines
                if not is_skills_section and in_list:
                    processed_lines.append('</ul>')
                    in_list = False
                
                # Only add empty line if not in a skills section or not in a list
                if not is_skills_section or not in_list:
                    processed_lines.append('')
                
            else:
                # Check if this continues a bullet point or starts new content
                if in_list and current_bullet_content is not None:
                    # Continue current bullet
                    current_bullet_content += ' ' + line_stripped
                else:
                    # Finish any current bullet
                    if current_bullet_content:
                        bullet_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', current_bullet_content)
                        processed_lines.append(f'<li>{bullet_content}</li>')
                        current_bullet_content = None
                    
                    # Close list if we're in one
                    if in_list:
                        processed_lines.append('</ul>')
                        in_list = False
                    
                    # Convert **bold** text to <strong> tags
                    line = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', line)
                    processed_lines.append(line)
        
        # Finish any remaining bullet
        if current_bullet_content:
            bullet_content = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', current_bullet_content)
            processed_lines.append(f'<li>{bullet_content}</li>')
        
        # Close any remaining open list
        if in_list:
            processed_lines.append('</ul>')
        
        return '\n'.join(processed_lines)
    
    def _process_experience_section(self, content: str) -> str:
        """Process experience section to properly structure jobs with separate description and projects.
        
        Args:
            content: Raw experience section content
            
        Returns:
            Processed content with structured job entries
        """
        # Split content by job titles (### Company | Title | Date)
        jobs = content.split('### ')
        processed_jobs = []
        
        for job in jobs:
            if not job.strip():
                continue
                
            lines = job.strip().split('\n')
            if not lines:
                continue
                
            # First line is the job title
            job_title = lines[0].strip()
            
            # Skip if this doesn't look like a job title (no |)
            if '|' not in job_title:
                continue
                
            # Process the rest of the content
            job_content_lines = lines[1:]
            job_content = '\n'.join(job_content_lines)
            
            # Separate description and projects
            description_parts = []
            projects_parts = []
            in_projects = False
            
            for line in job_content_lines:
                if '**Projects' in line:
                    in_projects = True
                    projects_parts.append(line)
                elif in_projects:
                    projects_parts.append(line)
                else:
                    description_parts.append(line)
            
            # Process description and projects separately
            description_content = self._process_section_content('\n'.join(description_parts), 'experience')
            
            # Build the job structure
            job_html = f'<h3>{job_title}</h3>\n'
            
            if description_parts:
                job_html += f'<div class="job-description">{description_content}</div>\n'
            
            if projects_parts:
                projects_content = self._process_section_content('\n'.join(projects_parts), 'experience')
                job_html += f'<div class="job-projects">{projects_content}</div>\n'
            
            processed_jobs.append(job_html)
        
        return '\n'.join(processed_jobs)
    
    def _parse_contact(self, content: str) -> Dict[str, str]:
        """Parse contact information from content.
        
        Args:
            content: Contact content (can be single line with multiple items)
            
        Returns:
            Dictionary of contact information
        """
        contact = {}
        
        # Common patterns
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        phone_pattern = r'[\+]?[1-9]?[0-9]{3}[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}'
        
        # Extract email
        email_match = re.search(email_pattern, content)
        if email_match:
            contact['email'] = email_match.group()
            
        # Extract phone (improved pattern)
        phone_match = re.search(phone_pattern, content)
        if phone_match:
            contact['phone'] = phone_match.group()
            
        # Split by common separators and look for URLs and other info
        parts = re.split(r'[|,\n]', content)
        for part in parts:
            part = part.strip()
            if not part:
                continue
                
            # Check for GitHub
            if 'github.com' in part.lower():
                contact['github'] = part
            # Check for LinkedIn
            elif 'linkedin.com' in part.lower():
                contact['linkedin'] = part
            # Check for other URLs (website, portfolio, etc.)
            elif part.startswith(('http://', 'https://')) and 'github' not in part and 'linkedin' not in part:
                contact['website'] = part
            # Skip if it's already captured as phone or email
            elif part not in [contact.get('phone', ''), contact.get('email', '')]:
                # This might be location or other info
                if 'location' not in contact and not re.search(r'^\d+', part):
                    contact['location'] = part
                    
        return contact