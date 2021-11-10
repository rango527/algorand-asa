const algosdk=require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm" // fill in yours
};

var aliceAddress = 'IG2H4CVWUZV2JPXWNO3FJIIMAQGHWTVTYTUXJTW6FSPUUAGFQWB4U4OQFM'; // change to yours
var bobAddress = 'ILA2XJQXDSNKMJAOQBMFAYQV4ETOGSZFZWGW3KZXB6YGEZLFQ2YTYD7C6Q'; // change to yours

let client = new algosdk.Algodv2(token, server, port);

( async() => {

    let alice_account_info = (await client.accountInformation(aliceAddress).do());
    console.log("Asset of Alice: ");
    console.log(alice_account_info.assets);

    let bob_account_info = (await client.accountInformation(bobAddress).do());
    console.log("Asset of Bob: ");
    console.log(bob_account_info.assets);

})().catch(e => {
	console.log(e);
})