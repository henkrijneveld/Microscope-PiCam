var EventBus = new Vue();

var vm = new Vue({
    el: '#microscopeapp',
    data: {
        fname: 'testname',
        displayLayout: 'layout-all',
        camerawidth: 500,
        hostname: 'unknown'
    },
    mounted: function() {
      this.hostname = location.hostname
      this.selectAll();
    },
    created: function() {
        window.addEventListener("resize", this.resizeWindow);
    },
    destroyed: function() {
        window.removeEventListener("resize", this.resizeWindow);
    },
    methods: {
        resizeWindow (event) {
            if (this.displayLayout === 'layout-all') {
                this.selectAll();
            }
            if (this.displayLayout === 'layout-filename') {
                this.selectFilename();
            }
            if (this.displayLayout === 'layout-settings') {
                this.selectSettings();
            }
            if (this.displayLayout === 'layout-camera') {
                this.selectCamera();
            }
        },
        selectAll: function() {
            this.displayLayout = 'layout-all';
            this.camerawidth = this.$refs.gridcontainer.clientWidth - 790;
        },
        selectFilename: function() {
            this.displayLayout = 'layout-filename';
            this.camerawidth = this.$refs.gridcontainer.clientWidth - 410;
        },
        selectSettings: function() {
            this.displayLayout = 'layout-settings';
            this.camerawidth = this.$refs.gridcontainer.clientWidth - 410;
        },
        selectCamera: function() {
            this.displayLayout = 'layout-camera';
            this.camerawidth = this.$refs.gridcontainer.clientWidth - 20;
        }
    }
})

