#!/usr/bin/env python3
"""Setup and development helper script for landgen."""

import subprocess
import sys
import os
from pathlib import Path


def run_command(cmd: str, description: str) -> bool:
    """Run a shell command and return success status."""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Command: {cmd}")
        print(f"Error: {e.stderr}")
        return False


def setup_dev_environment():
    """Set up development environment."""
    print("🚀 Setting up landgen development environment...\n")
    
    # Check if we're in a virtual environment
    if sys.prefix == sys.base_prefix:
        print("⚠️  Warning: You're not in a virtual environment.")
        print("It's recommended to create one first:")
        print("  python -m venv venv")
        print("  venv\\Scripts\\activate  # On Windows")
        print("  source venv/bin/activate  # On Unix\n")
    
    # Install in editable mode
    success = run_command(
        "pip install -e .", 
        "Installing landgen in editable mode"
    )
    
    if success:
        print("\n🎉 Setup complete! You can now use:")
        print("  landgen --help")
        print("  landgen generate resume.md")
        print("  landgen preview resume.md")


def install_deps():
    """Install dependencies only."""
    print("📦 Installing dependencies...\n")
    run_command("pip install -r requirements.txt", "Installing requirements")


def test_installation():
    """Test that the installation works."""
    print("🧪 Testing installation...\n")
    
    # Test CLI import
    try:
        from landgen import cli
        print("✅ CLI import successful")
    except ImportError as e:
        print(f"❌ CLI import failed: {e}")
        return False
    
    # Test parser
    try:
        from landgen.parser import ResumeParser
        parser = ResumeParser()
        print("✅ ResumeParser import and creation successful")
    except ImportError as e:
        print(f"❌ ResumeParser import failed: {e}")
        return False
    
    # Test template engine (may fail if Jinja2 not installed)
    try:
        from landgen.templates import TemplateEngine
        print("✅ TemplateEngine import successful")
    except ImportError as e:
        print(f"⚠️  TemplateEngine import failed (install dependencies): {e}")
    
    print("\n🎉 Basic tests passed!")
    return True


def main():
    """Main setup function."""
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == "deps":
            install_deps()
        elif command == "test":
            test_installation()
        elif command == "help":
            print("landgen setup commands:")
            print("  python setup_dev.py       - Full setup (install + deps)")
            print("  python setup_dev.py deps  - Install dependencies only")
            print("  python setup_dev.py test  - Test installation")
            print("  python setup_dev.py help  - Show this help")
        else:
            print(f"Unknown command: {command}")
            print("Use 'python setup_dev.py help' for available commands")
    else:
        setup_dev_environment()


if __name__ == "__main__":
    main()