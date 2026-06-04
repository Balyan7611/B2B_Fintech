const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/rampr/OneDrive/Desktop/B2B_Fintech/src/admin/components/KYCPages';

const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Add ExportButtons import if not exists
    if (!content.includes("import ExportButtons from")) {
        content = content.replace(/(import React.*?;\n)/, "$1import ExportButtons from '../../../shared/components/common/ExportButtons';\n");
        changed = true;
    }
    
    // Add FiDatabase if needed
    if (!content.includes('FiDatabase')) {
        if (content.includes('react-icons/fi')) {
            content = content.replace(/from\s+['"]react-icons\/fi['"]/, ", FiDatabase } from 'react-icons/fi'");
        } else {
            content = content.replace(/(import React.*?;\n)/, "$1import { FiDatabase } from 'react-icons/fi';\n");
        }
        changed = true;
    }

    // Replace the export buttons wrapper
    const exportRegex1 = /<div className=\{styles\.exportRow\}>[\s\S]*?<\/div>/;
    const exportRegex2 = /<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>\s*<button[\s\S]*?FaFileExcel[\s\S]*?<\/div>/;
    
    const prefix = file.replace('.jsx', '').toLowerCase();
    const exportComp = `<ExportButtons headers={[]} rows={[]} fileNamePrefix="${prefix}_report" sheetName="Report" />`;

    if (exportRegex1.test(content)) {
        content = content.replace(exportRegex1, exportComp);
        changed = true;
    } else if (exportRegex2.test(content)) {
        content = content.replace(exportRegex2, exportComp);
        changed = true;
    } else if (content.includes('FaFileExcel')) {
        const genericRegex = /<div[^>]*>(?:\s*<button[^>]*>.*?<\/button>\s*)*<button[^>]*>.*?FaFileExcel.*?<\/button>(?:\s*<button[^>]*>.*?<\/button>\s*)*<\/div>/g;
        content = content.replace(genericRegex, exportComp);
        changed = true;
    }

    // Replace Empty State
    const emptyStateReplacement = `
                  <td colSpan="12" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                      <FiDatabase style={{ fontSize: '1.5rem', opacity: 0.3 }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>No data available in table</span>
                    </div>
                  </td>`;
                  
    const emptyRegex1 = /<td colSpan="[^"]+" className=\{styles\.noData\}>[^<]*<\/td>/g;
    const emptyRegex2 = /<td colSpan=\{[^}]+\} className=\{styles\.noData\}>[^<]*<\/td>/g;
    
    if (emptyRegex1.test(content) || emptyRegex2.test(content)) {
        content = content.replace(emptyRegex1, emptyStateReplacement);
        content = content.replace(emptyRegex2, emptyStateReplacement);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
