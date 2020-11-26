var Web3 = require('web3')

var Tx = require('ethereumjs-tx').Transaction;

var accountAddress = '0x65C2f74a732b2825fF9B244361E2C6dd3aD40dC0';

var accountPrivateKey = '34f66b315ec66dcc140a693f1c8508de4f23eb5876b829500f4b2f5b0d534155';

var privateKey = Buffer.from(accountPrivateKey, 'hex');

var contractAddress = '0x6a23b3091b8adD3FC68F6949DfCaFfdA81817F9C';

var abi = [
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
        "stateMutability": "payable",
        "type": "constructor"
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

const web3 = new Web3(
    new Web3.providers.HttpProvider(
        'https://ropsten.infura.io/v3/cbd9d5f7455940279cb13adf10ad5e77'
    )
);

// const web3 = new Web3('http://localhost:7545');

var contract = new web3.eth.Contract(abi, contractAddress, {
    from: accountAddress,
});

contract.defaultAccount = accountAddress;

async function createData(_time, arr) {

    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let data = await contract.methods.createData(_time, arr).encodeABI();

    let gasPrice = await web3.eth.getGasPrice();
    gasPrice = web3.utils.toHex(gasPrice);

    let gasPriceLimit = await web3.eth.estimateGas({
        "from": accountAddress,
        "nonce": nonce,
        "to": contractAddress,
        "data": data
    });
    gasPriceLimit = web3.utils.toHex(gasPriceLimit);

    let rawTx = {
        "nonce": nonce,
        "from": accountAddress,
        "gasPrice": gasPrice,
        "gasLimit": gasPriceLimit,
        "to": contractAddress,
        "value": "0x00",
        "data": data
    }
    var tx = new Tx(rawTx, { 'chain': 'ropsten' });
    tx.sign(privateKey);
    var serializedTx = tx.serialize();

    return await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
        .then((err, res) => {
            if (err) {
                return err;
            }
            return res;
        });
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
};
