# Todo's (a quick and dirty way to note down todo's)

- Ban default exports
- Organize imports
- Write a cross-platform solution for copying `vendor/bitcoind` to `dist/`
- Handle error when `bitcoind` is already running
- Look into using HTTPS for RPC calls
- DRY up Babel config in webpack config
- Remove "View => Reload" from menu
- Find a way to grab `blocks/` dir from Bitcoin Core and display it correctly in RPC Console
- Format mempool numbers correctly
- Make progress bar glow like macOS
- `bitcoind` responds with error messages sometimes. For example, when sending a JSON payload with
  `setnetworkactive`, the response is something like:

  ```json
  {
    "result": null,
    "error": {
      "code": -1,
      "message": "JSON value is not a boolean as expected"
    },
    "id": "static for now"
  }
  ```

  We need to handle this correctly.

- Fix button styling, make them more like macOS
- Get debug.log file location from bitcoin RPC instead of from the logs
