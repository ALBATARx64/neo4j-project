const asyncHandler = require('express-async-handler')
const { getDriver } = require('./neo4j')
const driver = getDriver()
const session = driver.session()

exports.createUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body

    const newUser = await session.executeWrite(tx => {
        return tx.run(
          `MERGE (p:Person {name: $name})
          ON CREATE SET p.username = $username
          ON CREATE SET p.email = $email
          ON CREATE SET p.password = $password
          RETURN p.name, m.title`, {
            username,
            email,
            password,
          }
        )
    })

    if (newUser) {
        res.status(200).json({username, email})
    } else {
        res.status(400)
        throw new Error('User was not created')
    }
})

exports.getAllUsers = async() => {
    await session.executeRead(tx => {
        return tx.run(
          `MATCH (p:Person)
          RETURN p.name`,
        )
    })
}