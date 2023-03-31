import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Constants from "/home/brainx/Desktop/dapp/src/constants/constants.js";

const Addcandiate = (props) => {
  const [addressCandidate, setAddressCandidate] = useState("");
  const [addressCandidate1, setAddressCandidate1] = useState("");
  const [handleAddCandidate, setHandleAddCandidate] = useState(null);

  const handleChange1 = (event) => {
    setAddressCandidate(event.target.value);
  };

  const handleChange2 = (event) => {
    setAddressCandidate1(event.target.value);
  };

  useEffect(() => {
    setHandleAddCandidate(props.candidatesData);
  }, [props.candidatesData]);

  const handleAddCandidate1 = async () => {
    await Constants.myContract.methods
      .addCandidate(addressCandidate, addressCandidate1)
      .send({ from: window.ethereum.selectedAddress });
    let newcandidate = {
      address: addressCandidate,
      name: addressCandidate1,
      votecount: 0,
    };
    handleAddCandidate(newcandidate);
    setAddressCandidate("");
    setAddressCandidate1("");
  };

  return (
    <div className="Menu">
      <Link className="Menu_Link" to="/">
        {" "}
        Main menu
      </Link>
      <h1>Add a Candidate</h1>
      <div>
        <label>Candidate Address: </label>
        <input
          type="text"
          name=""
          id="c_address"
          placeholder="Adress of candidate"
          className="Candidate_Address"
          required
          onChange={handleChange1}
          value={addressCandidate}
        />
      </div>

      <div className="candidate-div">
        <label className="Candidate_Name">Candidate Name: </label>
        <input
          type="text"
          name=""
          id="c_name"
          placeholder="Name of candidate"
          className="Candidate_Input"
          required
          onChange={handleChange2}
          value={addressCandidate1}
        />
      </div>
      <button onClick={handleAddCandidate1}>Submit</button>
    </div>
  );
};

export default Addcandiate;
