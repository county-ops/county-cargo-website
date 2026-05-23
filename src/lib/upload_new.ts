require('dotenv').config({ path: '.env.local' });
import { bulkImportData } from './user-actions';
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

async function upload() {
    try {
       const filePath = path.join(process.cwd(), 'demo', 'shipments_new.csv');
       const fileBuffer = fs.readFileSync(filePath);

       const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
       const sheetName = workbook.SheetNames[0];
       const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

       if (jsonData.length === 0) {
           console.log('File is empty.');
           return;
       }

       console.log(`Found ${jsonData.length} records to import.`);
       const result = await bulkImportData('shipments', jsonData);

       console.log(`Import complete. Success: ${result.success}, Errors: ${result.errors}`);

   } catch (error) {
       console.error('An error occurred during import:', error);
   }
}

upload();
