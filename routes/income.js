const fs = require('fs');
const outcomeFile = 'outcomeStatictic.txt'
const incomeFile = 'incomeStatistic.txt'
const router = require("express").Router();
const updateData = (id, requetBody, array) => {
    let status
    let object = array.ifnd(item => { return item.id == id });
    if (object === undefined) {
        status = 404;
        return status;
    }
    else {
        if (requetBody.description) {
            object.description = requetBody.description;
        };
        if (requetBody.amount) {
            object.amount = requetBody.amount;
        }
        status = 200;
        return status;
    }
}

const deleteteData = (req, array, total) => {
    let index = array.find(income => { return income.id == req.params.id });
    if (index != 'undefined') {
        total -= index.amount
        array = array.filter(income => { return income != index })
        return { array, total }
    }
    else {
        return 'error'
    }
}

const caculatePercentage = (totalInc, outcomes) => {
    if (totalInc != 0) {
        outcomes.forEach(outcome => {
            outcome.percentage = Math.floor(100 * outcome.amount / totalInc);
        });
    } else {
        outcomes.forEach(outcome => {
            outcome.percentage = '';
        });
    }
}

function Log(route, method, time) {
    this.route = route;
    this.method = method;
    this.time = time;
}

const serverLogs = (req) => {
    let route = req.url, t = new Date(),
        day = t.getDate(), month = t.getMonth(), year = t.getFullYear(), hours = t.getHours(),
        minute = t.getMinutes(), s = t.getSeconds();
    time = `${day}-${month}-${year} ${hours}:${minute}:${s}`,
        method = req.route.methods, fmethod = '',
        froute = route.substring(1, route.length);
    let file;
    for (let i in method) {
        fmethod = i;
    }
    let log = new Log(froute, fmethod, time)
    let f = froute.search('incomes')
    if (f == 0) {
        file = incomeFile
    } else {
        file = outcomeFile
    }
    fs.readFile(file, 'utf8', (err, doc) => {
        doc = JSON.parse(doc)
        doc.push(log)
        fs.writeFileSync(file, JSON.stringify(doc))
    })
}

const getServerLogs = (res) => {
    fs.readFile(incomeFile, 'utf8', (err, doc) => {
        doc = JSON.parse(doc)
        fs.readFile(outcomeFile, 'utf8', (err, outdoc) => {
            outdoc = JSON.parse(outdoc)
            res.status(200).json({ income: doc, outcome: outdoc })
        })
    })
}

module.exports = router;