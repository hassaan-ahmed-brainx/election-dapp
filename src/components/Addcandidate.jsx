import Web3 from "web3";
import { useState } from "react";
import { Link } from 'react-router-dom';
import ContractAbi from '../abi.json';

const Addcandiate =(candidates_data)=> {

    let [Address_candidate, setAddress_candidate] = useState(localStorage.getItem('candidate_address') || '');
    let [Address_candidate1, setAddress_candidate1] = useState(localStorage.getItem('candidate_name') || '');

    let { handleAddCandidate } = candidates_data;
    let myContract;
    let provider = window.ethereum;
	let ContractAddress = '0x943919392a07A8e68BDDb226DcFE694A67c2DDFa';
    let web3 = new Web3(provider);
	myContract = new web3.eth.Contract(ContractAbi, ContractAddress);



    let handleChange1 = event => {
        setAddress_candidate(event.target.value);
    }

    let handleChange2 = event => {
        setAddress_candidate1(event.target.value);
    }

    let HandleAddCandidate = async () => {
        await myContract.methods.addCandidate(Address_candidate, Address_candidate1).send({ from: window.ethereum.selectedAddress });
        let newcandidate = { address: Address_candidate, name: Address_candidate1, votecount:0 };
        handleAddCandidate(newcandidate);
        setAddress_candidate("");
        setAddress_candidate1("");
    }

    return(
        <div className='Menu'>
            <Link className='menu-link' to='/'> Main menu</Link>   
            <h1>Add a Candidate</h1> 
            <div>
                <label>Candidate Address: </label>
                <input
                    type="text"
                    name=""
                    id="c_address"
                    placeholder="Adress of candidate"
                    className='candidateaddress'
                    required
                    onChange={handleChange1}
                    value={Address_candidate}
                />
            </div>  

            <div className='candidate-div'>
                <label className="candidatename" >Candidate Name: </label>
                <input
                    type="text"
                    name=""
                    id="c_name"
                    placeholder="Name of candidate"
                    className='candidate-input'
                    required
                    onChange={handleChange2}
                    value={Address_candidate1}
                />
            </div>
            <button onClick={HandleAddCandidate}>Submit</button>         
        </div>
    );
}

export default Addcandiate;
