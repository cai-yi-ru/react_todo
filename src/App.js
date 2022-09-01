import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { AuthContext } from "./components/AuthContext";
import { LoadingContext } from "./components/LoadingContext";
import CheckedLayout  from "./components/CheckedLayout";
import './App.css';
import SignUp from './page/SignUp'
import Login from "./page/Login";
import Todo from './page/Todo'

function App() {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={{token, setToken}}>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Routes>
            <Route path="/">
              <Route path="/signup" element={<SignUp/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route element={<CheckedLayout/>}>
                <Route path="/" element={<Todo />} />
              </Route>
            </Route>
          </Routes>
        </LoadingContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
