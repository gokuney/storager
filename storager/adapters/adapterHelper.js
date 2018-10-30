const utils = require("../library/utilFactory")
const stats = require("../library/statClass")

class AdapterHelper{
    
    constructor(adapterPath){
        if(!adapterPath){
            throw new Error("Missing adapter path")
        }
        this.adapterPath = adapterPath
        this.Stats = stats
    }

    add(config){

    //validate the required config for creating the adapter
    if( !config ){
        throw new Error("Config is corrupt/missing. Please pass proper configuration for the adapter")
    }
    console.log("Got following config")
    
    let SPID = config.SPID ? config.SPID : utils.UID()//Storage Point ID

    let adapterConfig = this.Stats.adaptersConfig

    if(typeof adapterConfig["activeAdapters"][SPID] != "undefined"){
        throw new Error(`The id ${SPID} is already in use, please specify a unique id or don't specify it to autogenerate`)
    }
    
    config["SPID"] =  SPID
    config["active"] = true
    config["adapterID"] = utils.Fs.readJsonSync( utils.Path.join( this.adapterPath , "./config.json") ).id

    adapterConfig["activeAdapters"][SPID] = config

    
    //write it back
    utils.Fs.writeFileSync(utils.Path.join(this.adapterPath , "../adaptersConfig.json") , JSON.stringify(adapterConfig))
    
    return true
}



update(SPID , config){

    //validate the required config for creating the adapter
    if( !config ){
        throw new Error("Config is corrupt/missing. Please pass proper configuration for the adapter")
    }
    
    config["adapterID"] = utils.Fs.readJsonSync( utils.Path.join(this.adapterPath , "./config.json") ).id

    let adapterConfig = this.Stats.adaptersConfig

    for( var key in config){
        adapterConfig["activeAdapters"][SPID][key] = config[key]
    }

    //write it back
    utils.Fs.writeFileSync(utils.Path.join(this.adapterPath , "../adaptersConfig.json") , JSON.stringify(adapterConfig))
    
    return true

}


}

module.exports = AdapterHelper