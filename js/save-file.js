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
            let fullname = filename;
            fd = new Date();
            fullname += fd.getFullYear().toString().slice(-2) + ("0" + (fd.getMonth() + 1)).slice(-2) + ("0" + (fd.getDate())).slice(-2) + "-" + ("0" + fd.getHours()).slice(-2) + ("0" + fd.getMinutes()).slice(-2) + ("0" + fd.getSeconds()).slice(-2);
            fullname += ".jpg";
            return(fullname);
        },
        doDownload() {
            let fullname = this.getFullname();
            this.$refs.button.download = fullname;
            this.$refs.button.href = this.$cfg.shotEndpoint + '?fn=' + fullname;

        }
    },
    template: `
<div class="savefile">
<a ref="button" class="buttonstyle" @click="doDownload()"><slot></slot></a>
</div>
`
})
