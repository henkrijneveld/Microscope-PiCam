Vue.component("select-input", {
    data: function() {
        return {
          sel: null
        }
    },
    props: {
        wblist: {
          type: Array,
          required: true
        },
        selected: {
          type: String,
          required: true
        },
        command: {
          type: String,
          required: true
        }
    },
    created: function () {
      this.sel = this.selected;
      this.updatevalue();
    },
    mounted: function() {
      var self = this;
      EventBus.$on("updateserver", function() {
        self.updatevalue();
      })
    },
    methods: {
        updatevalue: function() {
            this.$emit("update:selected", this.sel);
            axios
              .put(this.$cfg.controlendpoint, { command: this.command, value: this.sel })
              .then(response => {
                console.log("succes: "+ response.data);
              })
              .catch(error => {
                console.log(error.response.data);
              })
              .finally(() => {
              })
        }
    },
    template: `
<div class="selectinput">
<span class="title"><slot></slot></span><br>
<select style="min-width: 200px;" v-model="sel" @change="updatevalue()">
  <option v-for="wboption in wblist" v-bind:value="wboption.value">
    {{ wboption.text }}
  </option>
</select>
</div>
`
})

