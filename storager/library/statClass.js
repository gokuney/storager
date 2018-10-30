const Utils = require("./utilFactory")
const fs = require("fs")
const path = require("path")
class Stats{
    constructor(){
        //refresh adapters list
        this.refreshAdaptersList()
    }

    /*
    * Adapter Related
    */

    refreshAdaptersList(){
        let aConfig = this.adaptersConfig // current core adapter config 
        let adapters = [];
        let adaptersConfig = []; //to store the list of adapters
        let dirItems = fs.readdirSync(path.join(__dirname, "../adapters"))

        adapters = dirItems.filter( (dirItem) => {return fs.lstatSync( path.join(__dirname , `../adapters/${dirItem}`) ).isDirectory()})

        adapters.forEach(adapter => {
            try{
                //read the adapter's config file 
                let adapterConfig = JSON.parse( fs.readFileSync( path.join(__dirname , `../adapters/${adapter}/config.json`) ) )
                adaptersConfig.push(adapterConfig)
            }catch(e){
                //config not found or some error occured
                console.log(`Config for adapter ${adapter} is corrupt or missing`)
            }
        });

        //inject this into main adaptersConfig.json
        aConfig["adapters"] = adaptersConfig
        fs.writeFileSync( path.join(__dirname , "../adapters/adaptersConfig.json") , JSON.stringify(aConfig) )

    }

    get availableAdapters(){
        let adapterConfig = this.adaptersConfig
        return adapterConfig.adapters
    }

    get activeAdapters(){
        let adapterConfig = this.adaptersConfig
        return Utils._.pick( adapterConfig["activeAdapters"] , (v , k , o) => { return v.active } )
    }

    //Get currently activated adapters
    get adaptersConfig(){
        return JSON.parse( fs.readFileSync( path.join(__dirname , "../adapters/adaptersConfig.json") ) )
    }
}

module.exports = Stats