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
    }
  },
  computed: {
    // filename is a string containing the relevant information
    // it is the base the definitive name will be constructed somewhere else
    filename() {
      filename = "";
      if (this.name) filename += this.name + "-";
      filename += this.magn + '.' + this.magnfraction + "x-";
      if (this.reduction) filename += this.reduction + "-"
      if (this.barlow) filename += this.barlow + "-"
      if (this.polarizer) filename += this.polarizer + "-";
      if (this.immersion) filename += this.immersion + "-";
      if (this.extra) filename += this.extra + "-";
      return (filename);
    }
  },
  updated: function() {
    this.$emit("setfname", this.filename);
  },
  mounted: function() {
    this.$emit("setfname", this.filename);
  },
  methods: {

  },
  template: `
<div class="fn-settings">
  <h3 v-if="$slots.default"><slot></slot></h3>
  <input v-model="name" placeholder="description"><br>
  <input v-model="extra" placeholder="extra text">
  <button-bar v-bind:selected.sync="magn" v-bind:buttons="$cfg.magn">Magnification</button-bar>
  <button-bar v-bind:selected.sync="magnfraction" v-bind:buttons="$cfg.magnfraction">Magnification-fraction</button-bar>
  <button-bar v-bind:selected.sync="reduction" v-bind:buttons="$cfg.reduction">Reduction</button-bar>
  <button-bar v-bind:selected.sync="barlow" v-bind:buttons="$cfg.barlow">Barlow</button-bar>
  <button-bar v-bind:selected.sync="polarizer" v-bind:buttons="$cfg.polarizer">Polarizer</button-bar>
  <button-bar v-bind:selected.sync="immersion" v-bind:buttons="$cfg.immersion">Immersion</button-bar>
</div>
`
})
