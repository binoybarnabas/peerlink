pragma solidity >=0.4.21 <0.6.0;

contract Peerlink {
    
    string public name = "Peerlink";
    //store images
    uint public imageCount = 0;
    mapping(uint => Image) public images;

    struct Image{
      uint id; 
      string hash;
      string description;
      uint tipAmount;
      address payable author;
    }

    event imageCreated
    ( 
      uint id,
      string hash,
      string description,
      uint tipAmount,
      address payable author
      );

    event imageTipped
    ( 
      uint id,
      string hash,
      string description,
      uint tipAmount,
      address payable author
      );
    
    
    //create images
    function uploadImage(string memory _imghash, string memory _description) public {
      require(bytes(_imghash).length > 0);
      require(bytes(_description).length > 0);
      require(msg.sender != address(0x0));


      //increment image
      imageCount++;
      //adding an image to contract
      images[imageCount] = Image(imageCount,_imghash,_description,0,msg.sender);
      //trigger an image
      emit imageCreated(imageCount,_imghash,_description,0,msg.sender);
    
    }
    //tip images

    function tipImageOwner(uint _id) public payable{

      Image memory _image = images[_id];
      address payable _author = _image.author;
      address(_author).transfer(msg.value);
      _image.tipAmount = _image.tipAmount + msg.value;
      images[_id] = _image;
      emit imageTipped(_id,_image.hash,_image.description,_image.tipAmount,_author);
    }
}
