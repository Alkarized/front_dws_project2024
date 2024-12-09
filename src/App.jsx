import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import './App.css'
import LoginForm from "./components/login/LoginForm.tsx";
import SegmentPage from "./components/segments/SegmentPage.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/" element={<SegmentPage/>}/>
                </Routes>
            </Router>

            <ToastContainer
                stacked
                position="top-left"
                autoClose={2000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition: Slide
            />
        </>

    )
}

export default App
