import {promises as fs} from 'fs'
import path from 'path'

export default function utilityImportPlugin() {
    return {
        name: 'utility-import-plugin',
        async transform(code, id) {
            // Only transform the main.js file
            if (!id.endsWith('main.js')) return

            // Get the paths to the utilities and components directories
            const utilitiesDir = path.resolve(__dirname, 'src/utilities')
            const componentsDir = path.resolve(__dirname, 'src/components')

            // Get all utility and component file names
            const utilityFiles = await fs.readdir(utilitiesDir)
            const componentFiles = await fs.readdir(componentsDir)

            // Generate import and export statements for each utility and component file
            const importStatements = []
            const exportStatements = []

            for (const file of utilityFiles) {
                if (file.endsWith('.js')) {
                    const variableName = path.basename(file, '.js')
                    importStatements.push(
                        `import ${variableName} from './utilities/${file}';`
                    )
                    exportStatements.push(variableName)
                }
            }

            for (const file of componentFiles) {
                if (file.endsWith('.vue')) {
                    const variableName = path.basename(file, '.vue')
                    importStatements.push(
                        `import ${variableName} from './components/${file}';`
                    )
                    exportStatements.push(variableName)
                }
            }

            // Add import and export statements to the top of main.js
            const importCode = importStatements.join('\n')
            const exportCode = `export { ${exportStatements.join(', ')} };`
            return `${importCode}\n${exportCode}\n${code}`
        }
    }
}
