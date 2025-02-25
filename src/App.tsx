import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link to="/" className="flex items-center px-2 py-2 text-gray-900 hover:text-gray-600">
                    Home
                  </Link>
                </div>
                <div className="flex space-x-4">
                  <Link to="/login" className="flex items-center px-2 py-2 text-gray-900 hover:text-gray-600">
                    Login
                  </Link>
                  <Link to="/register" className="flex items-center px-2 py-2 text-gray-900 hover:text-gray-600">
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/"
                  element={
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Auth Demo</h1>
                      <p className="text-gray-600">Please login or register to continue</p>
                    </div>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
