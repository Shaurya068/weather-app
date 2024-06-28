import './App.css';
import Contain from './components/Contain'
import LoadingBar from 'react-top-loading-bar'
import { useState } from 'react';




function App() {
  const [progress, setProgress] = useState(0)
  const progress1 = (progress) => {
    setProgress(progress)
  }
  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}

      />
      <Contain setProgress={progress1} />
    </>
  );
}

export default App;
