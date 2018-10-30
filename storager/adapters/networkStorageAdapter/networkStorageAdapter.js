const utils = require("../../library/utilFactory")
const stats = require("../../library/statClass")
const adapterHelper    = require("../adapterHelper")
class Adapter extends adapterHelper{

    constructor(){
        console.log("Using |local storage| adapter")
        super(utils.Path.join(__dirname , "./"))
        this.Stats = new stats()
        this.emitter = utils.Events

        

    }

    _push(file , config , jobid , options){

        //TODO : Output filename convention

        let keepOriginal = options.keepOriginal ? options.keepOriginal : false
        let endfilename = options.fileName ? options.fileName : file

        let self = this
        //carry out the operation
        


    }

    _pull(){

    }



}

module.exports = Adapter