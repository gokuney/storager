const Utils = require("./utilFactory")
const stats = require("./statClass") //Handles the stats for storages
const interactive = require("./interactive") //Handles the cli functionality (basically UI for CLI)
const adapter = require("./adapters")//adapters' handeling

class CoreClass {

    constructor(){
        let self = this
        //load the libs
        self.Interactive = new interactive()
        self.Stats = new stats()
        self.Adapter = new adapter()
        
    }



}

module.exports = CoreClass