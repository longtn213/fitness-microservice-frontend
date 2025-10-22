import './App.css'
import {Button} from "@mui/material";
import Box from '@mui/material/Box';
import {useContext, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {AuthContext} from "react-oauth2-code-pkce"
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router";
import {setCredentials} from "./store/authSlice.js";
import ActivityList from "./component/ActivityList.jsx";
import ActivityForm from "./component/ActivityForm.jsx";
import ActivityDetail from "./component/ActivityDetail.jsx";

const ActivitiesPage = () =>{
    const [reload, setReload] = useState(false); // ✅ trigger reload

    const handleActivityAdded = () => {
        setReload(!reload); // toggle để báo cho ActivityList reload
    };

    return(
        <Box component="section" sx={{ p: 5, border: '1px dashed grey' }}>
            {/* ✅ Truyền callback cho form */}
            <ActivityForm onActivityAdded={handleActivityAdded} />

            {/* ✅ Truyền reload flag xuống list */}
            <ActivityList reload={reload} />
        </Box>
    )
}

function App() {
    const {token,tokenData, logIn,logOut,isAuthenticated} =useContext(AuthContext)
    const dispatch = useDispatch();
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(setCredentials({token, user:tokenData}))
            setAuthReady(true)
        }
    }, [token,tokenData,dispatch]);
  return (
    <Router>
        {!token ? (
            <Button variant ="contained" color="#dc004e" onClick={() =>{
                logIn()
            }}> LOGIN</Button>
        ) :(
            <div>
            {/*<pre>{JSON.stringify(tokenData, null, 2)}</pre>*/}
                <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
                    <Routes>
                        <Route path="/activities" element={<ActivitiesPage />} />
                        <Route path="/activities/:id" element={<ActivityDetail />} />

                        <Route path="/" element={token ? <Navigate to="/activities" replace /> : <div>Welcome! Please Login </div>} />
                    </Routes>
                </Box>
        </div>
        )}

    </Router>
  )
}

export default App
