const fs = require("fs");
const path = require('path');

function copyFile(name, target, source) {
    const url_for = this.extend.helper.get("url_for").bind(this);
    this.extend.generator.register(name, function(locals) {
        return {
            path: url_for(target),
            data: function() {
                try {
                    return fs.createReadStream(source);
                } catch (error) {
                    console.error(`Error copying file ${name}: ${error.message}`);
                    return Buffer.from(''); // 返回空内容，避免生成器失败
                }
            },
        };
    });
}

function findRootDir(startDir) {
    let currentDir = startDir;
    while (!fs.existsSync(path.join(currentDir, 'package.json'))) {
        const parentDir = path.dirname(currentDir);
        if (parentDir === currentDir) {
            throw new Error('Root directory not found');
        }
        currentDir = parentDir;
    }
    return currentDir;
}

module.exports = {
    copyFile,
    findRootDir,
};