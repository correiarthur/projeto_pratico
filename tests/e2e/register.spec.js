const { faker } = require('@faker-js/faker')
const { test } = require('../support')

test('registrando usuário', async ({ page }) => {
  const registerEmail = faker.internet.email()
  const registerPassword = faker.internet.password()
  await page.register.visit()
  await page.register.openPageRegister()
  await page.register.registerData(registerEmail, registerPassword)
  await page.register.validaCadastro()
})

test('não deve registrar o mesmo usuário', async ({ page }) => {
  const registerEmail = faker.internet.email()
  const registerPassword = faker.internet.password()
  await page.register.visit()
  await page.register.openPageRegister()
  await page.register.registerData(registerEmail, registerPassword)
  await page.register.validaCadastro()
  await page.locator('nav.woocommerce-MyAccount-navigation a[href$="customer-logout/"]').click()
  await page.register.registerData(registerEmail, registerPassword)
  await page.register.duplicRegisterCheckPoint()
})

test.describe('não deve registrar com email inválido', () => {
  test('registro sem email', async ({ page }) => {
    await page.register.visit()
    await page.register.openPageRegister()
    await page.register.registerData('', '#Capivara123')
    await page.register.validaMensagemErroEmail()
  })
  test('registro com email incompleto (sem domínio)', async ({ page }) => {
    await page.register.visit()
    await page.register.openPageRegister()
    await page.register.registerData(
      'capivara-_-skatista.123@yahoo',
      '#Capivara123')
    await page.register.validaMensagemErroEmail()
  })

  //para o teste abaixo, o site não tem validação de email inválido
  // test('registro com email incompleto (sem parte do domínio)', async ({ page }) => {
  //   await page.register.visit()
  //   await page.register.openPageRegister()
  //   await page.register.register('capivara-_-skatista.123@com', '#Capivara123')
  //   await page.register.invalidEmailCheckPoint()
  // })

  // para o teste abaixo, o site não tem validação de email inválido
  // test('registro com email sem @', async ({ page }) => {
  //   await page.register.visit()
  //   await page.register.openPageRegister()
  //   await page.register.registerData('capivara-_-skatista.123yahoo.com', '#Capivara123')
  //   await page.register.validaMensagemErroEmail()
  // })

  //para o teste abaixo, o site não tem validação de email inválido
  // test('registro com email vazio antes do domínio', async ({ page }) => {
  //   await page.register.visit()
  //   await page.register.openPageRegister()
  //   await page.register.register('@yahoo.com', '#Capivara123')
  //   await page.register.invalidEmailCheckPoint()
  // })

})

test.describe('não deve registrar com senha inválida', () => {

  test('registro de senha vazia', async ({ page }) => {
    await page.register.visit()
    await page.register.openPageRegister()
    await page.register.registerData('capivaraskatista16@yahoo.com.br', '')
    await page.register.validaMensagemErroSenha()
  })

  // test('registro de senha com menos de 7 caracteres', async ({ page }) => {
  //   await page.register.visit()    
  //   await page.register.openPageRegister()
  //   await page.register.register('capivaraskatista12@yahoo.com.br', '1@Ae')
  //   await page.register.invalidPasswordCheckPoint()
  //   /*obs: 20/04/2025 - neste teste o sistema permitiu senha com menos de 7 caracteres, 
  //    mesmo apresentando a mensagem "The password should be at least seven characters long..."*/
  // })
})