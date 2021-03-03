const fs = require('fs');
const path = require('path');
const child_process = require('child_process')

const fileName = "main.js";

const sourceFile = path.join(__dirname, fileName);
const destPath = path.join(__dirname, "build", fileName);

let build = child_process.exec("yarn build", (error, stdout, stderr) => {
    if (error) {
        console.error(`执行的错误: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    if (stdout) {
        //复制main.js
        fs.copyFile(sourceFile, destPath, function (err) {
            if (err) throw err;
            console.log('main.js已拷贝');
            fs.rename('./build/main.js', './build/electron.js', (err) => {
                if (err) throw err;
                console.log('main.js重命名为electron.js完成');
            });
            //复制package.json
            fs.copyFile('./package.json', './build/package.json', function (err) {
                if (err) throw err;
                console.log('package.json已拷贝');
                child_process.exec('yarn ebuild', (error, stdout, stderr) => {
                        if (error) {
                            console.error(`执行的错误: ${error}`);
                            return;
                        }
                        console.log(`stdout: ${stdout}`);
                        console.error(`stderr: ${stderr}`);
                    }
                )
            })
        })
    }

});



