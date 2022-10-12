import { test, expect } from "@playwright/test";

const TEST_ACCOUNT1_ADDRESS = "0xA929FADF511f31c6ab88D5b83cAfb42b2ccc5b9D";
const TEST_ACCOUNT2_ADDRESS = "0xd1e02f91aD655c110f91559565d29A87CDE82c7E";
const GOERLI_CHAINLINK_CONTRACT_ADDRESS =
  "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4173");

  await page
    .locator('input[placeholder="Enter private key"]')
    .fill(process.env.TEST_ACCOUNT1_PRIVATE_KEY as string);

  await page.locator('input[name="key"]').press("Enter");
});

test("should access account via private key", async ({ page }) => {
  //Button has changed to disconnect
  await expect(page.getByText("Disconnect")).toHaveText("Disconnect");
  //Account address is shown
  await expect(page.getByText(TEST_ACCOUNT1_ADDRESS)).toBeDefined();
});

test("should show errors when private key is invalid", () => test.skip());

test("should show ETH balance", async ({ page }) => {
  await expect(page.getByTestId("eth-balance")).toBeVisible();
});
test("should be able to switch network", async ({ page }) => {
  await expect(page.getByTestId("eth-balance")).toBeVisible();

  const goerliBalance = await page.getByTestId("eth-balance").textContent();

  await page.getByText("Goerli").click();
  await page.getByText("Sepolia").click();

  //balance is updated
  await expect(page.getByTestId("eth-balance")).not.toHaveText(
    goerliBalance as string
  );
});
test("should show correct ETH balance of added token", () => test.skip());

test("should add token", async ({ page }) => {
  await expect(
    page.getByText(GOERLI_CHAINLINK_CONTRACT_ADDRESS)
  ).not.toBeVisible();

  await page
    .locator('[placeholder="Enter token contract address"]')
    .fill(GOERLI_CHAINLINK_CONTRACT_ADDRESS);

  await page.getByText("Add token").click();

  await expect(page.getByText(GOERLI_CHAINLINK_CONTRACT_ADDRESS)).toBeVisible();
});

test("should show an error if address is invalid", () => test.skip());
test("should show balance of added token", () => test.skip());
test("should remove token", () => test.skip());

test("should send eth", async ({ page }) => {
  const balance = await page.getByTestId("eth-balance").textContent();

  await page.getByTestId("send-eth").click();

  await page
    .locator('input[placeholder="Enter recipient address"]')
    .fill(TEST_ACCOUNT2_ADDRESS);

  await page.locator('input[placeholder="Enter amount"]').fill("0.0005");

  await page.locator("button", { hasText: "Send" }).click();

  // progress bar is visible
  await expect(page.getByRole("progressbar")).toBeVisible();

  //success
  await expect(page.getByTestId("CheckCircleIcon")).toBeVisible({
    timeout: 30000,
  });

  const etherscanUrl = (await page
    .getByText("Etherscan")
    .getAttribute("href")) as string;

  const spittedUrl = etherscanUrl?.split("/");
  const txHash = spittedUrl[spittedUrl?.length - 1];

  //close modal
  await page.getByTestId("CloseIcon").click();
  //@TODO: better way of checking balance after sending some amount
  await expect(page.getByTestId("eth-balance")).not.toHaveText(
    balance as string
  );

  //tx added to recent transactions
  await expect(page.getByText(txHash)).toBeVisible();
});
test("should show error if transaction failed", async () => {
  test.skip();
});
test("should send added token", async () => {
  test.skip();
});
