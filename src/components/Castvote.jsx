import { useState } from "react";
import { Link } from 'react-router-dom';
import ContractAbi from '../abi.json'
import * as Constants from  '/home/brainx/Desktop/dapp/src/constants/constants.js'



const Castavote =(candidatesData)=> {
    let {candidates} = candidatesData;

    let [selectedCandidate, setSelectedCandidate] = useState('');
    let [voteCount, setVoteCount] = useState(0);

    let myContract;
	const contractAddress = Constants.contractAddress
    const web3 = Constants.web3;
	myContract = new web3.eth.Contract(ContractAbi, contractAddress);

    const handleVote = async () => {
        try {
          const accounts = await web3.eth.getAccounts();
          const address = selectedCandidate.split(',')[1];
          console.log(address)
          console.log(accounts[0])
          await myContract.methods.castVote(address).send({ from: accounts[0] });
          console.log(accounts[0])
          const candidateIndex = candidates.findIndex(c => c.address === address);
          const updatedCandidates = [...candidates];
          updatedCandidates[candidateIndex].votecount++;
          setSelectedCandidate('');
          setVoteCount(updatedCandidates[candidateIndex].votecount);
          candidatesData.setCandidates(updatedCandidates);
        } catch (error) {
          console.log(error);
        }
      }
      

    return (
        <div className="Menu">
            <h1>Cast your vote</h1>
            <Link className='menu-link' to='/'> Main menu</Link>   
            <h1 className="text-center">Election Results</h1>
            <hr />

            <div>
                <table className="table-header">
                    <th>Name </th>
                    <th className="address-candidate">Address</th>
                </table>
                <ul>
                    {candidates?.map((candidate)=>(
                        <li key={candidate.address}>
                            <strong>{candidate.name } {candidate.address} {candidate.votecount}</strong> 
                            <button onClick={() => setSelectedCandidate(`${candidate.name},${candidate.address}`)}>Select</button>
                        </li>
                    ))}
                </ul>
                {selectedCandidate && (
                    <div>
                        <h3>Selected candidate: {selectedCandidate.split(',')[0]}</h3>
                        <h3>Vote count: {voteCount}</h3>
                        <button onClick={handleVote}>Vote</button>
                    </div>
                )}
            </div>
        </div>
   

    );
}

export default Castavote;


