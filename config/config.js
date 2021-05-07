// configuration
Vue.prototype.$cfg = {
    // picture settings
    magn: ['0','1','2','3','4','5','6','7','8','9'],
    magnfraction: ['0','1','2','3','4','5','6','7','8','9'],
    reduction: ['','0.3R','0.3-0.5VR','0.5R','1.0R'],
    barlow: ['','0.5B','2.0B'],
    polarizer: ['','Pol', 'An', 'Pol+An'],
    immersion: ['','Water', 'Oil', 'Immersion'],
    objective: ['Default', '300x', '6mm', '16mm' ],
    sequence: ['', 'Date-time','Stackframe', 'Both'],

    // endpoints
    streamEndpoint: "php/api/picture/streampic.php",
    shotEndpoint: "php/api/picture/shotpic.php",
    controlendpoint: "php/api/control/camcontrol.php",

    // inputcontrols
    brightness: {
        enable: true,
        minval: 0,
        maxval: 100,
        command: "setbrightness"
    },
    contrast: {
        enable: true,
        minval: -100,
        maxval: 100,
        command: "setcontrast"
    },
    saturation: {
        enable: true,
        minval: -100,
        maxval: 100,
        command: "setsaturation"
    },
    sharpness: {
        enable: true,
        minval: -100,
        maxval: 100,
        command: "setsharpness"
    },
    redchannel: {
        enable: true,
        minval: 0,
        maxval: 800,
        command: "setredchannel"
    },
    bluechannel: {
        enable: true,
        minval: 0,
        maxval: 800,
        command: "setbluechannel"
    },
    defaultwb: {
        enable: true,
        options: [
            {value: 'off', text: 'Manual'},
            {value: 'auto', text: 'Auto'},
            {value: 'sun', text: 'Sun'},
            {value: 'cloudy', text: 'Cloudy'},
            {value: 'shade', text: 'Shade'},
            {value: 'tungsten', text: 'Tungsten'},
            {value: 'fluorescent', text: 'Fluorescent'},
            {value: 'incandescent', text: 'Incandescent'},
            {value: 'flash', text: 'Flash'},
            {value: 'horizon', text: 'Horizon'}
        ],
        command: 'setwhitebalance'
    },
    manualwb: {
        enable: true,
        options: [
            {value: 'none', text: 'No whitebalance', red: 150, blue: 150 },
            {value: 'ledringtop', text: 'Top led ring', red: 380, blue: 123 }
        ]
    },
    exposuremode: {
        enable: true,
        options: [
            {value: "off", text: "Off     "},
            {value: "auto", text: "Auto     "}
/*            ,
            {value: "night", text: "night"},
            {value: "backlight", text: "backlight"},
            {value: "spotlight", text: "spotlight"},
            {value: "verylong", text: "verylong"}
*/        ],
        command: 'setexposuremode'
    }
}

if (location.hostname === "localhost") {
    Vue.prototype.$cfg.streamEndpoint += "?demo=1";
    Vue.prototype.$cfg.shotEndpoint += "?demo=1";
    Vue.prototype.$cfg.controlendpoint += "?demo=1";
}



