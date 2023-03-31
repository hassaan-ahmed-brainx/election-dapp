import Menu from '../src/components/Menu';
import Castavote from '../src/components/Castvote';
import Addcandiate from '../src/components/Addcandidate';
import { useState} from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [candidates, setcandidates] = useState([]);

  const handleAddCandidate = (newCandidate) =>{
    setcandidates([...candidates, newCandidate]);
  }

  return (
    <div>       
      <Router>
        <Routes>
          <Route path="/" element={<Menu/>} />
          <Route path="/Castvote" element={<Castavote candidates={candidates}/>} />
          <Route path="/Addcandidate" element={<Addcandiate handleAddCandidate={handleAddCandidate}/>}/>
        </Routes>     
      </Router>
    </div>
  );
}

export default App;

