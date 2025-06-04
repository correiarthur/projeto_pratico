const { expect } = require('@playwright/test')

export class LoginUser {
    constructor(page) {
        this.page = page
    }
    async openPageLogin() {
        await this.page.click('//a[text()="My Account"]')
        await expect(this.page.locator('div.u-column1').getByRole('heading')).toHaveText('Login')
    }
    async insertCredentials(email, password) {
        await this.page.locator('#username').fill(email)
        await this.page.locator('#password').fill(password)
        await this.page.locator(password)
        await this.page.getByRole('button', { name: 'Login' }).click()
    }
    async loginCheckPoint() {
        const boasVindas = this.page.locator('//a[text()="Dashboard"]')
        await expect(boasVindas).toBeVisible()
    }
}