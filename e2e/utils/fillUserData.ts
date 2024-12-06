import { Page } from "@playwright/test";
import { CheckoutSchemaType } from "../../src/shared/schemas/checkout";

type Params = {
  page: Page;
} & CheckoutSchemaType;

export async function fillUserData({ page, userData, addressData }: Params) {
  await page.locator('input[name="userData.name"]').fill(userData.name);
  await page.locator('input[name="userData.email"]').fill(userData.email);
  await page.locator('input[name="userData.document"]').fill(userData.document);
  await page.locator('input[name="userData.phone"]').fill(userData.phone);
  await page
    .locator('input[name="addressData.zipCode"]')
    .fill(addressData.zipCode);
  await page
    .locator('input[name="addressData.uf"]')
    .fill(addressData.uf as string);
  await page
    .locator('input[name="addressData.city"]')
    .fill(addressData.city as string);
  await page
    .locator('input[name="addressData.street"]')
    .fill(addressData.street);
  await page
    .locator('input[name="addressData.number"]')
    .fill(addressData.number);

  if (addressData?.complement) {
    await page
      .locator('input[name="addressData.complement"]')
      .fill(addressData.complement);
  }

  await page
    .locator('input[name="addressData.neighborhood"]')
    .fill(addressData.neighborhood);
}
