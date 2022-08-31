import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { AuthContext } from "./components/AuthContext";
import CheckedLayout  from "./components/CheckedLayout";
import './App.css';
import SignUp from './page/SignUp'
import Login from "./page/Login";
import Todo from './page/Todo'
import Test from './page/Test'

function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <AuthContext.Provider value={{token, setToken}}>
        <Routes>
          <Route path="/">
            <Route path="/" element={<Test/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route element={<CheckedLayout/>}>
              <Route path="/todo" element={<Todo />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
