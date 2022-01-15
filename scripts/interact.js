const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// console.log(JSON.stringify(contract.abi));

const alchemyProvider = new ethers.providers.AlchemyProvider(
  "ropsten",
  API_KEY
);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const helloWorldContract = new ethers.Contract(
  CONTRACT_ADDRESS,
  contract.abi,
  signer
);

(async () => {
  const message = await helloWorldContract.message();

  console.log(`The message is ${message}`);

  await (await helloWorldContract.update("New Message")).wait();

  const newMessage = await helloWorldContract.message();
  console.log(`The message is ${newMessage}`);
})();
