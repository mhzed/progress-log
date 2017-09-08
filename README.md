progress-log
--------

For logging progress to console or log files:

1. Avoid excessive logging: log only when interval time or count exceeded
2. Tracks current speed (duration configurable)
3. Tracks total duration and speed
4. Customizable msg and log

## Usage

To install

    npm i progress-log
    
Example:

    import {ProgressLogger} from "progress-log";
    
    let logger = new ProgressLogger({});
    logger.tick(3000);
    logger.tick(3000);
    logger.tick(3000);
    logger.tick(3000);    // progress logged to console since > 10000 accumulated
    
    setTimeout( ()=>{
      logger.tick(1);     // progress logged to console since > 1s elapsed
    , 1001)
