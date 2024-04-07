import React from 'react';
import './App.css';
import ClientComponent from './ClientComponent';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Welcome to My App</h1>
            </header>
            <main>
                <ClientComponent />
            </main>
        </div>
    );
}

export default App;
