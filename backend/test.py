import cv2
from PIL import Image

def replace_background(person_image_path, background_image_path, output_path):
    # 載入人像和背景圖像
    person_image = cv2.imread(person_image_path)
    background_image = cv2.imread(background_image_path)
    
    # 假設使用簡單的閾值操作來分割人物
    # 在實際應用中，可能需要更複雜的方法，如使用深度學習模型進行物件偵測和分割
    gray = cv2.cvtColor(person_image, cv2.COLOR_BGR2GRAY)
    _, mask = cv2.threshold(gray, 120, 255, cv2.THRESH_BINARY)

    # 反轉 mask，將人物區域保留，背景變為黑色
    mask_inv = cv2.bitwise_not(mask)

    # 從原圖和背景圖中分別提取需要的區域
    person_fg = cv2.bitwise_and(person_image, person_image, mask=mask)
    background_bg = cv2.bitwise_and(background_image, background_image, mask=mask_inv)

    # 將分割的人物和新背景結合
    result = cv2.add(person_fg, background_bg)

    # 儲存最終結果
    cv2.imwrite(output_path, result)

    return output_path

# 使用函數
output = replace_background('person.jpg', 'new_background.jpg', 'output.jpg')
