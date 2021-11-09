const algosdk = require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm"
};

let client = new algosdk.Algodv2(token,server,port);
///
let mnemonic1 = 'fix prize happy absorb fabric used reject scissors opinion tomorrow expose into embody soft divide charge easy foster roast find heavy inform debate abandon maximum'; // 25-word mnemonic
let account1 = algosdk.mnemonicToSecretKey(mnemonic1);

( async() => {
    let params = await client.getTransactionParams().do();
    let txn = {
        "from": account1.addr,
        "to": "ILA2XJQXDSNKMJAOQBMFAYQV4ETOGSZFZWGW3KZXB6YGEZLFQ2YTYD7C6Q",
        "fee": 1,
        "amount": 5000000, // 5 algos
        "firstRound": params.firstRound,
        "lastRound": params.lastRound,
        "genesisID": params.genesisID,
        "genesisHash": params.genesisHash,
        "note": new Uint8Array(0)
    }
    let signedTxn = algosdk.signTransaction(txn, account1.sk);
    let sendTx = await client.sendRawTransaction(signedTxn.blob).do();

    console.log("Transaction: " + sendTx.txId);
})().catch( e => {
    console.log(e)
})