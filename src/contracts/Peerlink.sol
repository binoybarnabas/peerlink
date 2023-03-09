pragma solidity >=0.4.21 <0.6.0;

contract Peerlink {
    // Code goes here...
    string public name = "Peerlink";

    mapping(uint => Image) public images;

    struct images{
      uint id;
      string hash;
      string description;
      uint tipAmount;
      address payable author;
    }
    //store images

    //create images

    //tip images
}
