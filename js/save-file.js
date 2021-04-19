Vue.component("save-file", {
    data: function() {
        return {
            framenr: 0
        }
    },
    props: {
        filename: {
            type: String,
            required: true
        }
    },
    mounted: function() {
        var self = this;
        EventBus.$on("resetframecounter", function() {
            self.framenr = 0;
        })
    },
    methods: {
        // makes the filename unique and adds type
        getFullname() {
            fd = new Date();
            let datum = fd.getFullYear().toString().slice(-2) + ("0" + (fd.getMonth() + 1)).slice(-2) + ("0" + (fd.getDate())).slice(-2) + "-" + ("0" + fd.getHours()).slice(-2) + ("0" + fd.getMinutes()).slice(-2) + ("0" + fd.getSeconds()).slice(-2);
            let fname = this.filename.replace("{datetime}", datum);
            if (fname.includes("{frame}")) {
                this.framenr += 1;
                fname = fname.replace("{frame}", "#" + this.framenr.toString().padStart(3, "0"));
            }
            fname += ".jpg";
            return(fname);
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
