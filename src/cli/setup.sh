#!/bin/bash

# Prompt the user for the parked path
read -p "Enter the full path of the parked directory where you want to create the project: " selected_path

# Ensure the path is not empty
if [[ -z "$selected_path" ]]; then
    echo "No path entered. Exiting."
    exit 1
fi

# Prompt for project name
read -p "Enter your project name: " project_name

# Check if project exists
PROJECT_PATH="$SELECTED_PATH/$project_name"
if [ -d "$PROJECT_PATH" ]; then
    echo "Project already exists in the selected path."
    exit 1
fi

# Install Laravel with certain flags
composer create-project --prefer-dist laravel/laravel "$PROJECT_PATH" # Add flags as needed

cd "$PROJECT_PATH"

# Install Composer dependencies
# Replace 'dependency1 dependency2' with actual dependencies
composer require dependency1 dependency2

# Install Node dependencies
# Replace 'dependency1 dependency2' with actual dependencies
npm install dependency1 dependency2

# Copy stubs
# Ensure to replace '/path/to/stubs' with the actual path to your stubs
cp /path/to/stubs/* "$PROJECT_PATH"

# Alter files (.env, .gitignore, etc.)
echo "NODE_ENV=development" >> .env
echo "/node_modules/" >> .gitignore
echo "/vendor/" >> .gitignore
# Add other file modifications as needed

# Git commit
git init
git add .
git commit -m "Initial commit with setup script"

echo "Setup completed."