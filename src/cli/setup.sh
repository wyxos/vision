#!/bin/bash

# Pre-fill the variable with a default path, perhaps one that's commonly used
default_path="$HOME/Developer/wyxos/php/"
read -p "Enter the full path of the parked directory where you want to create the project [$default_path]: " selected_path
selected_path=${selected_path:-$default_path}

# Expand tilde to user's home directory
selected_path="${selected_path/#\~/$HOME}"

# Ensure the path is not empty
if [[ -z "$selected_path" ]]; then
    echo "No path entered. Exiting."
    exit 1
fi

# Ensure the path exists
if [ ! -d "$selected_path" ]; then
    echo "The provided path does not exist. Exiting."
    exit 1
fi

# Prompt for project name
read -p "Enter your project name: " project_name

# Full path for the new project
project_path="$selected_path/$project_name"

# Check if the project directory already exists
if [ -d "$project_path" ]; then
    while true; do
        read -p "A project with this name already exists. Do you want to override it? (y/n): " overwrite_choice
        case $overwrite_choice in
            [Yy]* )
                echo "Overriding project at $project_path."
                rm -rf "$project_path"
                break # Exit the loop after handling
                ;;
            [Nn]* )
                echo "Exiting without creating a new project."
                exit 1
                ;;
            * )
                echo "Please answer yes or no."
                ;;
        esac
    done
fi

# Proceed with creating and setting up the Laravel project
cd "$selected_path"

# Use 'laravel new' to create the project with additional flags as needed
laravel new $project_name --git --breeze --stack blade --verification --phpunit --branch="main" -n

cd "$project_path"

# Install Composer dependencies
# Replace 'dependency1 dependency2' with actual dependencies
#composer require dependency1 dependency2

# Install Node dependencies
# Replace 'dependency1 dependency2' with actual dependencies
#npm install dependency1 dependency2

# Copy stubs
# Ensure to replace '/path/to/stubs' with the actual path to your stubs
#cp /path/to/stubs/* "$PROJECT_PATH"

# Alter files (.env, .gitignore, etc.)
#echo "NODE_ENV=development" >> .env
#echo "/node_modules/" >> .gitignore
#echo "/vendor/" >> .gitignore
# Add other file modifications as needed

# Git commit
git init
git add .
git commit -m "Initial commit with setup script"

echo "Setup completed."

cd $project_path