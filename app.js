import os from 'os';
import fs from 'fs';
import path from "path";
import Table from "cli-table";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let user = os.userInfo();

process.stdout.write(`Hello ${user.username}!`);
process.stdin.on("data", (data) => {
    let operation = data.toString().trim();

    switch (operation) {
        case '':
            break;
        case '.exit': {
            process.stdout.write(`Thank you ${user.username}, goodbye!`);
            process.exit();
        }
            break;
        case 'os --cpus': {
            const cpus = []
            os.cpus().forEach(cpu => cpus.push(`${cpu.speed / 1000} ghz`));
            process.stdout.write(`(overall amount of CPUS  ${os.cpus().length},Model is ${cpus}`);
        }
            break;
        case 'os --homedir': {
            process.stdout.write(os.homedir());
        }
            break;
        case 'os --username': {
            process.stdout.write(user.username);
        }
            break;
        case 'os --architecture': {
            process.stdout.write(process.arch);
        }
            break;
        case 'os --hostname': {
            process.stdout.write(os.hostname());
        }
            break;
        case 'os --platform': {
            process.stdout.write(os.platform());
        }
            break;
        case 'os --memory': {
            process.stdout.write(os.totalmem().toString());
        }
            break;
    }

    operation = data.toString().trim().split(' ');

    switch (operation[0]){
        case 'ls': {
            const table = new Table({
                head: ['(index)', 'Name', 'Type'], colWidths: [10, 10, 10]
            });
            fs.readdir(__dirname, (err, files) => {
                files = files.sort();
                files.forEach((file, index) => {
                    if ((path.extname(file) ? 'file' : 'directory') === 'directory') {
                        files.splice(files.findIndex(element => element === file), 1)
                        files.unshift(file)
                    }
                })
                files.forEach((file, index) => {
                    table.push([index, file, path.extname(file) ? 'file' : 'directory']);
                })
            })
            setTimeout(() => {
                process.stdout.write(table.toString())
            }, 5000);
        }
            break;
        case 'add': {
            fs.writeFile(`${__dirname}/${operation[1]}`, '', () => {
            });
        }
            break;
        case 'rn': {
            if (!fs.existsSync(operation[1])) {
                console.log("file not found!")
                process.exit()
            }
            fs.rename(operation[1], `${operation[1]}/${operation[2]}`, () => {
            })
            process.exit()
        }
            break;
        case 'cp': {
            if (!fs.existsSync(operation[1])) {
                console.log("file not found!")
                process.exit()
            }
            fs.copyFile(operation[1], operation[2], () => {
            })
        }
            break;
        case 'mv': {
            if (!fs.existsSync(operation[1])) {
                console.log("file not found!")
                process.exit()
            }
            fs.rename(operation[1], `${operation[2]}`, () => {
            })
            process.exit()
        }
            break;
        case 'rm': {
            if (!fs.existsSync(operation[1])) {
                console.log("file not found!")
                process.exit()
            }
            fs.unlink(operation[1], () => {})
        }
            break;
        default:
            process.stderr.write('Invalid input');
    }
})