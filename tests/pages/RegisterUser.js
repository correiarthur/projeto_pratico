const { expect } = require('@playwright/test')

export class RegisterUser {
    constructor(page) {
        this.page = page
    }
    async visit() {
        await this.page.goto('/')
    }
    async openPageRegister() {
        await this.page.click('//a[text()="My Account"]')
        await expect(this.page.locator('div.u-column2').getByRole('heading')).toHaveText('Register')
    }
    async registerData(email, password) {
        await this.page.locator('#reg_email').fill(email)
        await this.page.locator('#reg_password').fill(password)
        await this.page.getByRole('button', { name: 'Register' }).click()
    }
    async validaCadastro(){
        const boasVindas = this.page.locator('//a[text()="Dashboard"]')
        await expect(boasVindas).toBeVisible()
    }
    async duplicRegisterCheckPoint() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/An account is already registered/)
    }
    async validaMensagemErroEmail() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/Please provide a valid email address/)
    }
    async validaMensagemErroSenha() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/Please enter an account password/)
    }
}
