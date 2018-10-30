const Logger = require("logger").createLogger()
const chalk = require("chalk")
const figlet = require("figlet")
const path = require("path")
const shortid = require('shortid');
const fs = require('fs-extra');
const underscore  = require('underscore')
const events = require("events")
const ipregex = require("ip-regex")
const ping    = require("ping")
const exec = require("child_process").exec

class eventsManager extends events {}
const EventsManager = new eventsManager()

const Utils =  {

    //------ Plain white keys :p ------
    
    Path : path ,

    UID : shortid,

    Figlet : figlet,

    Chalk  :  chalk,

    Fs     : fs,

    Events : EventsManager,

    _      : underscore ,

    GetIP  : ipregex,  

    Ping   : ping,

    Exec   : exec,
    
    //------ Method based ------

    //keyValidator : (_test) => 

    Logger : (_logger) => { // if user defined _logger is defined, use that else use our own one
        return (_logger) ? _logger : Logger 
    },

    Say : (what , font) => {
        figlet.textSync(what, {
            font: (font) ? font : "Bubble",
            horizontalLayout: "default",
            verticalLayout: "default"
          })
    },

    nomenclatureParser : (nomenclature , file) => {

        let filename  = file.substr(0 , file.lastIndexOf('.') )
        let extention = file.substr( file.lastIndexOf('.') , file.length )
        let endfilename = '' 

        nomenclature.forEach( (keyw) => {
            if( keyw.indexOf('-*-') == -1 ){
                endfilename += keyw
            }else{
                endfilename += eval(keyw.replace('-*-',''))
            }
        })

        return `${endfilename}.${extention}`
        
    }

}// end Utils

module.exports = Utils