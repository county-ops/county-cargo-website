
'use server';

import { bulkImportData } from './src/lib/user-actions';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

// This function will be called from a runner script
async function upload() {
    try {
        const filePath = path.join(process.cwd(), 'demo', 'users.csv');
        console.log(`Attempting to read file from: ${filePath}`);
        
        if (!fs.existsSync(filePath)) {
            console.error(`Error: File not found at ${filePath}. Please ensure the file exists in the 'demo' directory at the root of your project.`);
            return;
        }

        const fileBuffer = fs.readFileSync(filePath);

        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        if (jsonData.length === 0) {
            console.log('File is empty. No data to import.');
            return;
        }

        console.log(`Found ${jsonData.length} records in the file. Starting import...`);
        const result = await bulkImportData('users', jsonData);

        console.log(`\n--- Import Complete ---`);
        console.log(`Successfully imported: ${result.success} records`);
        console.log(`Skipped (duplicate email): ${result.skipped} records`);
        console.log(`Failed to import: ${result.errors} records`);
        console.log(`-----------------------\n`);


    } catch (error) {
        console.error('An unexpected error occurred during the import process:', error);
    }
}

upload();
