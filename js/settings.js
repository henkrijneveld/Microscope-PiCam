Vue.component("settings-pane", {
    data: function() {
        return {
            brightness: 50,
            sharpness: 0,
            saturation: 0,
            contrast: 0,
            redchannel: 393,
            bluechannel: 123,
            defaultwb: "off",
            manualwb: ""
        }
    },
    methods: {
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
<number-input v-bind:value.sync="brightness" v-bind="$cfg.brightness">Brightness (0 .. +100)</number-input>
<number-input v-bind:value.sync="contrast" v-bind="$cfg.contrast">Contrast (-100 .. +100)</number-input>
<number-input v-bind:value.sync="saturation" v-bind="$cfg.saturation">Saturation (-100 .. +100)</number-input>
<number-input v-bind:value.sync="sharpness" v-bind="$cfg.sharpness">Sharpness (-100 .. +100)</number-input>
<select-input v-bind:selected.sync="defaultwb" v-bind:wblist="$cfg.defaultwb.options" v-bind:command="$cfg.defaultwb.command">V4L2 White balance</select-input>
<div :style="defaultwb != 'off' ? 'display: none;' : ''">
<div class="selectinput">
<span class="title">Channel presets</span><br>
<select v-model="manualwb" @change="updatemanualwb(manualwb)">
  <option v-for="wboption in $cfg.manualwb.options" v-bind:value="wboption.value">
    {{ wboption.text }}
  </option>
</select>
</div>
<number-input v-bind:value.sync="redchannel" v-bind="$cfg.redchannel">Red channel (0 .. +800)</number-input>
<number-input v-bind:value.sync="bluechannel" v-bind="$cfg.bluechannel">Blue channel (0 .. +800)</number-input>
</div>
</div>
`
})
