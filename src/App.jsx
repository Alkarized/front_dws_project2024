import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import LoginForm from "./components/login/LoginForm.tsx";
import SegmentPage from "./components/segments/SegmentPage.tsx";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/" element={<SegmentPage/>}/>
            </Routes>
        </Router>
    )
}

export default App
