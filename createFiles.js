const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

const folder = args.folder || 'test1';
const filesCount = args.count || 100;
const foldersCount = args.folders_count || 1;
const contentLength = args.content_length || 50000;

const path = `E:/temp/${folder}`;

function* createFiles(subFolder) {
    const subFolderPath = subFolder !== undefined ? `/${subFolder}` : '';
    const fullFolderPath = `${path}${subFolderPath}`;

    if (subFolder !== undefined) {
        _createFolderIfRequired(fullFolderPath);
    }

    for (let i = 0; i < filesCount; i++) {
        yield new Promise((resolve, reject) => {
            fs.writeFile(`${fullFolderPath}/message${_generateContent(15)}.txt`, _generateContent(contentLength), (err) => {
                if (err) { reject(err) };

                resolve();
            });
        });
    }
}

function* createFolders() {
    for (let i = 0; i < foldersCount; i++) {
        yield execute(createFiles(i));
    }
}

function execute(generator) {
    const now = new Date().getTime();

    return new Promise((resolve, reject) => {
        const _execute = function(result) {
            const next = generator.next();
    
            if (!next.done) {
                next.value.then(
                    (result) => _execute(result), 
                    (err) => generator.throw(err)
                );
            } else {
                console.log(`Done! It takes ${(new Date().getTime() - now) / 1000} seconds.`);
                resolve();
            }
        }
        _execute();
    });
}

function _createFolderIfRequired(p) {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
    }
}

function _generateContent(charsCount) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < charsCount; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

(function() {
    _createFolderIfRequired(path);

    if (foldersCount > 1) {
        execute(createFolders());
    } else {
        execute(createFiles());
    }    
})();