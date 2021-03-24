// algorithm based on public codepen: https://codepen.io/aNNiMON/pen/OqjGVP

Vue.component("histo-gram", {
    data: function() {
        return {
            brightnessHistogram: true,
            timer: null,
        }
    },
    props: {
      sourceimg: {
          type: String,
          required: true
      }
    },
    mounted: function() {
        this.timer = setInterval(() => this.update(this.brightnessHistogram), 500);
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        processImageBrightness: function(inImg) {
            if (inImg === null) return;
            const src = new Uint32Array(inImg.data.buffer);

            let histBrightness = (new Array(256)).fill(0);
            for (let i = 0; i < src.length; i++) {
                let r = src[i] & 0xFF;
                let g = (src[i] >> 8) & 0xFF;
                let b = (src[i] >> 16) & 0xFF;
                let l = Math.floor((3 * g + 2.7 * r + 2.4 * b) / 8.1); // relative values determined empiracally
//                histBrightness[l]++;
                histBrightness[r]++;
                histBrightness[g]++;
                histBrightness[b]++;
            }

            histBrightness[0] = 0;
            maxBrightness = Math.max(...histBrightness);

            const canvas = document.getElementById('canvasHistogram');
            const ctx = canvas.getContext('2d');
            let guideHeight = 8;
            let startY = (canvas.height - guideHeight);
            let dx = canvas.width / 256;
            let dy = startY / maxBrightness;
            ctx.lineWidth = dx * 2;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 1; i < 256; i++) {
                let x = i * dx;
                // Value
                ctx.strokeStyle = "#666666";
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, startY - histBrightness[i] * dy);
                ctx.closePath();
                ctx.stroke();

                // Guide
                ctx.strokeStyle = 'rgb(' + i + ', ' + i + ', ' + i + ')';
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, canvas.height);
                ctx.closePath();
                ctx.stroke();
            }
        },
        processImageColor: function(inImg) {
            if (inImg === null) return;
            const src = new Uint32Array(inImg.data.buffer);

            let histR = (new Array(256)).fill(0);
            let histG = (new Array(256)).fill(0);
            let histB = (new Array(256)).fill(0);
            for (let i = 0; i < src.length; i++) {
                let r = src[i] & 0xFF;
                let g = (src[i] >> 8) & 0xFF;
                let b = (src[i] >> 16) & 0xFF;
                histR[r]++;
                histG[g]++;
                histB[b]++;
            }

            histR[0] = 0;
            histG[0] = 0;
            histB[0] = 0;
            maxBrightnessR = Math.max(...histR);
            maxBrightnessG = Math.max(...histG);
            maxBrightnessB = Math.max(...histB);

            const canvas = document.getElementById('canvasHistogram');
            const ctx = canvas.getContext('2d');
            let guideHeight = 8;
            let startY = (canvas.height - guideHeight);
            let dx = canvas.width / 256;
            let dyR = startY / maxBrightnessR;
            let dyG = startY / maxBrightnessG;
            let dyB = startY / maxBrightnessB;

            ctx.lineWidth = dx * 2;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 1; i < 256; i++) {
                let x = i * dx;

                // Green
                ctx.strokeStyle = "rgba(0,210,0,0.7)";
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, startY - histG[i] * dyG);
                ctx.closePath();
                ctx.stroke();
                // Red
                ctx.strokeStyle = "rgba(220,0,0,0.7)";
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, startY - histR[i] * dyR);
                ctx.closePath();
                ctx.stroke();
                // Blue
                ctx.strokeStyle = "rgba(0,0,255,0.3)";
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, startY - histB[i] * dyB);
                ctx.closePath();
                ctx.stroke();

                // Guide
                ctx.strokeStyle = 'rgb(' + i + ', ' + i + ', ' + i + ')';
                ctx.beginPath();
                ctx.moveTo(x, startY);
                ctx.lineTo(x, canvas.height);
                ctx.closePath();
                ctx.stroke();
            }
        },
        getImageData: function(el) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            const img = document.getElementById(el);
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            if (canvas.width === 0 || canvas.height === 0) {
                return null;
            }
            context.drawImage(img, 0, 0);
            return context.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
        },
        update: function(histoType) {
            this.brightnessHistogram = histoType;
            if (histoType) {
                this.processImageBrightness(this.getImageData(this.sourceimg));
            } else {
                this.processImageColor(this.getImageData(this.sourceimg));
            }
        }
    },

    template: `
<div class="histogram">
<h3 v-if="$slots.default"><slot></slot></h3>
<div class="card">
    <input  style="margin-right: 5px;" 
            type="button" 
            v-bind:value="'Totals'"
            v-bind:style="brightnessHistogram ? 'color: red;' : 'color: inherit;'"
            v-on:click="update(true)"/>
    <input  style="margin-right: 5px;" 
            type="button" 
            v-bind:value="'Color'"
            v-bind:style="!brightnessHistogram ? 'color: red;' : 'color: inherit;'"
            v-on:click="update(false)"/>
    <span> Histogram</span>            
  <canvas id="canvasHistogram" width="256" height="150"></canvas>
</div>
</div>
`
})
