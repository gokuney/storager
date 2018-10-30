const utils = require("../../../library/utilFactory")

class MountManager {

    constructor(config){
        
        this.config = config
        this.Utils = utils
        
    }

    mount(){

        let self = this
        
        return new Promise((resolve , reject) => {
        
            let _mounting = utils.Exec(`mount -t cifs ${self.config.mountConfig.host} ${self.config.destination} -o username=${self.config.mountConfig.username},${(self.config.mountConfig.domain ) ? ",domain="+self.config.mountConfig.domain.trim() : ""},pass=${self.config.mountConfig.password},dir_mode=0777,file_mode=0777,vers=3.0`)
            
            _mounting.on('error', function (err) {
                resolve('Mount Process Completed')
            });

            _mounting.on('close', function (resp) {
                resolve('Mount Process Completed')
            });              
        })

    }

    unmount(){
        let self = this
        return new Promise((resolve , reject) => {
            let _unmounting = utils.Exec(`unmount ${self.config.destination}`)
            
            _unmounting.on('error', function (err) {
                resolve(true)
            });

            _unmounting.on('close', function (resp) {
                resolve(true)
            });              
        })
        
    }

    mountStatus(){
        return new Promise((resolve , reject) => {
            let self = this
            let _mounting = utils.Exec(`mount | grep ${self.config.destination}`)

            _mounting.stdout.on('data', function (resp) {
                console.log(`DATA : ${resp}`)
                if( resp.toString().indexOf(self.config.mountConfig.host) > -1 ){
                    resolve(true)
                }else{
                    reject(false)
                }
            });
            
            _mounting.on('error', function (err) {
                console.log(`ERR : ${err}`)
                resolve(false)
            });

        })
    }
    
    // ./Methods

}

module.exports = MountManager