const algosdk = require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm" // fill in yours
};

var alice_mnemonic = "fix prize happy absorb fabric used reject scissors opinion tomorrow expose into embody soft divide charge easy foster roast find heavy inform debate abandon maximum"; // fill in yours
var aliceAccount = algosdk.mnemonicToSecretKey(alice_mnemonic);
var bobAddress = 'ILA2XJQXDSNKMJAOQBMFAYQV4ETOGSZFZWGW3KZXB6YGEZLFQ2YTYD7C6Q'; // change to yours

let client = new algosdk.Algodv2(token, server, port);

(async () => {
    let assetID = 43940955; // change to your own assetID
    let params = await client.getTransactionParams().do();
    let sender = aliceAccount.addr;
    let recipient = bobAddress;
    let revocationTarget = undefined;
    let closeRemainderTo = undefined;
    let note = undefined;
    let amount = 200000;
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
        amount, note, assetID, params);
    let rawSignedTxn = txn.signTxn(aliceAccount.sk)
    let tx = (await client.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + tx.txId);
})().catch(e => {
    console.log(e);
});