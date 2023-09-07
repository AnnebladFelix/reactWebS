import './App.css'
import Header from './Header'
import MainContent from './MainContent'
import {Routes, Route} from 'react-router-dom'
import NotFound from './Notfound'
import About from './About'

function App() {

  return (
    <>
      <div className='app-wrapper'>
        <Header />
        <Routes>
          <Route path='/' element={<MainContent />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </div>
    </>
  )
}

export default App
