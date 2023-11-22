import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navicationbar from './Component/Navicationbar';
import LoginCom from './Component/LoginCom'
import RegisterCom from './Component/RegisterCom'
import Home from './Component/Home'
import Profile from './Component/Profile'
import AdminCom from './Component/AdminCom'
import SocietyDetails from './Component/SocietyDetails';
import MembersDetails from './Component/MembersDetails';
import BillDetails from './Component/BillDetails';
import Bills from './Component/Bills';
import Authenticate from './Component/ProtectedRoute/Authenticate';
import ForUser from './Component/ProtectedRoute/ForUser';
import ForAdmin from './Component/ProtectedRoute/ForAdmin';
import AddAdmin from './Component/AddAdmin';
import SocietyAdmin from './Component/ProtectedRoute/SocietyAdmin';
import Footer from './Component/Footer';
import SocietyMembers from './Component/SocietyMembers';
import OTPverification from './Component/OTPverification';


function App() {
  return (
    <>
      <Navicationbar />
      
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Authenticate><LoginCom/></Authenticate>} />
          <Route path='/register' element={<Authenticate><RegisterCom/></Authenticate>} />
          <Route path='/forgotpassword' element={<Authenticate><OTPverification/></Authenticate>}/>
          {/* For Users */}
          <Route path='/' element={<ForUser><Home /></ForUser>} />
          <Route path='/bills' element={<ForUser><Bills /></ForUser>}/>
          <Route path='/profile' element={<ForUser><Profile /></ForUser>} />
          {/* For SocietyAdmin */}
          {/* <Route path='/adminportal' element={<SocietyAdmin><AdminCom/></SocietyAdmin>}/> */}
          <Route path='/societydetails/membersdetails' element={<SocietyAdmin><MembersDetails/></SocietyAdmin>}/>
          <Route path='/societydetails/membersdetails/billdetails' element={<SocietyAdmin><BillDetails/></SocietyAdmin>}/>
          {/* For Super Admin */}
          <Route path='/addadmin' element={<ForAdmin><AddAdmin/></ForAdmin>}/>
          <Route path='/societydetails' element={<ForAdmin><SocietyDetails/></ForAdmin>}/>
          <Route path='/societydetails/memberslist' element={<ForAdmin><SocietyMembers/></ForAdmin>}/>
              
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
