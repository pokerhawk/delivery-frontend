import { BrowserContext, Page, test, expect } from "@playwright/test";

test.describe.serial("(E2E) Error Page", () => {
  let page: Page;
  let context: BrowserContext;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();

    page = await context.newPage();
  });

  test("should render the error page if the route is not matched", async () => {
    await page.goto("/");

    await expect(page).toHaveURL("/");
    await expect(
      page.getByText("Esse produto foi desativado ou não encontrado.")
    ).toBeVisible();
    await expect(
      page.getByText("Entre em contato com o vendedor e solicite um novo link")
    ).toBeVisible();
    await expect(page.getByText("FEITO COM PELA")).toBeVisible();
  });

  test("should render the error page for the /404 route specifically", async () => {
    await page.goto("/404");

    await expect(page).toHaveURL("/404");
    await expect(
      page.getByText("Esse produto foi desativado ou não encontrado.")
    ).toBeVisible();
    await expect(
      page.getByText("Entre em contato com o vendedor e solicite um novo link")
    ).toBeVisible();
    await expect(page.getByText("FEITO COM PELA")).toBeVisible();
  });
});
