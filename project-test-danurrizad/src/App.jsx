import { useState, useEffect } from 'react'
import './App.css'
import { HashRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Ideas from './pages/Ideas'
import Home from './pages/Home'
import Work from './pages/Work'
import About from './pages/About'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Services from './pages/Services'
import IdeasPosts from './pages/IdeasPosts'

function App() {
  const [dataApiLocal, setDataApiLocal] = useState([]);

  useEffect(() => {
    const dataApi = JSON.parse(localStorage.getItem("dataApiLocal"));
    setDataApiLocal(dataApi);
  },[]);

  // if (dataApiLocal) {
  //   console.log("Data dari localStorage:", dataApiLocal);
  // } else {
  //   console.log("Data tidak ditemukan di localStorage");
  // }

  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/work' element={<Work/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/services' element={<Services/>}/>
          <Route path='/ideas' element={<Ideas/>}/>
          <Route path='/careers' element={<Careers/>}/>
          <Route path='/contact' element={<Contact/>}/>
          {dataApiLocal ? (
            <>
              {dataApiLocal.map(data => (
                <Route
                  key={data.slug}
                  path={`/ideas/${data.slug}`}
                  element = {<IdeasPosts title={data.title} content={data.content}/>}
                />
              ))}
            </>
          ):null}
        </Routes>
      </Router>
    </>
  )
}

export default App
