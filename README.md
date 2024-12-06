# Checkout frontend

...

## How to run the end-to-end tests?

> Disclaimer: An example test suite can be found at `e2e/error_page.spec.ts`
> Disclaimer: Make sure the `.env` file contain the correct information

1. Install the required browsers:

```sh
yarn browser:install
```

2. Run the tests:

```sh
yarn test:e2e
```

3. Run the tests with a UI to debug:

```sh
yarn test:e2e:interactive
```
