// SPDX-FileCopyrightText: 2021- Henk Rijneveld <henk@henkrijneveld.nl>
// SPDX-License-Identifier: MIT

Vue.component("file-name", {
  data: function() {
    return {
      objective: 'Default',
      name: '',
      extra: '',
      reduction: '',
      barlow: '',
      polarizer: '',
      immersion: '',
      magn: '0',
      magnfraction: '7',
      sequence: 'Date-time',
      framenr: 0
    }
  },
  computed: {
    // filename is a string containing the relevant information
    // it is the base the definitive name will be constructed somewhere else
    filename() {
      let fname = "";
      if (this.name) fname += this.name + "-";
      if (this.sequence === this.$cfg.sequence[2] || this.sequence === this.$cfg.sequence[2]) {
        fname += "{frame}" + "-";
      }
      if (parseInt(this.magn) != 0 || parseInt(this.magnfraction) != 0 ) {
        fname += this.magn + '.' + this.magnfraction + "x-";
      }
      if (this.objective != 'Default') fname += this.objective + "-"
      if (this.reduction) fname += this.reduction + "-"
      if (this.barlow) fname += this.barlow + "-"
      if (this.polarizer) fname += this.polarizer + "-";
      if (this.immersion) fname += this.immersion + "-";
      if (this.extra) fname += this.extra + "-";
      if (this.sequence === this.$cfg.sequence[1] || this.sequence === this.$cfg.sequence[3]) {
        fname += "{datetime}";
      }
      return (fname);
    }
  },
  updated: function() {
    this.$emit("setfname", this.filename);
  },
  mounted: function() {
    this.$emit("setfname", this.filename);
    var self = this;
    EventBus.$on("framecounter", function(framenr) {
      self.framenr = framenr;
    })
  },
  methods: {
    isAllowed: function(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/[a-zA-Z0-9\-\[\]\\=!#$.,:;]/.test(char)) return;
      e.preventDefault();
    },
    resetCounter: function() {
        EventBus.$emit('resetframecounter')
    }
  },
  template: `
<div class="fn-settings">
  <h3 v-if="$slots.default"><slot></slot></h3>
  <input v-model="name" placeholder="description" @keypress="isAllowed($event)"><br>
  <input v-model="extra" placeholder="extra text" @keypress="isAllowed($event)">

  <button-bar v-if="$cfg.magn" v-bind:selected.sync="magn" v-bind:buttons="$cfg.magn">Magnification</button-bar>
  <button-bar v-if="$cfg.magnfraction" v-bind:selected.sync="magnfraction" v-bind:buttons="$cfg.magnfraction">Magnification-fraction</button-bar>
  <button-bar v-if="$cfg.objective" v-bind:selected.sync="objective" v-bind:buttons="$cfg.objective">Objective</button-bar>
  <button-bar v-if="$cfg.reduction" v-bind:selected.sync="reduction" v-bind:buttons="$cfg.reduction">Reduction</button-bar>
  <button-bar v-if="$cfg.barlow" v-bind:selected.sync="barlow" v-bind:buttons="$cfg.barlow">Barlow</button-bar>
  <button-bar v-if="$cfg.polarizer" v-bind:selected.sync="polarizer" v-bind:buttons="$cfg.polarizer">Polarizer</button-bar>
  <button-bar v-if="$cfg.immersion" v-bind:selected.sync="immersion" v-bind:buttons="$cfg.immersion">Immersion</button-bar>
  <button-bar v-if="$cfg.sequence" v-bind:selected.sync="sequence" v-bind:buttons="$cfg.sequence">Sequence</button-bar>
  <div :style="sequence === '' || sequence === 'Date-time' ? 'display: none;' : ''">
  <input    style="margin-right: 5px;" 
              type="button" 
              value="Reset stackframe"
              @click="resetCounter()"
  />
  Frames shot: #{{framenr}}
  </div>
</div>
`
})
