"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RatePerSec_1 = require("./RatePerSec");
class ProgressLogger {
    // set total to  Number.MAX_SAFE_INTEGER for open ended progress
    constructor({ schema = ":current:total :percent  :elapseds :rate/s", total = Number.MAX_SAFE_INTEGER, // default open-ended
        rateSeconds = 10, // for speed, keep track last 10 seconds 
        intervalSeconds = 1, // log progress when either: >= intervalSeconds elapsed
        intervalCount = 10000 //                       or: >= intervalCount ticked
         }) {
        this.logFunc = console.log; // change it if you like
        this.total = total;
        this.schema = schema;
        this.lastc = this.c = 0;
        this.completed = false;
        this._duration = 0;
        this.rate = new RatePerSec_1.RatePerSec(rateSeconds);
        this.lastTs = this.beginTs = Date.now();
        this.intervalCount = intervalCount;
        this.intervalSeconds = intervalSeconds;
    }
    formatProgress() {
        let fProgress = this.c / this.total;
        let elapsedSec = (Date.now() - this.beginTs) / 1000;
        let sperc = (this.isOpenEnded()) ? "" : ((fProgress * 100).toFixed(0) + "%");
        let stotal = (this.isOpenEnded()) ? "" : `(${this.total})`;
        let s = this.schema.replace(":bar", "")
            .replace(":current", `${this.c}`)
            .replace(":total", stotal)
            .replace(":percent", sperc)
            .replace(":elapsed", elapsedSec.toFixed(1))
            .replace(":rate", this.rate.rate().toFixed(1));
        return s;
    }
    print() {
        if (this.c - this.lastc >= this.intervalCount ||
            Date.now() - this.lastTs >= this.intervalSeconds * 1000) {
            this.logFunc(this.formatProgress());
            this.lastc = this.c;
            this.lastTs = Date.now();
            return true;
        }
        return false;
    }
    isOpenEnded() {
        return this.total == Number.MAX_SAFE_INTEGER;
    }
    // returns true if status printed
    tick(n) {
        this.rate.tick(n);
        this.c += n;
        let ret = this.print();
        this.completed = (this.c >= this.total);
        if (this.completed) {
            this._duration = this.elapsed();
        }
        return ret;
    }
    elapsed() {
        return (Date.now() - this.beginTs) / 1000;
    }
    speed() {
        return this.completed ? (this.c / this._duration) : (this.c / this.elapsed());
    }
    duration() {
        return this._duration;
    }
    done() {
        return this.completed;
    }
}
exports.ProgressLogger = ProgressLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3NMb2dnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQcm9ncmVzc0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZDQUF1QztBQUV2QztJQWVFLGdFQUFnRTtJQUNoRSxZQUFZLEVBQ1YsTUFBTSxHQUFHLDRDQUE0QyxFQUNyRCxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixFQUFHLHFCQUFxQjtRQUN2RCxXQUFXLEdBQUcsRUFBRSxFQUFrQix5Q0FBeUM7UUFDM0UsZUFBZSxHQUFHLENBQUMsRUFBZSx1REFBdUQ7UUFDekYsYUFBYSxHQUFHLEtBQUssQ0FBYSxvREFBb0Q7VUFPdkY7UUExQk0sWUFBTyxHQUFzQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUUsd0JBQXdCO1FBMkJ4RSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSx1QkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BDLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcs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