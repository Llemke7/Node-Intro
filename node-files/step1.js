const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}

// Check if a path argument is provided 
if (process.argv.length !== 3) {
    console.error('Usage: node step1.js <file_path>');
    process.exit(1);
}

// Get the file path from command line 
const filePath = process.argv[2];

// Call cat function 
cat(filePath);
