Vue.component("re-start", {
    data: function() {
        return {
            restarting: false,
            error: false
        }
    },
    methods: {
        start: function() {
            if (!this.restarting) {
                this.restarting = true;
                this.error = false;
                axios
                  .put(this.$cfg.controlendpoint, {command: "restart"})
                  .then(response => {
                      console.log("succes: " + response.data);
                      EventBus.$emit("updateserver");
                  })
                  .catch(error => {
                      this.error = true;
                      console.log(error.response.data);
                  })
                  .finally(() => {
                      this.restarting = false;
                  })
            }
        }
    },
    template: `
<div class="restart">
<p class="buttonstyle" @click="start()">
  <span :style="restarting ? 'color:lightgray;' : ''">
    <span :style="error ? 'color:red;' : ''">
      <slot></slot>
    </span>
  </span>
</p>
</div>
`
})
