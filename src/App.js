import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
// import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 8;
  // apiKey = process.env.REACT_APP_NEWS_API

  const apiKey = '49069cc9f99148869d7f289cecb908eb'

  // const [progress, setProgress] = useState(0);

  return (
    <div>
    <Router>
      <Navbar/>
      {/* <LoadingBar color="#f11946" height= {6} progress={progress}/> */}
      <Routes>
        <Route exact path='/' element={<News  apiKey={apiKey} key='general' pageSize={pageSize} country="in" category="general"/>} />
        <Route exact path='/business' element={<News apiKey={apiKey} key='business' pageSize={pageSize} country="in" category="business"/>}/>
        <Route exact path='/entertainment' element={<News apiKey={apiKey} key='entertainment' pageSize={pageSize} country="in" category="entertainment"/>}/>
        {/* <Route exact path='/general' element={<News apiKey={apiKey} key='general' pageSize={pageSize} country="in" category="general"/>}/> */}
        <Route exact path='/health' element={<News apiKey={apiKey} key='health' pageSize={pageSize} country="in" category="health"/>}/>
        <Route exact path='science' element={<News apiKey={apiKey} key='science' pageSize={pageSize} country="in" category="science"/>}/>
        <Route exact path='/sports' element={<News apiKey={apiKey} key='sports' pageSize={pageSize} country="in" category="sports"/>} />
        <Route exact path='/technology' element={<News  apiKey={apiKey} key='technology' pageSize={pageSize} country="in" category="technology"/>}/>
      </Routes>
    </Router>
    </div>
  )
}
export default App;
