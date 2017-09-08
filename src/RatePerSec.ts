import * as _ from 'lodash'

const sec = (ms: number) : number => Math.floor(ms / 1000)

// Keep track of speed n/s for the last 'durationSec' 
export class RatePerSec {
  private ts : number;
  private history : number[];

  constructor(durationSec: number) {
    this.ts = sec(Date.now())   // ts is tiemstamp of LAST count in history
    this.history = []           // count for each second.  this.ts points to last element
    _.times(durationSec, () => this.history.push(0))
  }

  tick(n: number): void {
    let secNow = sec(Date.now())
    if (secNow > this.ts) {
      let delta = secNow - this.ts;
      _.times(delta, () => {
        this.history.shift()
        this.history.push(0)
      })
      this.ts = secNow
    }
    this.history[this.history.length - 1] += n
  }

  // returns average speed for last durationSec
  rate(): number {
    return _.sum(this.history) / this.history.length;
  }
}