This is the first beta release of Orange. Please download it, use it, and tell
me what features and changes I should work on next.

Orange is a blockchain explorer for Bitcoin Core. To use Orange you have to have
Bitcoin Core running with _pruning turned off_ and the _RPC server turned on_.

For example, your `bitcoin.conf` file would have the following:

```conf
server=1
prune=0
```

If you need help getting setup, contact me at msafi@msafi.com,
[@msafi](https://twitter.com/msafi), or
[open an issue](https://github.com/orange-org/orange/issues/new).

## New features

- Blockchain explorer ([#7](https://github.com/orange-org/orange/pull/7))

  ![Block Explorer](https://user-images.githubusercontent.com/4027731/78417236-05978c80-75e5-11ea-94d4-4e7660031329.png)

  **Search**

  You can search for a block by height or hash. And if you have transaction
  indexing enabled in Bitcoin Core (i.e. using `txindex=1` in your
  `bitcoin.conf`) then you can also search by transaction ID.

- Transaction view ([#9](https://github.com/orange-org/orange/pull/9))

  You can also explore transactions

  ![Transaction page](https://user-images.githubusercontent.com/4027731/78417234-02040580-75e5-11ea-8c90-c66bf40a9c7c.png)

## New enhancements and bug fixes

- ~100% test coverage
- Automated PR checks on Travis CI
- Automated Electron package generation
- Automated release pipeline
