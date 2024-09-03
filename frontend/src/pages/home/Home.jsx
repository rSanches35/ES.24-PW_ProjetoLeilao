import React from "react";
import './Home.css'
import Logout from "../../components/logout/Logout";

const Home = () =>{

    return(
        <div className="body-home">
            <h1>Página Inicial</h1>
            <Logout/>
        </div>
    );
}; export default Home;