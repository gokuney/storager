/*
...
...
...

*/
//Iniate the object
let storager = new Storager()

/***********************create new adapter */
storager.Adapter.addAdapter("localStorageAdapter" , {
    "source" : "/home/shenron/Desktop/storagetest/localstorage/from",
    "destination" : "/home/shenron/Desktop/storagetest/localstorage/to",
    "SPID" : "local-storage-1",
    "nomenclature" : ["File" , "-*-new Date()" , "-*-shortid()"]
}).then( (resp) => {
    console.log(resp)
}).catch( (err) => {
    console.log(err)
} )

/***********************Upload file */
storager.Adapter.push("sample.mp4" , "local-storage-1" , {
     keepOriginal : true,
     fileName : 'custom.mp4'
 } ).then((resp) => {
    console.log(`Success! ${resp}`)
 }).catch((err) => {
    console.log(`Error! ${err}`)
 })

 /***********************Delete file */
 storager.Adapter.pop("sample.mp4" , "local-storage-1" , "source").then((resp) => {
    console.log(`Success! ${resp}`)
 }).catch((err) => {
    console.log(`Error! ${err}`)
 })
