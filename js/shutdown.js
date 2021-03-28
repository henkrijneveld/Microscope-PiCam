Vue.component("shut-down", {
    data: function() {
        return {
          down: false,  // assume up,
          message: "Shutdown PI"
        }
    },
    methods: {
        shutdown: function() {
            if(confirm('Shutdown PI? (Restart requires power down and up)')) {
              this.down = true;
              this.message = "PI Down (!)"
              axios
                .put(this.$cfg.controlendpoint, {command: "shutdown"}, {timeout: 5})
                .then(response => {
                  console.log("PI Down");
                })
                .catch(error => {
                  console.log("PI Down");
                })
                .finally(() => {
                })
            }
        }
    },
    template: `
<div class="shutdown">
<p class="buttonstyle" @click="shutdown()">
  <span :style="down ? 'color:red;' : ''">
      {{message}}
  </span>
</p>
</div>
`
})
