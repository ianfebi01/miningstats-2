import "./App.scss";
import axios from "axios";
import { Routes, Route, Navigate } from "react-router-dom";
import LoggedIn from "../routes/LoggedIn";
import { Home, Login, Register } from "../pages";
import NotLoggedIn from "../routes/NotLoggedIn";
import AddIncome from "./AddIncome";
import AddCost from "./AddCost";
import IncomeList from "./IncomeList";
import CostList from "./CostList";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Routes>
      <Route element={<LoggedIn />}>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/addincome' element={<AddIncome />}></Route>
        <Route path='/addcost' element={<AddCost />}></Route>
        <Route path='/incomelist' element={<IncomeList />}></Route>
        <Route path='/costlist' element={<CostList />}></Route>
      </Route>
      <Route element={<NotLoggedIn />}>
        <Route path='/login' exact element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Route>
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
}

export default App;
