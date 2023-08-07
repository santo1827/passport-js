import React, { useEffect, useState } from 'react'

const App = () => {
  const [call, setCall] = useState('');

  useEffect(() => {
    fetch('/info/api')
    .then(response => response.json())
    .then(data => {
      setCall(data)
    })
    .catch(error => {
      console.error('Error: ', error);
    })
  }, [])

  return (
    <div>
      <h1>{call}</h1>
    </div>
  )
}

export default App