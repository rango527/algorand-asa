const algosdk = require('algosdk');

const server = "https://testnet-algorand.api.purestake.io/ps2";
const port = "";
const token = {
	"x-api-key": "2LxTVLTC1B7dcrl3Zljj517E9uqYjP8A6vjt6PAm" // my api key
};

let client = new algosdk.Algodv2(token,server,port);

let account1 = 'IG2H4CVWUZV2JPXWNO3FJIIMAQGHWTVTYTUXJTW6FSPUUAGFQWB4U4OQFM';
let account2 = 'ILA2XJQXDSNKMJAOQBMFAYQV4ETOGSZFZWGW3KZXB6YGEZLFQ2YTYD7C6Q';

( async() => {
    let account1_info = (await client.accountInformation(account1).do());
    console.log("Balance of account 1: " + JSON.stringify(account1_info.amount));
    let account2_info = (await client.accountInformation(account2).do());
    console.log("Balance of account 2: " + JSON.stringify(account2_info.amount));
})().catch(e => {
	console.log(e);
})