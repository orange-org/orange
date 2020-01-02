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

## `getblock` response

```json
{
  "hash": "00000000000005260001a0c2575649686b2ab6efabdb83c838e9471fd303d39a",
  "confirmations": 4962,
  "strippedsize": 258006,
  "size": 258006,
  "weight": 1032024,
  "height": 193936,
  "version": 1,
  "versionHex": "00000001",
  "merkleroot": "b08ba2eb12e3329984abf67fc9a21f7802a1a715b7616a2da96cc583d3a1a6ef",
  "tx": [
    "f00eccc905315110b023ba59a87276c7e02eddec38e8a42474b63b8d23a81560",
    "c9c0f195e6b5a9330f0856e657ea641ec59f54ddd4eb793b84574c52acba2004",
    "cf87a872e24a2631086ea2237719f56a1d9c1496684db46b00d1b2cb0d96be7d",
    "1f4a2d02541d295302761d1aae1ed465b6fcb0d5ccee340898f86dbe245bfad8",
    "5a000ee4194798f5394755dd7ac290ac913acfee681cf064b6cb8a03fdd9bd58"
    // Etc............
  ],
  "time": 1344991373,
  "mediantime": 1344985864,
  "nonce": 2072129030,
  "bits": "1a07a85e",
  "difficulty": 2190865.970102859,
  "chainwork": "0000000000000000000000000000000000000000000000173d5a3c6c4a66124f",
  "nTx": 447,
  "previousblockhash": "00000000000004ca92f0a745595514f7d8b6554084312be2012f73c1f41048e4",
  "nextblockhash": "00000000000003e37e19c7450026758b585c27b50c0bbbd686eb35775183466a"
}
```
