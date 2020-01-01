# Bitcoind Docs

## Response for `help`

```
== Blockchain ==
getbestblockhash
getblock "blockhash" ( verbosity )
getblockchaininfo
getblockcount
getblockfilter "blockhash" ( "filtertype" )
getblockhash height
getblockheader "blockhash" ( verbose )
getblockstats hash_or_height ( stats )
getchaintips
getchaintxstats ( nblocks "blockhash" )
getdifficulty
getmempoolancestors "txid" ( verbose )
getmempooldescendants "txid" ( verbose )
getmempoolentry "txid"
getmempoolinfo
getrawmempool ( verbose )
gettxout "txid" n ( include_mempool )
gettxoutproof ["txid",...] ( "blockhash" )
gettxoutsetinfo
preciousblock "blockhash"
pruneblockchain height
savemempool
scantxoutset "action" [scanobjects,...]
verifychain ( checklevel nblocks )
verifytxoutproof "proof"

== Control ==
getmemoryinfo ( "mode" )
getrpcinfo
help ( "command" )
logging ( ["include_category",...] ["exclude_category",...] )
stop
uptime

== Generating ==
generatetoaddress nblocks "address" ( maxtries )
generatetodescriptor num_blocks "descriptor" ( maxtries )

== Mining ==
getblocktemplate ( "template_request" )
getmininginfo
getnetworkhashps ( nblocks height )
prioritisetransaction "txid" ( dummy ) fee_delta
submitblock "hexdata" ( "dummy" )
submitheader "hexdata"

== Network ==
addnode "node" "command"
clearbanned
disconnectnode ( "address" nodeid )
getaddednodeinfo ( "node" )
getconnectioncount
getnettotals
getnetworkinfo
getnodeaddresses ( count )
getpeerinfo
listbanned
ping
setban "subnet" "command" ( bantime absolute )
setnetworkactive state

== Rawtransactions ==
analyzepsbt "psbt"
combinepsbt ["psbt",...]
combinerawtransaction ["hexstring",...]
converttopsbt "hexstring" ( permitsigdata iswitness )
createpsbt [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
createrawtransaction [{"txid":"hex","vout":n,"sequence":n},...] [{"address":amount},{"data":"hex"},...] ( locktime replaceable )
decodepsbt "psbt"
decoderawtransaction "hexstring" ( iswitness )
decodescript "hexstring"
finalizepsbt "psbt" ( extract )
getrawtransaction "txid" ( verbose "blockhash" )
joinpsbts ["psbt",...]
sendrawtransaction "hexstring" ( maxfeerate )
signrawtransactionwithkey "hexstring" ["privatekey",...] ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
testmempoolaccept ["rawtx",...] ( maxfeerate )
utxoupdatepsbt "psbt" ( ["",{"desc":"str","range":n or [n,n]},...] )

== Util ==
createmultisig nrequired ["key",...] ( "address_type" )
deriveaddresses "descriptor" ( range )
estimatesmartfee conf_target ( "estimate_mode" )
getdescriptorinfo "descriptor"
signmessagewithprivkey "privkey" "message"
validateaddress "address"
verifymessage "address" "signature" "message"
```

### `getnetworkinfo` response

```
{
  "version": 199900,
  "subversion": "/Satoshi:0.19.99/",
  "protocolversion": 70015,
  "localservices": "0000000000000408",
  "localservicesnames": [
    "WITNESS",
    "NETWORK_LIMITED"
  ],
  "localrelay": true,
  "timeoffset": 0,
  "networkactive": true,
  "connections": 10,
  "networks": [
    {
      "name": "ipv4",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    },
    {
      "name": "ipv6",
      "limited": false,
      "reachable": true,
      "proxy": "",
      "proxy_randomize_credentials": false
    },
    {
      "name": "onion",
      "limited": true,
      "reachable": false,
      "proxy": "",
      "proxy_randomize_credentials": false
    }
  ],
  "relayfee": 0.00001000,
  "incrementalfee": 0.00001000,
  "localaddresses": [
  ],
  "warnings": "This is a pre-release test build - use at your own risk - do not use for mining or merchant applications"
}
```

## `getblockchaininfo` response

```json
{
  "chain": "main",
  "blocks": 131302,
  "headers": 610675,
  "bestblockhash": "0000000000000e7dd813dbc8770f5d6480730b16706bcb94931e1401f986f065",
  "difficulty": 876954.4935135372,
  "mediantime": 1308254452,
  "verificationprogress": 0.001548356203356627,
  "initialblockdownload": true,
  "chainwork": "00000000000000000000000000000000000000000000000105ff9d61c17c7093",
  "size_on_disk": 311407975,
  "pruned": true,
  "pruneheight": 0,
  "automatic_pruning": true,
  "prune_target_size": 999292928,
  "softforks": {
    "bip34": {
      "type": "buried",
      "active": false,
      "height": 227931
    },
    "bip66": {
      "type": "buried",
      "active": false,
      "height": 363725
    },
    "bip65": {
      "type": "buried",
      "active": false,
      "height": 388381
    },
    "csv": {
      "type": "buried",
      "active": false,
      "height": 419328
    },
    "segwit": {
      "type": "buried",
      "active": false,
      "height": 481824
    }
  },
  "warnings": "This is a pre-release test build - use at your own risk - do not use for mining or merchant applications"
}
```

## `getmempoolinfo` response

```json
{
  "loaded": true,
  "size": 0,
  "bytes": 0,
  "usage": 0,
  "maxmempool": 300000000,
  "mempoolminfee": 0.00001,
  "minrelaytxfee": 0.00001
}
```

## `getmemoryinfo` response

```json
{
  "locked": {
    "used": 288,
    "free": 261856,
    "total": 262144,
    "locked": 262144,
    "chunks_used": 1,
    "chunks_free": 1
  }
}
```
