const algosdk = require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm"
};

var bob_mnemonic = "learn element boring item cinnamon rotate industry exotic abuse observe trial panel fit angle wasp use dream core flag depart wage whip six ability possible"; // fill in yours
var bobAccount = algosdk.mnemonicToSecretKey(bob_mnemonic);
var aliceAddress = 'IG2H4CVWUZV2JPXWNO3FJIIMAQGHWTVTYTUXJTW6FSPUUAGFQWB4U4OQFM'; // change to yours

let client = new algosdk.Algodv2(token, server, port);

(async () => {
    let assetID = 43940955; // change to your own assetID
    let params = await client.getTransactionParams().do();
    let sender = bobAccount.addr;
    let recipient = aliceAddress;
    let revocationTarget = undefined;
    let closeRemainderTo = aliceAddress;
    let note = undefined;
    let amount = 200000;
    let txn = algosdk.makeAssetTransferTxnWithSuggestedParams(sender, recipient, closeRemainderTo, revocationTarget,
        amount,  note, assetID, params);
    let rawSignedTxn = txn.signTxn(bobAccount.sk)
    let tx = (await client.sendRawTransaction(rawSignedTxn).do());
    console.log("Transaction : " + tx.txId);
})().catch(e => {
    console.log(e);
});