process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';
const core = require("./library/coreClass.js")
const utils = require("./library/utilFactory.js")

class Storager extends core{

    constructor(){
        super()
        let self = this
        //make some methods directly accessible
        //check if the command is ran via shell
        if (require.main === module) {
            //Called directly, show the CLI
            self.Interactive.init()
        } else {
            //Using as a require module, skip the CLI
        }
    }

    makeInstances(){
        //get all the active plugin configuration
        // this.Adapter.getActiveAdapters()


    }
    
}


let storager = new Storager()

/***********************create new adapter 
storager.Adapter.addAdapter("networkStorageAdapter" , {
    "source" : "/home/shenron/Desktop/storagetest/localstorage/from", //from where to pull the recordings
    "destination" : "/home/shenron/Desktop/storagetest/localstorage/to", //this is the destination on the local system to mount
    "SPID" : "network-storage-1",
    mountConfig : {
        host : "10.191.95.1",
        username : "kriti",
        password : "root@123",
        domain : false
    }
}).then( (resp) => {
    console.log(resp)
}).catch( (err) => {
    console.log(err)
} )

/********************/

/***********************Upload file */
// storager.Adapter.push("sample.mp4" , "network-storage-1" , {
//     keepOriginal : true,
//     fileName : 'custom.mp4'
// } ).then((resp) => {
//    console.log(`Success! ${resp}`)
// }).catch((err) => {
//    console.log(`Error! ${err}`)
// })

storager.Adapter.testAdapter("network-storage-1")
