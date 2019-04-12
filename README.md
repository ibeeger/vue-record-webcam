# vue-record-webcam

```javascript
props: {
    promiseOptions: {
       type: Object,
       default: function () {
           return {
                video: true,
                audio: false
           }
       }
    },
    placeholder: {
        type: String
    },
    record: {
        type: Object,
        default: function () {
            return {
                duration: 0
            }
        }
    }
}
```

```javascript
 <Cam ref="cam" ref='cam' :record="{duration: 10}" @recordCallback="upload" @faceCallback="getFaceNum" />
```

### method

```javascript
    this.$refs.cam.drawFace()   // 返回当前画面的图片 base64        
    recordCallback // 如果录制的话会通过这个透传 base64         
    faceCallback // 检测结果有变化的时候回调出来 object
```


demo
![](./assets/rc.gif)