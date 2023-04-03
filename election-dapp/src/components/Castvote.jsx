import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Constants from "/home/brainx/Desktop/dapp/src/constants/constants.js";

const Castavote = ({ candidatesData }) => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [voteCount, setVoteCount] = useState(0);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    setCandidates(candidatesData.candidates);
  }, [candidatesData.candidates]);

  const handleVote = async () => {
    try {
      const accounts = await Constants.web3.eth.getAccounts();
      const address = selectedCandidate.split(",")[1];
      console.log(address);
      console.log(accounts[0]);
      await Constants.myContract.methods
        .castVote(address)
        .send({ from: accounts[0] });
      console.log(accounts[0]);
      const candidateIndex = candidates.findIndex((c) => c.address === address);
      const updatedCandidates = [...candidates];
      updatedCandidates[candidateIndex].votecount++;
      setSelectedCandidate("");
      setVoteCount(updatedCandidates[candidateIndex].votecount);
      candidatesData.setCandidates(updatedCandidates);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Menu">
      <h1>Cast your vote</h1>
      <Link className="Menu_Link" to="/">
        {" "}
        Main menu
      </Link>
      <h1 className="Text_Center">Election Results</h1>
      <hr />

      <div>
        <table className="Table_Header">
          <th>Name </th>
          <th className="Address_Candidate">Address</th>
        </table>
        <ul>
          {candidates?.map((candidate) => (
            <li key={candidate.address}>
              <strong>
                {candidate.name} {candidate.address} {candidate.votecount}
              </strong>
              <button
                onClick={() =>
                  setSelectedCandidate(`${candidate.name},${candidate.address}`)
                }
              >
                Select
              </button>
            </li>
          ))}
        </ul>
        {selectedCandidate && (
          <div>
            <h3>Selected candidate: {selectedCandidate.split(",")[0]}</h3>
            <h3>Vote count: {voteCount}</h3>
            <button onClick={handleVote}>Vote</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Castavote;
