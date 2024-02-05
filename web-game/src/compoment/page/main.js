import React, { useState,useRef, useEffect } from 'react';
import MainGame from './Game';
import Pic from './Pic';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

function Main() {
    const [isDark, setIsDark] = useState(false);
    const [imgName,setImgName] = useState("");
    const [imgText,setImgText] = useState("歡迎來到高雄科技大學");
    const [takePic,setPic] = useState(false);
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        const newSocket = io("http://127.0.0.1:5000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
          };
    },[]);
    useEffect(() => {
        const newSocket = io('http://127.0.0.1:5000');
        setSocket(newSocket);    
        newSocket.on("convert", (data) => {
            if (data == "sucess") {
                window.location.href = 'http://127.0.0.1:5000/convert';
            }
           
        });
        // 接收後即關閉通道
        return () => newSocket.disconnect();
      }, []);




    return(
        <div className='main'>
            <div className='gameDiv'>
                <MainGame setIsDark={setIsDark} setPic={setPic} setImgName={setImgName} setImgText = {setImgText}/>
            </div>
         
           
            <div className={`schoolImg ${isDark ? 'hovered' : ''}`} >
                
                    <img className='img' src={imgName ? require(`./UI/${imgName}`) : require("./UI/door.jpg")} alt="School Entrance" />

                    <div className='textDiv'>
                        <span className={`text ${isDark ? 'hovered' : ''}`}>
                           {imgText}
                        </span>
                    </div>
                    
            </div>
            <div className={`picDiv ${takePic ? 'hovered' : ''}`} style={!takePic ? {display: 'none' } : {}}>
                    <Pic/>
            </div>
            
            
                             
        </div>
    ); // 使用 ref
}

export default Main;
