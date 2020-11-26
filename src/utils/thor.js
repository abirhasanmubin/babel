var Transaction = require('thor-devkit').Transaction;
var cry = require('thor-devkit').cry;

var thorify = require("thorify").thorify;
var Web3 = require("web3");
var web3 = thorify(new Web3(), "https://testnet.veblocks.net");


var words = [
    "erode", "offer", "phrase", "six",
    "often", "toilet", "kiss", "fog",
    "keep", "notable", "call", "wolf"
];


let node = cry.HDNode.fromMnemonic(words);

let privateKey = node.derive(0).privateKey.toString('hex');
let prKey = node.derive(0).privateKey;

let acc = web3.eth.accounts.privateKeyToAccount(privateKey);

let wallet = web3.eth.accounts.wallet;

wallet.add(acc);

var contractAddress = "0x87834f70Bcd44753303a4bD7488B9694288Aca13";

var abi = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_time",
                "type": "string"
            },
            {
                "internalType": "uint256[]",
                "name": "_datas",
                "type": "uint256[]"
            }
        ],
        "name": "createData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "dataCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "dataList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_dataId",
                "type": "uint256"
            }
        ],
        "name": "getData",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_time",
                "type": "string"
            }
        ],
        "name": "getDataId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLatestData",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "timeToData",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

var contract = new web3.eth.Contract(abi, contractAddress);

contract.defaultAccount = wallet[0].address;

async function createData(_time, arr) {

    let data = contract.methods.createData(_time, arr).encodeABI();

    let clauses = [{
        'to': contractAddress,
        'value': '0x0',
        'data': data
    }]

    let gas = Transaction.intrinsicGas(clauses) * 100;

    // console.log(gas);
    let blockRef = await web3.eth.getBlock('latest').then(res => {
        return res.id.substr(0, 18);
    });
    // console.log(blockRef);
    let body = {
        chainTag: 0x27,
        blockRef: blockRef,
        expiration: 32,
        clauses: clauses,
        gasPriceCoef: 128,
        gas: gas,
        dependsOn: null,
        nonce: '0x11'
    }

    let tx = new Transaction(body);

    let signingHash = tx.signingHash();

    tx.signature = cry.secp256k1.sign(signingHash, prKey);

    let raw = tx.encode();

    // let decoded = Transaction.decode(raw);
    return await web3.eth.sendSignedTransaction('0x' + raw.toString('hex'));

}

async function getData(_dataId) {
    return await contract.methods.getData(_dataId).call();
}
async function getLatestData() {
    return await contract.methods.getLatestData().call();
}

module.exports = {
    createData,
    getData,
    getLatestData
}