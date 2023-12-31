const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();
  const name = prompt("Which name do you want to check?");
  if(name == null){
    alert("You have to type a name");
  }
  // Find the index of the name and get proof from merkle tree.
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
  });

  console.log({ gift });
}

main();