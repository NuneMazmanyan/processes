import os from 'os';

let user = os.userInfo();

process.stdout.write(`Hello ${user.username}!`);
process.stdin.on("data", (data) => {
    const operation = data.toString().trim()
    switch (operation){
        case '': break;
        case '.exit': {
            process.stdout.write(`Thank you ${user.username}, goodbye!`);
            process.exit();
        } break;
        case 'os --cpus':{
            const cpus = []
            os.cpus().forEach(cpu => cpus.push(`${cpu.speed / 1000} ghz`));
            process.stdout.write(`(overall amount of CPUS  ${os.cpus().length},Model is ${cpus}`);
        } break;
        case 'os --homedir':{
            process.stdout.write(os.homedir());
        } break;
        case 'os --username':{
            process.stdout.write(user.username);
        } break;
        case 'os --architecture':{
            process.stdout.write(process.arch);
        } break;
        case 'os --hostname':{
            process.stdout.write(os.hostname());
        } break;
        case 'os --platform':{
            process.stdout.write(os.platform());
        } break;
        case 'os --memory':{
            process.stdout.write(os.totalmem().toString());
        } break;
        default: process.stderr.write('Invalid input');
    }
})