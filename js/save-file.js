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
<a class="buttonstyle" :download="filename" :href="$cfg.shotEndpoint + '?fn=' + filename"><slot></slot></a>
</div>
`
})
