pragma solidity >=0.4.22 <0.7.0;
pragma experimental ABIEncoderV2;

// "SPDX-License-Identifier: UNLICENSED"

contract MainContract{

    address owner;
    uint256 public sensorCounter;
    uint256 public dataCounter;
    mapping(uint256=>Sensor) public sensorList; // sensorId -> Sensor
    mapping(uint256=>Data) public dataList; // dataId -> Data
    mapping(string=>uint256) public timeToData; // timein string format -> Data

    // address[] public ownerList;

    // mapping(uint256 => address) sensorOwnerList;

    modifier onlyOwner(){
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    constructor() public payable{
        owner = msg.sender;
        sensorCounter = 0;
    }

    // struct sensorOwner{
    //     uint256 ownerId;
    //     uint256[] sensorList; // Sensor Id
    // }

    struct Sensor{
        uint256 sensorId;
        string _sensorString;
        uint256[] sensorDataList;
    }
    
    struct Data{
        uint256 dataId;
        uint256 sensorId;
        string date; // yyyymmdd
        string hour; // 24 hours
        string minute; // 60 minutes
        uint256[] datas; // array of data -> index=>sensorreading; Ex. 0 -> 15.6
    }

    function dateToString(string memory _date, string memory _hour, string memory _minute) public pure returns(string memory){
        // return string(abi.encodePacked(_date, _hour, _minute));

        bytes memory _ba = bytes(_date);
        bytes memory _bb = bytes(_hour);
        bytes memory _bc = bytes(_minute);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;

        for (uint i = 0; i < _ba.length; i++) {
            babcde[k++] = _ba[i];
        }

        for(uint i = 0; i < _bb.length; i++){
            babcde[k++] = _bb[i];
        }

        for(uint i = 0; i < _bc.length; i++){
            babcde[k++] = _bc[i];
        }

        return string(babcde);
    }

    function createData(uint256 _sensorId, string memory _date, string memory _hour, string memory _minute, uint256[] memory _datas) public payable {
        Data memory tempData = Data(dataCounter, _sensorId, _date, _hour, _minute, _datas);
        dataList[dataCounter] = tempData;
        sensorList[_sensorId].sensorDataList.push(dataCounter);
        timeToData[dateToString(_date, _hour, _minute)] = dataCounter;
        dataCounter++;
    }

    function getData(uint256 _dataId) public view returns(uint256[] memory){
        Data memory tempData = dataList[_dataId];
        return tempData.datas;
    }

    function createSensor(string memory _sensorString) public payable onlyOwner{
        uint256 _sensorId = sensorCounter;
        uint256[] memory notData;
        Sensor memory tempSensor = Sensor(_sensorId, _sensorString, notData);
        sensorCounter++;
        sensorList[_sensorId] = tempSensor;
    }

    function getSensor(uint256 _sensorId) public view returns(uint256[][] memory){
        Sensor memory tempSensor = sensorList[_sensorId];
        uint256 size = tempSensor.sensorDataList.length;

        uint256[][] memory temp = new uint256[][](size);

        for (uint i = 0; i < size; i++) {
            Data memory tempData = dataList[tempSensor.sensorDataList[i]];
            uint256 len = tempData.datas.length;
            uint256[] memory arr = new uint256[](len);
            arr = tempData.datas;
            temp[i] = arr;
        }
        return temp;
    }

    function getSenesorList() public view returns(string[] memory){
        string[] memory tempSensorList;

        for(uint i = 0; i < sensorCounter; i++){
            Sensor memory tempSensor = sensorList[i];
            tempSensorList[i] = tempSensor._sensorString;
        }

        return tempSensorList;
    }
}