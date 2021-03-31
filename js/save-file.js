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
        // makes the filename unique and adds type
        getFullname() {
            fullname = filename;
            fd = new Date();
            fullname += filedate = fd.getFullYear().toString().slice(-2) + ("0" + (fd.getMonth() + 1)).slice(-2) + ("0" + (fd.getDate())).slice(-2) + "-" + ("0" + fd.getHours()).slice(-2) + ("0" + fd.getMinutes()).slice(-2) + ("0" + fd.getSeconds()).slice(-2);
            fullname += ".jpg";
            return (fullname);
        }
    },
    template: `
<div class="savefile">
<a class="buttonstyle" :download="getFullname()" :href="$cfg.shotEndpoint + '?fn=' + getFullname()"><slot></slot></a>
</div>
`
})
