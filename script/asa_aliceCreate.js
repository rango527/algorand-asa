const algosdk = require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm" // fill in yours
};

var alice_mnemonic = "fix prize happy absorb fabric used reject scissors opinion tomorrow expose into embody soft divide charge easy foster roast find heavy inform debate abandon maximum"; // fill in yours
var aliceAccount = algosdk.mnemonicToSecretKey(alice_mnemonic);

let client = new algosdk.Algodv2(token, server, port);

(async () => {
    let params = await client.getTransactionParams().do();
    let note = undefined;
    let addr = aliceAccount.addr;
    let defaultFrozen = false;
    let decimals = 0;
    let totalIssuance = 1;
    let unitName = "Mintdrop";
    let assetName = "MD";
    let assetURL = "https://gateway.pinata.cloud/ipfs/QmeXCbDBtUEphoi7t3LkHkSTYvBU9nHuZrpXFdwmZxhUGS";
    let assetMetadataHash = "01234567890123456789012345678901";
    let manager = aliceAccount.addr;
    let reserve = aliceAccount.addr;
    let freeze = aliceAccount.addr;
    let clawback = aliceAccount.addr;
    let txn = algosdk.makeAssetCreateTxnWithSuggestedParams(addr, note,
         totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash, params);
    let rawSignedTxn = txn.signTxn(aliceAccount.sk);
    let tx = (await client.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + tx.txId);
})().catch(e => {
    console.log(e);
});