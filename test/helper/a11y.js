import FileSystem, { fstat } from 'fs'
import {source as axeSource} from 'axe-core';


function runAccessibilityAudit(fileName) {
    const fileDelimiter = ','
    fileName = `${fileName.split('.')[0]}_${getDateTime()}.csv`
    browser.execute(axeSource)
    const options = { runOnly: { type: 'tag', values: ['wcag21aa'] } }
    let results = browser.executeAsync(done => {
        axe.run(
            {
                runOnly: {
                    type: 'tag',
                    values: ['wcag2a', 'wcag21aa', 'best-practice']
                }
            }, (err, results) => {
                if (err) done(err)
                done(results)
            })
    })


    let violationsToWrite = []

    if (results.violations.length > 0) {
        let indexOfViolation = 0
        for (const i in results.violations) {
            let description = `"${results.violations[i].description.replace(/\n/g, ':')}"`
            let help = results.violations[i].help
            let helpUrl = results.violations[i].helpUrl
            let id = results.violations[i].id

            if (results.violations[i].nodes.length > 0) {
                for (let j in results.violations[i].nodes) {
                    let failureSummary = `"${results.violations[i].nodes[j].failureSummary.replace(/\n/g, ':')}"`
                    let impact = results.violations[i].nodes[j].impact
                    let violationToInsert = description + fileDelimiter + impact + fileDelimiter + failureSummary + fileDelimiter + id + fileDelimiter + help + fileDelimiter + helpUrl
                    if (!violationsToWrite.includes(violationToInsert)) {
                        violationsToWrite[indexOfViolation] = violationToInsert
                    }

                    indexOfViolation = indexOfViolation + 1
                }
            }
        }
    }

    WriteViolations(violationsToWrite, fileName, fileDelimiter)
    return results
}

function WriteViolations(violationsData, fileName, fileDelimiter) {
    const dir = './reports/'

    if(!FileSystem.existsSync(dir)){
        FileSystem.mkdirSync(dir, {recursive: true})
    }

    let headerLine = `description${fileDelimiter}impact${fileDelimiter}failureSummary${fileDelimiter}id${fileDelimiter}help${fileDelimiter}helpUrl`
    violationsData.unshift(headerLine)
    violationsData.forEach(element => {
        FileSystem.appendFileSync(dir + fileName, element)
        FileSystem.appendFileSync(dir + fileName, '\n')
        FileSystem.mkdirSync
    })
}

function getDateTime() {
    let currentdatetime = new Date()
    let currDay = currentdatetime.getDate().toString()
    let currMonth = (currentdatetime.getMonth() + 1).toString()
    let currYear = currentdatetime.getFullYear().toString()
    let currHour = currentdatetime.getHours().toString()
    let currMin = currentdatetime.getMinutes().toString()

    return currYear + currMonth + currDay + currHour + currMin
}

export default {
    runAccessibilityAudit,
};