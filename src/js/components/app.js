import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ECG from './ECG';
import FAQ from './FAQ';
import './app.css';

export default function App() {
    return (
        <Router>
            <nav>
                <ul id='nav'>
                    <li>
                        <Link to="/faq">Faq</Link>
                    </li>
                    <li>
                        <Link to="/ecg">Ecg</Link>
                    </li>
                </ul>
                <Route path="/faq" component={FAQ} />
                <Route path="/ecg" component={ECG} />
            </nav>
        </Router>
    );
}

