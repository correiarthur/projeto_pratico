// @ts-check
import { expect } from '@playwright/test'

export class RegisterUser {
    constructor(page) {
        this.page = page
    }
    async visit() {
        await this.page.goto('/')
    }
    async openPageRegister() {
        await this.page.click('//a[text()="My Account"]')
        await expect(
            this.page.locator('div.u-column2').getByRole('heading')
        ).toHaveText('Register')
    }
    async register(email, password) {
        await this.page.locator('#reg_email').fill(email)
        await this.page.locator('#reg_password').fill(password)
        await this.page.getByRole('button', { name: 'Register' }).click()
        await this.page.locator('a[href$="customer-logout/"]')
    }
    async duplicRegisterCheckPoint() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/An account is already registered/)
    }
    async invalidEmailCheckPoint() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/Please provide a valid email address/)
    }

    async invalidPasswordCheckPoint() {
        const errorLi = this.page.locator('ul.woocommerce-error li')
        await expect(errorLi).toHaveText(/Please enter an account password/)
    }
}
