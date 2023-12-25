
import './App.css'
import ChessGame from './components/ChessGame'

function App() {

  return <div className='App'>
    <ChessGame withPGNViewer={false} invert={false}/>
    <ChessGame withPGNViewer={false} invert={true}/>
    </div>
}

export default App
