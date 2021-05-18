// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

Vue.component("zoomable-image", {
  data: function() {
    return {
      vheight: 0,
      vwidth: 500,
      iheight: 0,
      iwidth: 0,
      height: 450,
      width: 600,
      dragactive: false,
      top: 20,
      left: 50,
      multiplier: 0,
      centerh: 0,
      centerw: 0,
      pict: "",
      lastrawpic: null, // last succesful loaded picture
      isSized: false, // userinterface initialized with correct values
      imgIdle: true, // image ready to load, no images in queue
      timer: null,
      doupdates: true, // image will be continuously updated
      updatetext: "Freeze"
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  computed: {
    zoomperc() {
      return (this.multiplier * 100).toFixed(0) + '%';
    }
  },
  props: {
    maxwidth: Number
  },
  watch: {
    maxwidth: function (newwidth, oldwith) {
      this.isSized = false;
      this.vwidth = newwidth;
      if (this.iheight) this.init(null);
    }
  },
  created: function () {
    this.vheight = this.vwidth;
    this.timer = setInterval(() => this.loadpic(), 100);
  },
  methods: {
    loadpic: function() {
      if (this.doupdates && this.imgIdle) {
        this.imgIdle = false;
        axios
          .get(this.$cfg.streamEndpoint, {responseType: 'arraybuffer'})
          .then(response => {
            this.lastrawpic = btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
              ),
            );
            this.pict = "data:;base64," + this.lastrawpic;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.imgIdle = true;
          })
      }
    },
    center: function () {
      this.centerh = this.iheight / 2;
      this.centerw = this.iwidth / 2;
      this.setupsizes(this.multiplier);
    },
    init: function(event) {
      if (!this.isSized) {
        let windowHeight = window.innerHeight;
        let windowWidth = window.innerWidth;
        let maxHeight = window.innerHeight - 140;

        if (event) {
          this.iheight = event.currentTarget.naturalHeight;
          this.iwidth = event.currentTarget.naturalWidth;
        }

        this.vwidth = this.maxwidth;
        this.vheight = this.vwidth * this.iheight / this.iwidth;
        if (maxHeight > 100 && this.vheight > maxHeight) {
          this.vheight = maxHeight;
          this.vwidth = this.iwidth * this.vheight / this.iheight;
        }
        this.centerh = this.iheight / 2;
        this.centerw = this.iwidth / 2;
        this.setupsizes(this.vheight / this.iheight);
        this.isSized = true;
      }
    },
    dofit: function () {
      this.setupsizes(this.vheight / this.iheight);
    },
    doquart: function () {
      this.setupsizes(4);
    },
    doeight: function () {
      this.setupsizes(8);
    },
    dohalf: function () {
      this.setupsizes(0.5);
    },
    dofull: function () {
      this.setupsizes(1);
    },
    dodouble: function () {
      this.setupsizes(2);
    },
    mousedown: function (event) {
      this.dragactive = true;
    },
    mouseup: function (event) {
      this.dragactive = false;
    },
    changeupdating: function() {
      this.doupdates = !this.doupdates;
      this.updatetext = this.doupdates ? "Freeze" : "Melt";
    },
    mousemove: function (event) {
      if (this.dragactive) {
        this.top += event.movementY;
        this.left += event.movementX;
        this.centerh -= event.movementY / this.multiplier;
        this.centerw -= event.movementX / this.multiplier;
      }
    },
    setupsizes: function (multiplier) {
      this.multiplier = multiplier;
      this.height = this.iheight * multiplier;
      this.width = this.iwidth * multiplier;
      this.top = this.vheight / 2 - this.centerh * multiplier;
      this.left = this.vwidth / 2 - this.centerw * multiplier;
    }
  },
  template: `
<div id="zi-picture">
  <h3 v-if="$slots.default"><slot></slot></h3>
  <div :style="[isSized ? {'display': 'block'} : {'display': 'none'}]">
    <div class="zi-camimg" id="zi-camdiv" :style="{width: vwidth + 'px', height: vheight + 'px'}">
      <img  v-on:load="init"
            v-bind:style="{top: top + 'px', left: left + 'px'}"  
            v-on:mousemove.prevent="mousemove" 
            v-on:mousedown.prevent="mousedown" 
            v-on:mouseup.prevent="mouseup" 
            id="zi-campic" 
            :src="pict" 
            v-bind:height="height" 
            v-bind:width="width"
    />
    </div>
    <div class="zi-buttons">
      <button v-on:click="center">Center</button>
      <button v-on:click="dofit">Fit</button>
      <button v-on:click="dofull">1x</button>
      <button v-on:click="dodouble">2x</button>
      <button v-on:click="doquart">4x</button>
      <button v-on:click="doeight">8x</button>
      <button style="margin-left: 10px;" v-on:click="changeupdating">{{updatetext}}</button>
      <div style="display: inline-block; border: 1px solid grey; border-radius: 5px; margin-left: 10px; padding: 4px 5px;">
        <div style="display: inline-block; ">zoom: {{ zoomperc }}</div>
        <div v-if="!doupdates" style="display: inline-block; margin-left: 10px; color: red; font-weight: bold;">Frozen</div>
      </div>      
    </div>
  </div>
</div>
`
})
