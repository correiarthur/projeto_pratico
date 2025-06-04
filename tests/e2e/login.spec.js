import { test } from '../support'

test('logando usuário', async ({ page }) => {
    await page.register.visit()
    await page.login.openPageLogin()
    await page.login.insertCredentials(
        'capivaradredy@yahool.com.br',
        '#Capivara123')
    await page.login.loginCheckPoint()
});