import '/home/brainx/Desktop/dapp/src/index.css';
import { Link } from 'react-router-dom';


const Menu =()=> {
    return(

        <div>
        <title>Election System</title>

        <div className='Menu'>
             <div >
                <h1>Election DAPP</h1>
                <Link to='/Addcandidate' > Add a Candidate</Link>
                <Link to='/CastVote'> Cast a Vote</Link>
            </div>
        </div>
        </div>

    );

}

export default Menu;
