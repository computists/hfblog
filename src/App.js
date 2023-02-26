import './App.css';
import Main from './pages/main';
import Note from './pages/note';
import Contact from './pages/contact';
import Header from './components/header';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Edit from './pages/edit';
import Login from './pages/login';
import Signup from './pages/signup';
import PrivateRoute from './pages/privateroute.page';

import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
        <Routes>
          <Route exact path='/' element={<Main />} style={{ textDecoration: 'none' }}/>
          <Route path='/contact' element={<Contact />} style={{ textDecoration: 'none' }}/>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoute />} >
            <Route path='/note' element={<Note />} style={{ textDecoration: 'none' }}/>
            <Route path='/edit/:postId' element={<Edit />} style={{ textDecoration: 'none' }}/>
          </Route>  
        </Routes>
      <Footer />
      
    </div>
  );
}

export default App;
