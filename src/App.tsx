import Container from '@mui/material/Container/Container';
import React from 'react';
import {Route , Routes} from 'react-router-dom';
import './App.css';
import {Navigate} from 'react-router-dom'
import UsersList from "./components/UsersList";
import {Login} from "./components/Login";

function App() {
  //   const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  // const[users,setUsers] = useState<any>(null)
  //   console.log(isLoggedIn)
  //   useEffect(()=>{
  //       createItem().then(res=>{
  //           setUsers(res)
  //       })
  //   },[])
  return (
      <div>
          <Container fixed>

              <Routes>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/' element={<UsersList/>}/>
                  <Route path='/users' element={<UsersList/>}/>
                  <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                  <Route path="*" element={<Navigate to='/404'/>}/>
              </Routes>

          </Container>

      </div>
  );
}

export default App;
