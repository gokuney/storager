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
        //get the source path
        let source = config.source
        //get the dest path
        let destination = config.destination
        
        // let fileName = config.nomenclature ? utils.nomenclatureParser(config.nomenclature , file) : file
        let fileName = endfilename

        //carry out the operation
        try{        
            if(keepOriginal){
                utils.Fs.copySync( `${config.source}/${file}` , `${config.destination}/${fileName}` )
            }else{
                utils.Fs.moveSync( `${config.source}/${file}` , `${config.destination}/${fileName}` )
            }
            return { _status : true , message : "File operation completed" }
        }catch(e){
            return { _status : false , message : e }
        }


    }

    _pull(){

    }

    _pop(file , adapterConfig , jobid , fromWhere){
        console.log(adapterConfig)
            switch(fromWhere){
                case 'destination':
                    try{ utils.Fs.removeSync(`${adapterConfig.destination}/${file}`); return { _status : true , message : `File ${file} deleted` }; } catch(e){ return { _status : false , message : e } }
                break;

                case 'both':

                let messages = [];
                try{
                     utils.Fs.removeSync(`${adapterConfig.source}/${file}`); 
                     messages.push(`File ${file} deleted from Source ${adapterConfig.source}/${file}`)
                    } catch(e){ 
                        messages.push(`Failed to delete ${file} from Source ${adapterConfig.source}/${file}`)
                    }

                try{
                     utils.Fs.removeSync(`${adapterConfig.destination}/${file}`); 
                     messages.push(`File ${file} deleted from Destination ${adapterConfig.destination}/${file}`)
                    } catch(e){ 
                        messages.push(`Failed to delete ${file} from Destination ${adapterConfig.destination}/${file}`)
                    }
                    return { _status : true , message : messages }

                break;

                default: //only source

                try{
                    utils.Fs.removeSync(`${adapterConfig.source}/${file}`);
                    return { _status : true , message : `File ${file} deleted from Source ${adapterConfig.source}/${file}` }
                   } catch(e){ 
                    return { _status : true , message : `Failed to delete ${file} from Source ${adapterConfig.source}/${file}` }
                   }
                
            }//end switch
    }

}

module.exports = Adapter