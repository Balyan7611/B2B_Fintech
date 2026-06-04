const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/B2B_Fintech/src/admin/components/ReportPages';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // 1. Add ExportButtons import if not exists
    if (!content.includes('ExportButtons')) {
        content = content.replace(/(import React.*?;\n)/, "$1import ExportButtons from '../../../shared/components/common/ExportButtons';\n");
        changed = true;
    }

    // 2. Replace the 5 buttons div with ExportButtons
    const exportDivRegex = /<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', flex: 1 }}>\s*<button className="global-export-btn btn-copy"[\s\S]*?<\/div>/;
    if (exportDivRegex.test(content)) {
        // Extract a default file name based on component name
        const prefix = file.replace('.jsx', '').toLowerCase();
        const exportComp = `<ExportButtons headers={[]} rows={[]} fileNamePrefix="${prefix}_report" sheetName="Report" />`;
        content = content.replace(exportDivRegex, exportComp);
        changed = true;
    }

    // 3. Update 'No transactions found' to 'No data available in table'
    if (content.includes('No transactions found')) {
        content = content.replace(/No transactions found/g, 'No data available in table');
        changed = true;
    }
    
    if (content.includes('No records found')) {
        content = content.replace(/No records found/g, 'No data available in table');
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
