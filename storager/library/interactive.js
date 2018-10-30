const Utils = require("./utilFactory")
const inquirer = require("inquirer")
const shelljs = require("shelljs")

class Interactive {
    
    constructor(){
        Utils.Logger().info("Interactive")
        this.prompt = inquirer.createPromptModule();
    }

    init(){
        //Welcome 
          this.showMenuItems()
    }

    showMenuItems(){
    }

}

module.exports = Interactive