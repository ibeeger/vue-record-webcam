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
 <Cam ref="cam" :record="{duration: 10}" @recordCallback="upload" />
```


demo
![](./assets/rc.gif)