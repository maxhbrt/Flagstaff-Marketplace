import React from "react";
import './middle.scss';
import forestdale from './Farm-pics/forest-dale.png';
import roots from './Farm-pics/roots.jpg';
import eco from './Farm-pics/eco.png';


function Middle() {
    return(
        <div className="middle-container" id="middle">
            <a href="https://forestdalefarm.com" target="_blank">
            <img src={forestdale}/>
            </a>
            <a href="https://www.rootsmicrofarm.com" target="_blank">
            <img src={roots}/>
            </a>
            <a href="https://flagstaffecoranch.com" target="_blank">
            <img className="eco" src={eco}/>
            </a>

        </div>
    )
}

export default Middle