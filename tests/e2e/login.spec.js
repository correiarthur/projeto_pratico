const { test } = require('../support')
const { faker } = require('@faker-js/faker')

test('logando usuário', async ({ page }) => {
    const registerEmail = faker.internet.email()
    const registerPassword = faker.internet.password()
    await page.register.visit()
    await page.login.openPageLogin()
    await page.register.registerData(registerEmail, registerPassword)
    await page.login.insertCredentials(registerEmail, registerPassword)
    await page.login.loginCheckPoint()
});