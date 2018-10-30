const utils = require("../../library/utilFactory")
const MountManager = require("./library/mountmanager")
class adapterTest  extends MountManager{
    constructor(config){
        super(config)
        this.config = config
        this.Utils = utils
        this.failures = []
        this.success = []
    }

    get testCases(){
        return {
            ping : (ip) => {
                return new Promise( (resolve , reject) => {
                    utils.Ping.promise.probe(ip).then((resp) => {
                        if(resp.alive){
                            this.success.push(`✓ Ping test successful : host ${ip} is reachable`)
                            resolve(resp)
                        }else{
                            this.failures.push(`✘ Ping test failed :   Host ${ip} is not reachable`)
                            reject(false)    
                        }
                        
                    }).catch((err) => {
                        this.failures.push(`✘ Ping test failed :   ${err}`)
                        reject(err)
                    })
                })
            },

            localMountTarget : (localMountTarget) => {
                return new Promise((resolve , reject) => {
                    try{
                        let exists = utils.Fs.existsSync(localMountTarget)
                        console.log(exists)
                        if(exists){
                            this.success.push(`✓ Local mount point test successful :  Directory "${localMountTarget}" exists!`)
                            resolve(exists)
                        }else{
                            this.failures.push(`✘ Local mount point test failed :  Directory "${localMountTarget}" does not exist`)
                            reject(exists)
                        }
                    }catch(e){
                        this.failures.push( `✘ Local mount point test failed :  ${e}` )
                        reject(false)
                    }

                })
            },

            localSourceDirectory : (localSource) => {
                return new Promise((resolve , reject) => {
                    try{
                        let exists = utils.Fs.existsSync(localSource)
                        if(exists){
                            this.success.push(`✓ Local source test successful :  Directory "${localSource}" exists!`)
                            resolve(exists)
                        }else{
                            this.failures.push(`✘ Local source test failed :  Directory "${localSource}" does not exist`)
                            reject(exists)
                        }
                    }catch(e){
                        this.failures.push( `✘ Local source test failed :  ${e}` )
                        reject(false)
                    }

                })
            },

           isMounted : () =>{
               let self = this
                return new Promise((resolve , reject) => {
                    self.mountStatus().then((resp) => {
                        if(resp){
                            this.success.push(`✓ Mount test successful :  Directory "${self.config.destination}" is mounted!`)
                            resolve(resp)
                        }else{
                            this.failures.push( `✘ Mount test failed :  Directory "${self.config.destination}" is not mounted` )
                            reject(err)
                        }
                        
                        
                    }).catch((err) => {
                        this.failures.push( `✘ Mount test failed :  ${err}` )
                        reject(err)
                    })
                })
           }
        }
    }

    init(){
        let self = this
        let testPromises = [];
        let mountConfig = self.config.mountConfig
        
        //---- Test Cases
        //Test mounting
        testPromises.push( self.testCases.isMounted() )
        //Test if the local mount dir exists
        testPromises.push( self.testCases.localMountTarget(self.config.destination) )
        //Test if the local source dir exists
        testPromises.push( self.testCases.localSourceDirectory(self.config.source) )
        //Test if the host is reachable
        var regxIP = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
        testPromises.push( self.testCases.ping( mountConfig.host.match( regxIP )[0] ) )
        
        //Run all tests
        Promise.all(testPromises).then((response) => {
            let result = {
                passed : true,
                result : this.success
            }
            console.log(`All passed, below is the log`)
            console.log(result)
        }).catch((err) => {
            let result = {
                passed : false,
                result : this.failures
            }
            console.log(result)
        })

    }
    
}

module.exports = adapterTest