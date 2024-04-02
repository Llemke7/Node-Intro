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
        return response.data;
    } catch (error) {
        console.error('Error fetching URL:', error.message);
    }
}

// Function to write data to a file
function writeToFile(data, outputPath) {
    fs.writeFile(outputPath, data, (err) => {
        if (err) {
            console.error(`Couldn't write to ${outputPath}:`);
            console.error(err);
            return;
        }
        console.log(`Data written to ${outputPath}`);
    });
}

// Check if --out option is available
if (process.argv.includes('--out')) {
    const outIndex = process.argv.indexOf('--out');

    const outputPath = process.argv[outIndex + 1];
    
    const argument = process.argv[outIndex + 2];
    
    // Determine if the argument is a file path or a URL
    if (argument.startsWith('http://') || argument.startsWith('https://')) {
        webCat(argument).then(data => writeToFile(data, outputPath));
    } else {
        cat(argument);
        fs.readFile(argument, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            writeToFile(data, outputPath);
        });
    }
} else {

    if (process.argv.length !== 3) {
        console.error('Usage: node step3.js <file_path_or_url>');
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
}
