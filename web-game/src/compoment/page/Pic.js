import React, { useState, useRef, useEffect } from 'react';
import "../css/main.css"
import io from 'socket.io-client';
import Cookies from 'js-cookie';
function Pic() {
    const [streaming, setStreaming] = useState(false);
    const [userID,setID] = useState("user001");
    const [canSee ,setSee] = useState(true);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isUpload,setUPload] = useState(false);
    const [socket, setSocket] = useState(null);
    useEffect(()=>{
        const newSocket = io("http://127.0.0.1:5000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
          };
    },[]);

    useEffect(() => {
        // 獲取用戶的攝像頭
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            .then(stream => {
                const video = videoRef.current;
                video.srcObject = stream;
    
                // 監聽 'canplay' 事件來開始播放視頻
                video.addEventListener('canplay', () => {
                    video.play().catch(err => console.log("Error playing video: ", err));
                });
            })
            .catch(err => {
                console.log("An error occurred: " + err);
            });
    
        return () => {
            // 清理
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    

    const takePicture = () => {
        const context = canvasRef.current.getContext('2d');
        if (videoRef.current && context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const dataUrl = canvasRef.current.toDataURL('image/png');
            uploadImage(dataUrl);
    
            // 創造閃爍效果
            canvasRef.current.classList.add("flash");
            setTimeout(() => {
                canvasRef.current.classList.remove("flash");
                // 确保动画完成后，canvas 内容不变
                context.drawImage(videoRef.current, 0, 0);
            }, 1000); // 动画持续时间
            setSee(false);
            // 暂时不停止视频播放
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
    };
    
    
    

    const uploadImage = (imageData) => {
        // 將 Base64 圖像數據轉換為 blob
        fetch(imageData)
            .then(res => res.blob())
            .then(blob => {
                const formData = new FormData();
                formData.append('file', blob, userID + '.png');
    
                // 發送表單數據
                fetch('http://127.0.0.1:5000/upload', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            });
    };
    

    return (
        <>
       <div className='camaraContent'>
            <div className='camaraDiv'>
                <video className='video' ref={videoRef} style={!canSee ? {display: 'none' } : {}}></video>
                <canvas className='canvas' ref={canvasRef}  style={canSee ? {display: 'none' } : {}}></canvas> 
            </div>
            <div className='btnDiv'>
                <img className='capture' onClick={takePicture} src={require(`./UI/capture.png`)}></img>
            </div>
        </div>

        </>
    );
}

export default Pic;
