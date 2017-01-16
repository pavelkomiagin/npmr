# npmr

Comfortable way to manage npm packages using desktop client.
This project based on [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate) but Redux was replaced by [MobX](https://github.com/mobxjs/mobx)

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**

First, clone the repo via git:

```bash
git clone https://github.com/pavelkomiagin/npmr.git
```

And then install dependencies.

```bash
$ cd npmr && npm install
```

## Run

Run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

or run two servers with one command

```bash
$ npm run dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

## Further commands

To run the application without packaging run

```bash
$ npm run build
$ npm start
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

#### Options

See [electron-builder CLI Usage](https://github.com/electron-userland/electron-builder#cli-usage)

## Maintainers

- [Pavel Komiagin](https://github.com/pavelkomiagin)

## License
MIT © [Pavel Komiagin](https://github.com/pavelkomiagin)
