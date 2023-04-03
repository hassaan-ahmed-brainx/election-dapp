import Web3 from "web3";
import ContractAbi from "../abi.json";


export const provider = window.ethereum;
export const contractAddress = '0x943919392a07A8e68BDDb226DcFE694A67c2DDFa';
export const web3 = new Web3(provider);
export const myContract = new web3.eth.Contract(
    ContractAbi,
    contractAddress
  );