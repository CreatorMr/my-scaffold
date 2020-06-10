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
console.log(path.resolve(__dirname))// 文件所在的当前路径
console.log(path.resolve(__dirname, '../template'))

const template = path.resolve(__dirname, '../template')
const targetDir = path.resolve(__dirname, '../project')
console.log(path.resolve(__dirname, '../template'))
console.log(path.resolve(__dirname, '../project/'))

/**
 * /执行命令当前所在的路径
 * 在当前路径下创建新的项目文件目录
 */
console.log(process.cwd())
const ignores = ['.DS_Store']
async function copyFile(src, dest, handler) {
  let srcStat = fs.statSync(src)
  if (srcStat.isFile()) {
    let content = fs.readFileSync(src, { encoding: 'utf8' })
    content = await handler(content)
    fs.writeFileSync(dest, content)
  } else if (srcStat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest)
    }
    let files = fs.readdirSync(src)
    files = files.filter(file => !ignores.includes(file))
    files.forEach(file => {
      copyFile(path.resolve(src, file), path.resolve(dest, file), handler)
    })
  }
}

async function init() {
  const answers = await inquirer.prompt([
    {
      type: "confirm",
      message: "是否需要git地址",
      name: "isGitUrl",
      prefix: "请问"
    }, {
      type: 'input',
      name: 'gitUrl',
      message: '请输入所需要模版git',
      suffix: "地址",
      when: function (answers) { // 当watch为true的时候才会提问当前问题
        return answers.isGitUrl
      }
    }, {
      type: 'input',
      name: 'projectName',
      message: '请输入将要创建的项目名称',
      validate: function (val) {
        if (!val) {
          return "请输入项目名称"
        } else {
          return true
        }
      }
    }, {
      type: 'input',
      message: '请输入手机号(11111111111):',
      name: 'phone',
      validate: function (val) {
        if (val.match(/\d{11}/g)) { // 校验位数
          return true;
        }
        return true;
        return "请输入11位数字";
      }
    }, {
      type: "password", // 密码为密文输入
      message: "请输入密码：",
      name: "pwd"
    },{
      type: "checkbox",
      message: "选择颜色:",
      name: "color",
      choices: [
          "red",
          "blue",
          "green",
          "yellow"
      ],
      pageSize: 2 // 设置行数
    },{
      type: 'list',
      message: '请选择一种设备:',
      name: 'device',
      choices: [
          "IOS",
          "ANDRIOD",
          "WEB"
      ],
      filter: function (val) { // 使用filter将回答变为小写
          return val.toLowerCase();
      }
  },
  {
      type: "expand",
      message: "请选择一种渠道：",
      name: "chanel",
      choices: [
          {
              key: "i",
              name: "Apple",
              value: "apple"
          },
          {
              key: "a",
              name: "Android",
              value: "android"
          },
          {
              key: "w",
              name: "web",
              value: "web"
          }
      ]
    },
    {
      type: "editor",
      message: "请输入备注：",
      name: "editor"
    }
  ])

  console.log(answers)
  const dest = path.resolve(process.cwd(), answers.projectName) // 当前命令执行路径下创建工程目录

  copyFile(template, dest, (content) => {
    return content
  })
  // fs.mkdirSync(dest)
  // copyFolder(template, targetDir, function(err) {
  //     if (err) {

  //       return
  //     }

  //     //continue
  //   })
}
module.exports = init
