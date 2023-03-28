const { expect } = require("chai");
const hre = require("hardhat");


describe("Lock", function () {

  let contract;

  beforeEach(async function()
  {
    const Lock = await hre.ethers.getContractFactory("Election");
    const lock = await Lock.deploy();
    contract = await lock.deployed();

  });
  

  it("Should return current count of candidates", async function () {
    expect(await contract.candidateCount()).to.equal(0);
  });

  it("Should add a Candidate and increase Candidate Count", async function(){
    await contract.addCandidate("0x8921a2034Efdb48BcD1cF2aEbD49aB3a9D7448C8", "Candidate1");
    expect(await contract.candidateCount()).to.equal(1);
  });

  it("Should not add Candidate and Candidate Count remains same", async function(){
    await contract.addCandidate("0x8921a2034Efdb48BcD1cF2aEbD49aB3a9D7448C8", "Candidate1");
    expect(await contract.candidateCount()).to.equal(1);
  });


  

});