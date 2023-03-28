import { useState } from "react";
import { Link } from 'react-router-dom';
import ContractAbi from '../abi.json';
import * as Constants from  '/home/brainx/Desktop/dapp/src/constants/constants.js'


const Addcandiate =(candidatesData)=> {

    let [addressCandidate, setAddressCandidate] = useState(localStorage.getItem('candidate_address') || '');
    let [addressCandidate1, setAddressCandidate1] = useState(localStorage.getItem('candidate_name') || '');

    let { handleAddCandidate } = candidatesData;
    let myContract;
	const ContractAddress = Constants.ContractAddress
    const web3 = Constants.web3;
	myContract = new web3.eth.Contract(ContractAbi, ContractAddress);



    const handleChange1 = event => {
        setAddressCandidate(event.target.value);
    }

    const handleChange2 = event => {
        setAddressCandidate1(event.target.value);
    }

    let HandleAddCandidate = async () => {
        await myContract.methods.addCandidate(addressCandidate, addressCandidate1).send({ from: window.ethereum.selectedAddress });
        let newcandidate = { address: addressCandidate, name: addressCandidate1, votecount:0 };
        handleAddCandidate(newcandidate);
        setAddressCandidate("");
        setAddressCandidate1("");
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
                    value={addressCandidate}
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
                    value={addressCandidate1}
                />
            </div>
            <button onClick={HandleAddCandidate}>Submit</button>         
        </div>
    );
}

export default Addcandiate;
