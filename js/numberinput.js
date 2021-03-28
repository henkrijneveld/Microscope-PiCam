Vue.component("number-input", {
    data: function() {
        return {
          val: null
        }
    },
    props: {
        value: {
          type: Number,
          required: true
        },
        minval: {
          type: Number,
          required: true
        },
        maxval: {
          type: Number,
          required: true
        },
        command: {
            type: String,
            required: true
        }
    },
    watch: {
      value: function(newVal, oldVal) { // watch it
        if (newVal !== oldVal) {
          this.val = this.value;
          this.updatevalue();
        }
      }
    },
    created: function () {
      this.val = this.value;
      this.updatevalue();
    },
    mounted: function() {
      var self = this;
      EventBus.$on("updateserver", function() {
        self.updatevalue();
      })
    },
    methods: {
        changevalue: function(amount) {
            this.val += amount;
            if (this.val < this.minval) this.val = this.minval;
            if (this.val > this.maxval) this.val = this.maxval;
            this.$emit("update:value", this.val);
        },
        updatevalue: function() {
            axios
              .put(this.$cfg.controlendpoint, { command: this.command, value: this.val })
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
<div class="numberinput">
<span class="title"><slot></slot></span><br> 
<input type="button" value="-10" @click="changevalue(-10)"/>
<input type="button" value="-1" @click="changevalue(-1)"/>
<input class="nospin" type="number" v-model.number="val" :min="minval" :max="maxval" size="4" @focusout="updatevalue()" />
<input type="button" value="+1" @click="changevalue(1)"/>
<input type="button" value="+10" @click="changevalue(10)"/>
</div>
`
})
