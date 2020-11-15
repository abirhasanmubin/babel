import Web3 from 'web3';

var Tx = require('ethereumjs-tx').Transaction;

var accountAddress = '0x65C2f74a732b2825fF9B244361E2C6dd3aD40dC0';

var accountPrivateKey = '34f66b315ec66dcc140a693f1c8508de4f23eb5876b829500f4b2f5b0d534155';

var privateKey = Buffer.from(accountPrivateKey, 'hex');

var contractAddress = '0xe4edC0ae7Edd5EAF9EDEdC7A805590Af215c46c0';

var abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_sensorId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hour",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_minute",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_sensorString",
                "type": "string"
            }
        ],
        "name": "createSensor",
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
            }
        ],
        "name": "dataList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "dataId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "sensorId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "hour",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "minute",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_date",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_hour",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_minute",
                "type": "string"
            }
        ],
        "name": "dateToString",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "pure",
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
        "inputs": [],
        "name": "getSenesorList",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_sensorId",
                "type": "uint256"
            }
        ],
        "name": "getSensorById",
        "outputs": [
            {
                "internalType": "uint256[][]",
                "name": "",
                "type": "uint256[][]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "sensorCounter",
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
            }
        ],
        "name": "sensorList",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "sensorId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_sensorString",
                "type": "string"
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


async function asyncCreateSensor(_sensorName) {
    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let data = await contract.methods.createSensor(_sensorName).encodeABI();

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

async function asyncCreateData(_sensorId, _date, _hour, _minute, arr) {

    let nonce = await web3.eth.getTransactionCount(accountAddress);

    let data = await contract.methods.createData(_sensorId, _date, _hour, _minute, arr).encodeABI();

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

async function asyncGetSensorById(_sensorId) {
    return await contract.methods.getSensorById(_sensorId).call();
}

async function asyncGetData(_dataId) {
    return await contract.methods.getData(_dataId).call();
}




module.exports = {
    asyncGetSensorById,
    asyncCreateSensor,
    asyncCreateData,
    asyncGetData,
};
