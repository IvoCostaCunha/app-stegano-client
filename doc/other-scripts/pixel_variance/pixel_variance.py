import numpy as np
import matplotlib.pyplot as plt
from PIL import Image as img

h = 5
w = 5

rawImgPath = 'raw_img/5x5_black.data'
rawImgData = np.fromfile(rawImgPath, dtype=np.uint8, count = h*w*3).reshape(h,w*3)
# print('RAW', rawImgData)

rawImgPath1 = 'raw_img/5x5_blue.data'
rawImgData1 = np.fromfile(rawImgPath1, dtype=np.uint8, count = h*w*3).reshape(h,w*3)
for a in range(0, 5):
    print(rawImgData1[a])
    subArr = np.array([rawImgData1[a][n:n+3] for n in range(0, len(rawImgData1[a]), 3)])
    print(subArr)
    rawImgData1[a].reshape(5,3)

data = np.array([0,0,0,255,255,255,0,0,0,255,255,255])


# rawImgData1 = np.fromfile(rawImgPath1, dtype=np.uint8, count = h*w*3).reshape(h,w*3)
# print(rawImgData1)
img.fromarray(data, mode='RGB').save('png_image/5x5_blue.png')

def exportPng(filepath):
    img.fromarray(rawImgData).save(filepath)
    
def exportJpg(filepath, quality):
    # save parameters https://pillow.readthedocs.io/en/stable/handbook/image-file-formats.html
    # max quality for jpg is 95
    # optimise means an extra pass over the image in order to select optimal encoder settings 
    img.fromarray(rawImgData).save(filepath, optimize=True, quality=quality)

# Compressing raw images in .png and .jpg
exportPng('png_image/5x5_black.png')
exportJpg('jpg_image/5x5_black.jpg',50)

pngImg = img.open('png_image/5x5_black.png')
jpgImg = img.open('jpg_image/5x5_black.jpg')

def getAvgVar(imgA, imgB):
    imgAData = np.int16(np.concatenate(np.asarray(imgA)))
    imgBData = np.int16(np.concatenate(np.asarray(imgB)))
    varTab = []
    total = 0

    if(imgAData.size != imgBData.size):
        print("Imgs must be of the same size")
        return None

    for i in range(0, imgAData.size):
        #print(imgAData[i], imgBData[i], imgAData[i]-imgBData[i])
        list.append(varTab, np.abs(imgAData[i]-imgBData[i]))
    
    for i in range(0, len(varTab)):
        varTab[i] = varTab[i]/255

    for i in varTab:
        total = total+i
    
    #print(varTab)
    return(round(total/len(varTab),5))

def getPixelEqualityAvg(imgA, imgB):
    imgAData = np.int16(np.concatenate(np.asarray(imgA)))
    imgBData = np.int16(np.concatenate(np.asarray(imgB)))
    equalPixelTab = []

    if(imgAData.size != imgBData.size):
        print("Imgs must be of the same size")
        return None

    for i in range(0, imgAData.size):
        # print(imgAData[i], imgBData[i], imgAData[i]-imgBData[i])
        list.append(equalPixelTab, imgAData[i] == imgBData[i])
    
    return(round(sum(equalPixelTab)/len(equalPixelTab),5))

print('Avg var : ' , getAvgVar(rawImgData, jpgImg))
print('Pixel equality avg : ' , getPixelEqualityAvg(rawImgData, jpgImg))

# def buildGraph():
#     data = []
#     for i in range(15, 95):
#         jpgImg = img.open('jpg_image/5x5_black.jpg', i)
#         data[0,i] = getAvgVar(jpgImg)
#         data[1,i] = getPixelEqualityAvg(jpgImg)

#     plt.plot(data)
#     plt.ylabel('some numbers')
#     plt.show()


        