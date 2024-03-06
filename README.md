# cypress-ex

## Commands

Easy Setup:

1. run command: yarn install

2. add your auth data to `cypress/fixtures/auth.json`

3. or use `--env` variables with commands, like:

   `yarn test:run:auth --env env=?????,username=?????,password=?????`

---

To run tests in cypress UI:

- `yarn test:view`

---

To run tests in console:

- `yarn test:run:auth`
- `yarn test:run:basket`
- `yarn test:run:switch`

  (all)

- `yarn test:run:all`

To start in server mode:

- `yarn start`
- `yarn dev`

To format code with prettier:

- `yarn prettier-format`
