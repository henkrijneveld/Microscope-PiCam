Vue.component("save-file", {
    data: function() {
        return {
        }
    },
    props: {
        filename: {
            type: String,
            required: true
        }
    },
    methods: {
    },
    template: `
<div class="savefile">
<h3 v-if="$slots.default"><slot></slot></h3>
<a class="buttonstyle" :download="filename" :href="$cfg.shotEndpoint + '?fn=' + filename">Download image</a>
</div>
`
})
