import { BrowserContext, Page, test, expect } from "@playwright/test";
import {
  offId,
  productId,
  gtmId,
  pixelId,
  validCheckoutFormUserValues,
  validCheckoutFormPaymentValues,
  goUrl,
  payUrl,
} from "./mocks";
import { fillUserData } from "./utils/fillUserData";

test.describe.serial("(E2E) Checkout page", () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();

    page = await context.newPage();
  });

  test("should redirect to the correct page", async () => {
    await page.goto(`${goUrl}/${productId}?off=${offId}`);

    await expect(page).toHaveURL(
      `${payUrl}/${productId}?off=${offId}&gtm=${gtmId}&fpixel=${pixelId}`
    );
  });

  test("should register the pixel id correctly", async ({
    baseURL,
    context,
  }) => {
    await page.goto(
      `${baseURL}/${productId}?off=${offId}&gtm=${gtmId}&fpixel=${pixelId}`
    );

    const facebookPixelId = await page.evaluate(() => window.facebookPixel);

    await expect(facebookPixelId).toBe(pixelId);
  });

  test("should trigger form errors if the user dont fill any input", async () => {
    await page
      .getByRole("button", {
        name: "COMPRAR AGORA!",
      })
      .click();

    await expect(page.getByText("Informe o nome completo")).toBeVisible();
    await expect(page.getByText("Informe um e-mail")).toBeVisible();
    await expect(page.getByText("Informe o CPF")).toBeVisible();
    await expect(page.getByText("Informe um número de celular")).toBeVisible();
    await expect(
      page.getByText("O CEP deve conter 9 caracteres")
    ).toBeVisible();
    await expect(page.getByText("Informe o endereço")).toBeVisible();
    await expect(page.getByText("Informe o número")).toBeVisible();
    await expect(page.getByText("Informe o bairro")).toBeVisible();
    await expect(page.getByText("Informe a cidade")).toBeVisible();
    await expect(page.getByText("Mínimo 2 caracteres")).toBeVisible();
  });

  // TODO: prefer using the getBy* methods for better readability and accessibility as result
  test("should trigger form errors for any other invalid input", async () => {
    await page.locator('input[name="userData.name"]').fill("only_first_name");
    await page.locator('input[name="userData.email"]').fill("invalid_email");
    await page.locator('input[name="userData.document"]').fill("11111111111");
    await page.locator('input[name="userData.phone"]').fill("111");
    await page.locator('input[name="addressData.zipCode"]').fill("111");
    await page.locator('input[name="addressData.uf"]').fill("S");

    await expect(page.getByText("Informe ao menos um sobrenome")).toBeVisible();
    await expect(page.getByText("Forneça um e-mail válido")).toBeVisible();
    await expect(page.getByText("Documento não é válido")).toBeVisible();
    await expect(page.getByText("Informe seu telefone completo")).toBeVisible();
    await expect(
      page.getByText("O CEP deve conter 9 caracteres")
    ).toBeVisible();
    await expect(page.getByText("Mínimo 2 caracteres")).toBeVisible();
  });

  // TODO: prefer using the getBy* methods for better readability and accessibility as result
  test("should render correctly the credit card form", async () => {
    await page
      .getByRole("button", {
        name: "Cartão de Crédito",
      })
      .click();

    await expect(page.locator('input[name="cardNumber"]')).toBeVisible();
    await expect(page.locator('input[name="cardHolder"]')).toBeVisible();
    await expect(page.locator('input[name="cardDocument"]')).toBeVisible();
    await expect(page.locator('select[name="expiryMonth"]')).toBeVisible();
    await expect(page.locator('select[name="expiryYear"]')).toBeVisible();
    await expect(page.locator('input[name="cvv"]')).toBeVisible();
    await expect(page.locator('select[name="installments"]')).toBeVisible();
  });

  // TODO: prefer using the getBy* methods for better readability and accessibility as result
  test("should render correctly the pix form", async () => {
    await page
      .getByRole("button", {
        name: "PIX",
      })
      .click();

    await expect(
      page.getByText("Instruções de pagamento com PIX")
    ).toBeVisible();
    await expect(
      page.getByText(
        `Ao clicar em no botão “Comprar agora” você será direcionado para a página contendo os dados para pagamento com PIX. Não feche a página e realize o pagamento através do aplicativo do seu banco. Aguarde até que o pagamento seja e confirmado e você seja redirecionado para a página de “obrigado” para fechar o navegador.`
      )
    ).toBeVisible();

    // TODO: check better a way to validate if don't exist any input on this container.
    await expect(page.locator('input[name="cardNumber"]')).not.toBeVisible();
    await expect(page.locator('input[name="cardHolder"]')).not.toBeVisible();
    await expect(page.locator('input[name="cardDocument"]')).not.toBeVisible();
    await expect(page.locator('select[name="expiryMonth"]')).not.toBeVisible();
    await expect(page.locator('select[name="expiryYear"]')).not.toBeVisible();
    await expect(page.locator('input[name="cvv"]')).not.toBeVisible();
    await expect(page.locator('select[name="installments"]')).not.toBeVisible();
  });

  // TODO: prefer using the getBy* methods for better readability and accessibility as result
  test("should render correctly the bill form", async () => {
    await page
      .getByRole("button", {
        name: "Boleto",
      })
      .click();

    await expect(
      page.getByText("Instruções de pagamento por Boleto Bancário")
    ).toBeVisible();
    await expect(page.getByText("1- Boleto somente à vista;")).toBeVisible();
    await expect(
      page.getByText(
        "2- Pagamentos com Boleto Bancário levam até 3 dias úteis para serem compensados. Somente após a compensação que o produto será liberado."
      )
    ).toBeVisible();
    await expect(
      page.getByText(
        "3- Após o pagamento, fique atento ao seu e-mail para receber a confirmação e as informações sobre o produto comprado."
      )
    ).toBeVisible();

    // TODO: check better a way to validate if don't exist any input on this container.
    await expect(page.locator('input[name="cardNumber"]')).not.toBeVisible();
    await expect(page.locator('input[name="cardHolder"]')).not.toBeVisible();
    await expect(page.locator('input[name="cardDocument"]')).not.toBeVisible();
    await expect(page.locator('select[name="expiryMonth"]')).not.toBeVisible();
    await expect(page.locator('select[name="expiryYear"]')).not.toBeVisible();
    await expect(page.locator('input[name="cvv"]')).not.toBeVisible();
    await expect(page.locator('select[name="installments"]')).not.toBeVisible();
  });

  test.describe.serial("PIX", () => {
    test("should pay with pix", async ({ baseURL }) => {
      await page.goto(
        `${baseURL}/${productId}?off=${offId}&gtm=${gtmId}&fpixel=${pixelId}`
      );

      await fillUserData({
        page,
        userData: validCheckoutFormUserValues.userData,
        addressData: validCheckoutFormUserValues.addressData,
      });

      await page
        .getByRole("button", {
          name: "PIX",
        })
        .click();

      await page
        .getByRole("button", {
          name: "COMPRAR AGORA!",
        })
        .click();

      await page.waitForResponse("https://api-dev-sale.360h.com.br/sale");

      await expect(page).toHaveURL(
        /.*\/feedback\?affiliationCode=AF99897808JC.*/
      );
    });
  });

  test.describe.serial("Ticket", () => {
    test("should pay with ticket", async ({ baseURL }) => {
      await page.goto(
        `${baseURL}/${productId}?off=${offId}&gtm=${gtmId}&fpixel=${pixelId}`
      );

      await fillUserData({
        page,
        userData: validCheckoutFormUserValues.userData,
        addressData: validCheckoutFormUserValues.addressData,
      });

      await page
        .getByRole("button", {
          name: "Boleto",
        })
        .click();

      await page
        .getByRole("button", {
          name: "COMPRAR AGORA!",
        })
        .click();

      await page.waitForResponse("https://api-dev-sale.360h.com.br/sale");

      await expect(page).toHaveURL(
        /.*\/feedback\?affiliationCode=AF99897808JC.*/
      );
    });
  });

  test.describe.serial("Credit Card", () => {
    // NOTE: Probably the Galaxy Pay API can be intermitent at failing in dev
    // (and we don't know exactly why), if it starts to error for no reason
    // consider mocking the API
    // only for credit card: https://playwright.dev/docs/mock
    test("should send to the feedback page using credit card", async ({
      baseURL,
    }) => {
      await page.goto(
        `${baseURL}/${productId}?off=${offId}&gtm=${gtmId}&fpixel=${pixelId}`
      );

      await page
        .getByRole("button", {
          name: "Cartão de Crédito",
        })
        .click();

      await fillUserData({
        page,
        userData: validCheckoutFormUserValues.userData,
        addressData: validCheckoutFormUserValues.addressData,
      });

      await page
        .locator('input[name="cardNumber"]')
        .fill(validCheckoutFormPaymentValues.creditCardData.cardNumber);
      await page
        .locator('select[name="expiryMonth"]')
        .selectOption(
          validCheckoutFormPaymentValues.creditCardData.expiryMonth
        );
      await page
        .locator('select[name="expiryYear"]')
        .selectOption(validCheckoutFormPaymentValues.creditCardData.expiryYear);
      await page
        .locator('input[name="cardHolder"]')
        .fill(validCheckoutFormPaymentValues.creditCardData.cardHolder);
      await page
        .locator('input[name="cardDocument"]')
        .fill(validCheckoutFormPaymentValues.creditCardData.cardDocument);
      await page
        .locator('input[name="cvv"]')
        .fill(validCheckoutFormPaymentValues.creditCardData.cvv);

      await page
        .getByRole("button", {
          name: "COMPRAR AGORA!",
        })
        .click();

      await page.waitForResponse("https://api-dev-sale.360h.com.br/sale");

      await expect(page).toHaveURL(
        /.*\/feedback\?affiliationCode=AF99897808JC.*/
      );
    });
  });
});
