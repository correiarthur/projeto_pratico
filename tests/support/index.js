
const { test: base } = require('@playwright/test')
import { LoginUser } from '../pages/LoginUser'
import { RegisterUser } from '../pages/RegisterUser'

const test = base.extend({
    page: async ({ page }, use) => {
        const context = page
        context['register'] = new RegisterUser(page),
        context['login'] = new LoginUser(page)
        await use(context)
    }
})

export { test }