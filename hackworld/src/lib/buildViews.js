import fs from 'fs';
import appLib from './appLib';
import viewEngine from './viewEngine';
import viewContext from './viewContext';

const indexPath = `${appLib.publicPath()}/index.html`;

// Delete existing webpage file
try {
    fs.unlinkSync(indexPath);
    console.log("> Existing webpage file deleted successfully");

} catch (error) {
    if (error.code != "ENOENT") { throw error; }
}

// Generate a new webpage file
const content = viewEngine.transpile('index', viewContext);
fs.writeFileSync(indexPath, content);
console.log("> New webpage file created successfully\n");
