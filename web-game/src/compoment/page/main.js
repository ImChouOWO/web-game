import React, { useState,useRef, useEffect } from 'react';
import MainGame from './Game';

function Main() {
    const [isDark, setIsDark] = useState(false);
    const [imgName,setImgName] = useState("");
    const [imgText,setImgText] = useState("歡迎來到高雄科技大學");
    

    return(
        <div className='main'>
            <div className='gameDiv'>
                <MainGame setIsDark={setIsDark} setImgName={setImgName} setImgText = {setImgText}/>
            </div>
         
           
            <div className={`schoolImg ${isDark ? 'hovered' : ''}`} >
                
                    <img className='img' src={imgName ? require(`./UI/${imgName}`) : require("./UI/door.jpg")} alt="School Entrance" />

                    <div className='textDiv'>
                        <span className={`text ${isDark ? 'hovered' : ''}`}>
                           {imgText}
                        </span>
                    </div>
                    
               
            </div>
                             
        </div>
    ); // 使用 ref
}

export default Main;
