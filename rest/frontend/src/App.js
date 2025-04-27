import React, { useState } from 'react';
import { Container, Toast, ToastContainer } from 'react-bootstrap';
import './App.css';
import PostList from './components/PostList';
import PostContext from './context/PostContext';

function App() {
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  return (
    <PostContext.Provider value={{ showNotification }}>
      <div className="App">
        <Container>
          <header className="App-header">
            <h1 className="text-center mb-4">Post Management</h1>
          </header>
          <main>
            <PostList />
          </main>
        </Container>

        <ToastContainer position="top-end" className="p-3 toast-container">
          <Toast 
            show={notification.show} 
            onClose={() => setNotification({ ...notification, show: false })}
            bg={notification.type}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className={notification.type === 'success' ? 'text-white' : ''}>
              {notification.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </PostContext.Provider>
  );
}

export default App;