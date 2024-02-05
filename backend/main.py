from flask import Flask, request, jsonify,send_from_directory
import os
from flask_socketio import SocketIO
from flask_cors import CORS,cross_origin
import cv2
import mediapipe as mp
import numpy as np

app = Flask(__name__,
            static_url_path='/python',   
            static_folder='static',      
            template_folder='templates') 
app.config["DEBUG"] = True
app.config['JSON_AS_ASCII'] = False




CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}},
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

socketio = SocketIO(app, cors_allowed_origins="*")


mp_drawing = mp.solutions.drawing_utils
mp_selfie_segmentation = mp.solutions.selfie_segmentation

def replace_background(image_path, background_path, output_path, scale=0.5, position=(100, 100)):
    bg_image = cv2.imread(background_path)
    person_image = cv2.imread(image_path)

    if bg_image is None or person_image is None:
        print("無法加載一個或多個圖像")
        return

    with mp_selfie_segmentation.SelfieSegmentation(model_selection=1) as selfie_segmentation:
        # 計算縮放後的新尺寸
        width = int(person_image.shape[1] * scale)
        height = int(person_image.shape[0] * scale)
        dim = (width, height)

        # 等比例縮小人像
        resized_person_image = cv2.resize(person_image, dim, interpolation=cv2.INTER_AREA)

        # 處理縮小後的人像
        person_image_rgb = cv2.cvtColor(resized_person_image, cv2.COLOR_BGR2RGB)
        results = selfie_segmentation.process(person_image_rgb)

        # 創建分割掩碼，並調整尺寸以符合縮放後的人像
        segmentation_mask = results.segmentation_mask
        segmentation_mask_resized = cv2.resize(segmentation_mask, dim, interpolation=cv2.INTER_NEAREST)

        # 準備最終圖像
        output_image = bg_image.copy()

        # 計算用戶圖像在背景中的位置
        start_x, start_y = position
        end_x, end_y = start_x + width, start_y + height

        # 確保座標不超出背景圖像範圍
        start_x, start_y = max(0, start_x), max(0, start_y)
        end_x, end_y = min(bg_image.shape[1], end_x), min(bg_image.shape[0], end_y)

        # 調整掩碼尺寸以與背景圖像的相應部分匹配
        condition = np.stack((segmentation_mask_resized,) * 3, axis=-1) > 0.1
        condition = condition[:end_y-start_y, :end_x-start_x, :]

        # 合成新背景和人像
        output_image[start_y:end_y, start_x:end_x] = np.where(condition, resized_person_image[:end_y-start_y, :end_x-start_x, :], output_image[start_y:end_y, start_x:end_x])

        # 儲存結果
        cv2.imwrite(output_path, output_image)

    return output_path
        

    


UPLOAD_FOLDER = "./pic/user"
CONVET_FOLDER = './pic/convert'
app.config['CONVERT_FOLDER'] = CONVET_FOLDER
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/upload',methods=['POST'])
def user_pic_upload():
    if "file" not in request.files:
        print('No file Upload')
        return "No file Upload" ,400
    
    file = request.files["file"]

    if file.filename == "":
        print('No file Select')
        return "No file Select" ,400
        
    if file:
        filename = "user_01.png"
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        print('File successfully uploaded')
        replace_background("./pic/user/user_01.png", './pic/background/background_1.png', './pic/convert/convert.png', scale=0.8, position=(0, 150))
        socketio.emit("convert","sucess")
        return 'File successfully uploaded', 200
    
    
  



@app.route('/convert')
def show_uploaded_image():
    filename = "convert.png"

    return send_from_directory(app.config['CONVERT_FOLDER'], filename)






@socketio.on("take")
def test(data):
    print(data)


if __name__ == '__main__':
    save_path = 'pic'
    if not os.path.exists(save_path):
        os.makedirs(save_path)
        print("folder creat")
    else:
        print("folder exit")
        
    app.run(debug=True)