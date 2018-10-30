const fs = require("fs")
const utils = require("./utilFactory")
const stats = require("./statClass")
class Adapters {
    constructor(){
        //refresh adapters list
        this.Stats = new stats()
    }

    getAdapter(SPID){//get info about an adapter by it's SPID
    let adapterConfig = this.Stats.activeAdapters
    
    return utils._.pick( adapterConfig , (v , k , o) => { return (v.SPID == SPID) && (v.active == true) })

    }
    
    addAdapter(id , config){ //create a new adapter

        return new Promise( (resolve , reject) => {

            try{
            
            let adapter = require(utils.Path.join(__dirname , `../adapters/${id}/${id}`) )
            adapter = new adapter()
            adapter.add(config)
                resolve('Done')
            }catch(e){
                reject(e)
            }
            

        })   

    }

    testAdapter(SPID){
        let adapterConfig = this.getAdapter(SPID)[SPID]
        let id = adapterConfig.adapterID
        if( Object.keys(adapterConfig).length == 0 ){
            throw new Error("Adapter config not found")
        }

        try{
        let adapterTest = require(utils.Path.join(__dirname , `../adapters/${id}/adapterTest`) )
        
        let test = new adapterTest(adapterConfig)

        test.init()

        }catch(e){
            console.log(e)
            throw new Error(`Test case not found, please make sure the file 'adapterTest.js' existes in ${id}'s root and is properly configured`)
            
        }

        

    }


    push(file , SPID, options){

        return new Promise( (resolve , reject) => {

        let jobid = utils.UID()
        //this will construct the sender and initiate the sending
        let adapterConfig = this.getAdapter(SPID)[SPID]
        let adapterObj = require( utils.Path.join(__dirname , `../adapters/${adapterConfig["adapterID"]}/${adapterConfig["adapterID"]}`) )
        adapterObj     = new adapterObj()
        let _stat = adapterObj._push(file , adapterConfig , jobid , options)
        
        if( _stat._status ){
            resolve(_stat.message)
        }else{
            reject(_stat.message)
        }

        })
        
    }
    

    pop(file , SPID , fromWhere){ //fromWhere -> source(default) | destination | both
        return new Promise((resolve , reject) => {
            let jobid = utils.UID()
            //this will construct the sender and initiate the popping
            let adapterConfig = this.getAdapter(SPID)[SPID]
            let adapterObj = require( utils.Path.join(__dirname , `../adapters/${adapterConfig["adapterID"]}/${adapterConfig["adapterID"]}`) )
            adapterObj     = new adapterObj()
            let _stat = adapterObj._pop(file , adapterConfig , jobid , fromWhere)
            
            if( _stat._status ){
                resolve(_stat.message)
            }else{
                reject(_stat.message)
            }
    
            })  
    }

}

module.exports = Adapters