"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const sec = (ms) => Math.floor(ms / 1000);
// Keep track of speed n/s for the last 'durationSec' 
class RatePerSec {
    constructor(durationSec) {
        this.ts = sec(Date.now()); // ts is tiemstamp of LAST count in history
        this.history = []; // count for each second.  this.ts points to last element
        _.times(durationSec, () => this.history.push(0));
    }
    tick(n) {
        let secNow = sec(Date.now());
        if (secNow > this.ts) {
            let delta = secNow - this.ts;
            _.times(delta, () => {
                this.history.shift();
                this.history.push(0);
            });
            this.ts = secNow;
        }
        this.history[this.history.length - 1] += n;
    }
    // returns average speed for last durationSec
    rate() {
        return _.sum(this.history) / this.history.length;
    }
}
exports.RatePerSec = RatePerSec;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0ZVBlclNlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJhdGVQZXJTZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0QkFBMkI7QUFFM0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxFQUFVLEtBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFFMUQsc0RBQXNEO0FBQ3REO0lBSUUsWUFBWSxXQUFtQjtRQUM3QixJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQSxDQUFHLDJDQUEyQztRQUN2RSxJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQSxDQUFXLHlEQUF5RDtRQUNyRixDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVELElBQUksQ0FBQyxDQUFTO1FBQ1osSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUN0QixDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFBO1FBQ2xCLENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQsNkNBQTZDO0lBQzdDLElBQUk7UUFDRixNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDbkQsQ0FBQztDQUNGO0FBM0JELGdDQTJCQyJ9