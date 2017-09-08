"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("../");
const future = require("phuture");
exports.testlog = (test) => {
    // ensure no print when < intervalCount 
    let logger = new _1.ProgressLogger({});
    logger.logFunc = (msg) => {
        test.ok(false, "should not be called");
    };
    logger.tick(500);
    // ensure print when >= intervalcont
    let called = false;
    logger.logFunc = (msg) => { called = true; };
    logger.tick(9501);
    test.ok(called, "should be called");
    // ensure no print when < intervalSecs
    logger.logFunc = (msg) => {
        test.ok(false, "should not be called");
    };
    future.once(100, () => {
        logger.tick(500);
        future.once(100, () => {
            logger.tick(500);
            future.once(810, () => {
                // ensure print when >= intervalSecs
                let called = false;
                logger.logFunc = (msg) => { called = true; };
                logger.tick(1);
                test.ok(called, "should be called");
                test.done();
            });
        });
    });
    test.done();
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1wcm9ncmVzcy1sb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXN0LXByb2dyZXNzLWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDBCQUFtQztBQUNuQyxrQ0FBa0M7QUFFbEMsT0FBTyxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQW9CO0lBRXJDLHdDQUF3QztJQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLGlCQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQVU7UUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUE7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLG9DQUFvQztJQUNwQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDbkIsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQVUsT0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFBLENBQUEsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUVwQyxzQ0FBc0M7SUFDdEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQVU7UUFDMUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUE7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNmLG9DQUFvQztnQkFDcEMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBVSxPQUFJLE1BQU0sR0FBRyxJQUFJLENBQUEsQ0FBQSxDQUFDLENBQUM7Z0JBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0lBRUYsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFBIn0=