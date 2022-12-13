const ImportFolder = (reference) => {
    
    // Import all files in a folder
    let folder = require.context(reference, true, /\.jsx$/);

    // Import all files in a folder
    let files = folder.keys().map((key) => {
        return folder(key);
    });

    // Return the imported files
    return files;
};



