const fs = require('fs');
const axios = require('axios');


function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);
    });
}

async function webCat(url) {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching URL:', error.message);
    }
}

// Check if a path or URL
if (process.argv.length !== 3) {
    console.error('Usage: node step2.js <file_path_or_url>');
    process.exit(1);
}

// Get the argument from command line 
const argument = process.argv[2];

// Determine if the argument is a file path or a URL
if (argument.startsWith('http://') || argument.startsWith('https://')) {
    webCat(argument);
} else {
    cat(argument);
}
