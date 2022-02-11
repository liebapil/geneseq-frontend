import {Route , Routes} from 'react-router-dom'
import Home from './main/Home'
import User from './main/User'
import Mutation from './components/Mutation';


function App() {
  return (
    <div className="App">
     <Routes>
       <Route path="/" element={<User/>}/>
       <Route path="/gene" element={<Home/>}/>
       <Route path="/gene/mutation/:id" element={<Mutation/>}/>   
     </Routes>
    </div>
  );
}

export default App;
