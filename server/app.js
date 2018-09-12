const express = require('express');
const fs = require('fs');
const app = express();

// creating the log.csv file with the right header
var infoStream = fs.createWriteStream('log.csv');
var header = "Agent,Time,Method,Resource,Version,Status, \n";
infoStream.write(header);


app.use((req, res, next) => {
    // write your logging code here
    var date = new Date();
    var dateISO = date.toISOString();

    // writing log into to the csv file
    infoStream.write(req.headers['user-agent'] + "," + dateISO + "," + req.method + "," + req.path + "," + req.protocol.toUpperCase() + "/" + req.httpVersion + "," + res.statusCode + "," + "\n");

    // writing log to the console
    var log = req.headers['user-agent'] + "," + dateISO + "," + req.method + "," + req.path + "," + req.protocol.toUpperCase() + "/" + req.httpVersion + "," + res.statusCode + "," + "\n";
    console.log(log)

    // check if log is over 20 lines. If it is, copy the log file to log1 and reset log file to blank
    fs.readFile('log.csv', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }

        else {
            var arr = data.split('\n');

            // if there's less than 20 lines, give me the data, with each line as a new object in the array, formatted like JSON data
            if (arr.length < 20) {
                console.log('less than 20')
            }

            // if there's more than 20 lines, copy data from logs to logs1 file and reset log file to blank
            else {
            
                    // if there's more than 20 lines, copy data from logs to logs1 file and reset log file to blank        
                    fs.copyFile('log.csv', 'log1.csv', (err) => {
                        if (err) throw err;
                        console.log('Log file over 20 lines. Copied to new file. About to wipe file.');
                        fs.writeFile('log.csv', header, function (err) {
                            if (err) throw err;
                            console.log('Log file over 20 lines. Original file wiped.');
                        });

                    });                    

                };
            };
        });

    next();
});

// create a variable called logs, then have one infoStream.write with a really long line and console log that variable


app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.send("ok");

});

app.get('/logs', (req, res) => {
    // write your code to return a json object containing the log data here

    // grabbing the data from the log.csv file
    fs.readFile('log.csv', 'utf8', function read(err, data) {
        if (err) {
            throw err;
        }

        else {
            var arr = data.split('\n');
            var comboArr = [];

            // show the data as an object on /logs page
            for (i = 1; i < arr.length - 1; i++) {
                var indivLog = arr[i];
                var indivLogArray = indivLog.split(",");
                var agent = indivLogArray[0] + indivLogArray[1];
                var time = indivLogArray[2];
                var method = indivLogArray[3];
                var resource = indivLogArray[4];
                var version = indivLogArray[5];
                var status = indivLogArray[6];
                var obj = {
                    "Agent": agent,
                    "Time": time,
                    "Method": method,
                    "Resource": resource,
                    "Version": version,
                    "Status": status,
                };
                comboArr.push(obj);
            }

            res.send(comboArr);

        };
    });
});


module.exports = app;






