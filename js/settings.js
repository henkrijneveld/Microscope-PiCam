Vue.component("settings-pane", {
    data: function() {
        return {
            brightness: 50,
            sharpness: 0,
            saturation: 0,
            contrast: 0,
            redchannel: 393,
            bluechannel: 123,
            exposuremode: "auto",
            defaultwb: "off",
            manualwb: "ledringtop"
        }
    },
    created: function() {
        this.brightness = this.getFromLocalStorage("brightness", true, 50);
        this.sharpness = this.getFromLocalStorage("sharpness", true, 0);
        this.saturation = this.getFromLocalStorage("saturation", true, 0);
        this.contrast = this.getFromLocalStorage("contrast", true, 0);
        this.redchannel = this.getFromLocalStorage("redchannel", true, 393);
        this.bluechannel = this.getFromLocalStorage("bluechannel", true, 123);
        this.defaultwb = this.getFromLocalStorage("defaultwb", false, "off");
        this.manualwb = this.getFromLocalStorage("manualwb", false, "ledringtop");
        this.exposuremode = this.getFromLocalStorage("exposuremode", false, "auto");
    },
    watch: {
        defaultwb: function (newwb, oldwb) {
            window.localStorage.setItem("defaultwb", newwb.toString())
            if (newwb === "off" && oldwb !== "off") {
                // this enforces an update to the server.
                // after a specific preset whitebalance is choosen, the red and blue are set to their defaults (150)
                // this results in an always green image
                this.$refs.blue.updatevalue();
                this.$refs.red.updatevalue();
            }
        },
        brightness: function (newer, old) {
            window.localStorage.setItem("brightness", newer.toString())
        },
        contrast: function (newer, old) {
            window.localStorage.setItem("contrast", newer.toString())
        },
        saturation: function (newer, old) {
            window.localStorage.setItem("saturation", newer.toString())
        },
        sharpness: function (newer, old) {
            window.localStorage.setItem("sharpness", newer.toString())
        },
        exposuremode: function (newer, old) {
            window.localStorage.setItem("exposuremode", newer.toString())
        },
        manualwb: function (newer, old) {
            window.localStorage.setItem("manualwb", newer.toString())
        },
        redchannel: function (newer, old) {
            window.localStorage.setItem("redchannel", newer.toString())
        },
        bluechannel: function (newer, old) {
            window.localStorage.setItem("bluechannel", newer.toString())
        }
    },
    methods: {
        getFromLocalStorage(keyname, isInt, defval) {
            if (window.localStorage.getItem(keyname) !== null)
                if (isInt)
                    return(parseInt(window.localStorage.getItem(keyname)));
                else
                    return(window.localStorage.getItem(keyname));
            return defval;
        },
        updatemanualwb: function(selectwb) {
            selected = this.$cfg.manualwb.options.find((option) => {
                return option.value === selectwb;
            });
            this.redchannel = selected.red;
            this.bluechannel = selected.blue;
        }
    },
    template: `
<div class="cf-settings">
<h3 v-if="$slots.default"><slot></slot></h3>
<number-input v-if="$cfg.brightness.enable" v-bind:value.sync="brightness" v-bind="$cfg.brightness">Brightness (0 .. +100)</number-input>
<number-input v-if="$cfg.contrast.enable" v-bind:value.sync="contrast" v-bind="$cfg.contrast">Contrast (-100 .. +100)</number-input>
<number-input v-if="$cfg.saturation.enable" v-bind:value.sync="saturation" v-bind="$cfg.saturation">Saturation (-100 .. +100)</number-input>
<number-input v-if="$cfg.sharpness.enable" v-bind:value.sync="sharpness" v-bind="$cfg.sharpness">Sharpness (-100 .. +100)</number-input>
<select-input v-if="$cfg.exposuremode.enable" v-bind:selected.sync="exposuremode" v-bind:wblist="$cfg.exposuremode.options" v-bind:command="$cfg.exposuremode.command">V4L2 Exposure mode</select-input>
<p style="border: 1px solid #bbb; border-radius: 5px; font-size: small; padding: 5px; margin-top: 0; margin-right: 10px;">Hint: start with auto, change to off when settled, play with the light and the controls</p>
<select-input v-if="$cfg.defaultwb.enable" v-bind:selected.sync="defaultwb" v-bind:wblist="$cfg.defaultwb.options" v-bind:command="$cfg.defaultwb.command">V4L2 White balance</select-input>
<div :style="defaultwb != 'off' ? 'display: none;' : ''">
<div class="selectinput">
<span class="title">Channel presets</span><br>
<select style="min-width: 200px;" v-model="manualwb" @change="updatemanualwb(manualwb)">
  <option v-for="wboption in $cfg.manualwb.options" v-bind:value="wboption.value">
    {{ wboption.text }}
  </option>
</select>
</div>
<number-input ref="red" v-bind:value.sync="redchannel" v-bind="$cfg.redchannel">Red channel (0 .. +800)</number-input>
<number-input ref="blue" v-bind:value.sync="bluechannel" v-bind="$cfg.bluechannel">Blue channel (0 .. +800)</number-input>
</div>
</div>
`
})
