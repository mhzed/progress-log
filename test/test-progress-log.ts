import * as nodeunit from "nodeunit";
import {ProgressLogger} from "../";
import * as future from "phuture";

exports.testlog = (test : nodeunit.Test) => {
  
  // ensure no print when < intervalCount 
  let logger = new ProgressLogger({});
  logger.logFunc = (msg:string)=>{
    test.ok(false,"should not be called");
  }
  logger.tick(500);

  // ensure print when >= intervalcont
  let called = false;
  logger.logFunc = (msg:string)=>{called = true};
  logger.tick(9501);
  test.ok(called, "should be called");

  // ensure no print when < intervalSecs
  logger.logFunc = (msg:string)=>{
    test.ok(false,"should not be called");
  }
  future.once(100, ()=>{
    logger.tick(500);
    future.once(100, ()=>{
      logger.tick(500);
      future.once(810, ()=>{
        // ensure print when >= intervalSecs
        let called = false;
        logger.logFunc = (msg:string)=>{called = true};
        logger.tick(1);
        test.ok(called, "should be called");
        test.done();
      })
    })
  })
}