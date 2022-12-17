const neo4j = require('neo4j-driver')

let driver
// const driver = neo4j.driver('bolt://44.212.63.60:7687', neo4j.auth.basic('neo4j', 'strip-assistance-windlasses'))

const initDriver = async(uri, username='', password='') => {
    driver = neo4j.driver(
        uri,
        neo4j.auth.basic(
            username,
            password,
        )
    )

    await driver.verifyConnectivity()
}

const getDriver = () => {
    initDriver('neo4j://localhost:7687')
    return driver
}

module.exports = {
    initDriver,
    getDriver,
}