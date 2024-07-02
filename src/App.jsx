import React from 'react';
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import About from "./pages/About";
import AddArticle from "./pages/AddArticle";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ShowArticle from "./pages/ShowArticle";
import Welcome from "./pages/Welcome";
import PrivateRoute from './PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const routes = [
  { path: '/', title: 'Home', element: <Home />, isProtected: true },
  { path: '/welcome', title: 'Welcome', element: <Welcome />, isProtected: false },
  { path: '/about', title: 'About Us', element: <About />, isProtected: true },
  { path: '/add-article', title: 'Add Article', element: <AddArticle />, isProtected: true },
  { path: '/show-article/:id', title: 'Show Article', element: <ShowArticle />, isProtected: true },
  { path: '/login', title: 'Login', element: <Login />, isProtected: false },
];

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BlogProvider>
          <Router>
            <Layout>
              <Routes>
                {routes.map((route, index) => (
                  route.isProtected ? 
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={<PrivateRoute>{route.element}</PrivateRoute>} 
                    />
                  : 
                    <Route 
                      key={index} 
                      path={route.path} 
                      element={route.element} 
                    />
                ))}
              </Routes>
            </Layout>
          </Router>
        </BlogProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
