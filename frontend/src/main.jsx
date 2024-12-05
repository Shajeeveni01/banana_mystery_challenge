import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './utils/AuthContext';
import './index.css';


class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in Error Boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>  
        
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </AuthProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found. Please ensure 'root' div is present in index.html");
}
