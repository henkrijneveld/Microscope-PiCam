Vue.component("file-name", {
  data: function() {
    return {
      name: '',
      extra: '',
      reduction: '',
      barlow: '',
      polarizer: '',
      immersion: '',
      magn: '0',
      magnfraction: '7',
      sequence: 'Date-time'
    }
  },
  computed: {
    // filename is a string containing the relevant information
    // it is the base the definitive name will be constructed somewhere else
    filename() {
      let fname = "";
      if (this.name) fname += this.name + "-";
      if (this.sequence === this.$cfg.sequence[1] || this.sequence === this.$cfg.sequence[2]) {
        fname += "{frame}" + "-";
      }
      fname += this.magn + '.' + this.magnfraction + "x-";
      if (this.reduction) fname += this.reduction + "-"
      if (this.barlow) fname += this.barlow + "-"
      if (this.polarizer) fname += this.polarizer + "-";
      if (this.immersion) fname += this.immersion + "-";
      if (this.extra) fname += this.extra + "-";
      if (this.sequence === this.$cfg.sequence[0] || this.sequence === this.$cfg.sequence[2]) {
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

  <button-bar v-bind:selected.sync="magn" v-bind:buttons="$cfg.magn">Magnification</button-bar>
  <button-bar v-bind:selected.sync="magnfraction" v-bind:buttons="$cfg.magnfraction">Magnification-fraction</button-bar>
  <button-bar v-bind:selected.sync="reduction" v-bind:buttons="$cfg.reduction">Reduction</button-bar>
  <button-bar v-bind:selected.sync="barlow" v-bind:buttons="$cfg.barlow">Barlow</button-bar>
  <button-bar v-bind:selected.sync="polarizer" v-bind:buttons="$cfg.polarizer">Polarizer</button-bar>
  <button-bar v-bind:selected.sync="immersion" v-bind:buttons="$cfg.immersion">Immersion</button-bar>
  <button-bar v-bind:selected.sync="sequence" v-bind:buttons="$cfg.sequence">Sequence</button-bar>
  <input    style="margin-right: 5px;" 
              type="button" 
              value="Reset stackframe"
              @click="resetCounter()"
  />
</div>
`
})
