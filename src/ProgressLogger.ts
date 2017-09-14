
import {RatePerSec} from "./RatePerSec"

export class ProgressLogger {
  
  public logFunc : ((string)=>void) = console.log;  // change it if you like
  readonly total : number;
  readonly schema : string;
  private lastc : number;
  private lastTs : number;
  private c : number;
  private completed : boolean;
  private _duration: number;
  private rate : RatePerSec;
  private beginTs : number;
  private intervalSeconds : number;
  private intervalCount : number;

  // set total to  Number.MAX_SAFE_INTEGER for open ended progress
  constructor({
    schema = ":current:total :percent  :elapseds :rate/s",
    total = Number.MAX_SAFE_INTEGER,  // default open-ended
    rateSeconds = 10,                 // for speed, keep track last 10 seconds 
    intervalSeconds = 1,              // log progress when either: >= intervalSeconds elapsed
    intervalCount = 10000             //                       or: >= intervalCount ticked
  } : {
    schema?: string,
    total?: number ,
    rateSeconds?: number,
    intervalSeconds?: number,
    intervalCount?: number
  }) {
    this.total = total;
    this.schema = schema;
    this.lastc = this.c = 0;
    this.completed = false;
    this._duration = 0;
    this.rate = new RatePerSec(rateSeconds);
    this.lastTs = this.beginTs = Date.now();
    this.intervalCount = intervalCount;
    this.intervalSeconds = intervalSeconds;
  }

  private formatProgress() : string {
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
  
  private print() : boolean {
    if (this.c - this.lastc >= this.intervalCount ||
        Date.now() - this.lastTs >= this.intervalSeconds*1000) {
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
  tick(n: number) : boolean {
    this.rate.tick(n);
    this.c += n;
    let ret = this.print();
    
    this.completed = (this.c >= this.total);
    if (this.completed) {
      this._duration = this.elapsed();
    }
    return ret;
  }
  
  elapsed(): number {
    return (Date.now() - this.beginTs) / 1000;
  }

  speed(): number {
    return this.completed ? (this.c/this._duration) : (this.c/this.elapsed());
  }

  duration() : number {
    return this._duration;
  }
  done(): boolean {
    return this.completed;
  }
}