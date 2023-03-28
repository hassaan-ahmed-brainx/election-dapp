import Web3 from "web3";
import { useState } from "react";
import { Link } from 'react-router-dom';
import ContractAbi from '../abi.json'



const Castavote =(candidates_list)=> {
    let {candidates} = candidates_list;

    let [selectedCandidate, setSelectedCandidate] = useState('');
    let [voteCount, setVoteCount] = useState(0);

    let myContract;
    let provider = window.ethereum;
    let ContractAddress = '0xf873BAfd52D35d78dbA73C3d54f1bDDa2f3660b3';
    let web3 = new Web3(provider);
    myContract = new web3.eth.Contract(ContractAbi, ContractAddress);

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
          candidates_list.setCandidates(updatedCandidates);
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


