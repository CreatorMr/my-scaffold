const program = require('commander');
const inquirer = require('inquirer');
const symbols = require('log-symbols');
const download = require('download-git-repo');
const handlebars = require('handlebars');
const chalk = require('chalk');
const ora = require('ora');
const shell = require('shelljs');
const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

// const merge = require('merge')

program.version('1.0.0')
       .description('sacffold(init deploy)')
       .option('-v, --version <version>','your version','1.0.1')
       .option('-n, --name <name>', 'your name', 'Creator')

// 初始化生成项目
program.command('init')
       .description('init a new project')
       .action((options)=>{
           console.log('初始化项目------')
           require('../lib/myscaff.init')()
       })

// 测试环境启动项目
program 
    .command('dev')
    .description('开发环境本地启动项目')
    .option('-c, --config <path>', 'config file. `./scaffold.config.js`')
    .option('-o, --open', 'auto open browser.', true)
    .option('-p, --port <port>', 'dev server port', 9000)
    .option('--libenv <env>', 'lib env.config type`','dev')
    .action(options=>{
        console.log('执行dev命令----')
        let devDefaultConfig = {}
        devDefaultConfig.port = options.port || '9999'
        require('../lib/myscaff.dev')(devDefaultConfig)
    })
// 结束
program.parse(process.argv)

// if(program.name) {
//     console.log(program.name)
// }
if(!program.args.length){
    program.help()
}