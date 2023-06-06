import {promises as fs} from 'fs';
import path from 'path';

export default function utilityImportPlugin() {
    return {
        name: 'utility-import-plugin',
        async transform(code, id) {
            // Only transform the main.js file
            if (!id.endsWith('main.js')) return;

            // Get the path to the utilities directory
            const utilitiesDir = path.resolve(__dirname, 'src/utilities');

            // Get all utility file names
            const utilityFiles = await fs.readdir(utilitiesDir);

            // Generate import and export statements for each utility file
            const importStatements = [];
            const exportStatements = [];
            for (const file of utilityFiles) {
                if (file.endsWith('.js')) {
                    const variableName = path.basename(file, '.js');
                    importStatements.push(`import ${variableName} from './utilities/${file}';`);
                    exportStatements.push(variableName);
                }
            }

            // Add import and export statements to the top of main.js
            const importCode = importStatements.join('\n');
            const exportCode = `export { ${exportStatements.join(', ')} };`;
            return `${importCode}\n${exportCode}\n${code}`;
        },
    };
}