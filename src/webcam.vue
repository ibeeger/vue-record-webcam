<template>
    <div class="container">
        <p v-if="error" class="text">
            {{msg}}
        </p>
        <video v-else ref="video" poster=""></video>
    </div>
</template>

<script>
export default {
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
    },
    data: function () {
        return {
            mediaRecorder: null,
            recordedChunks: [],
            error: false,
            msg: '获取权限失败！',
            stream: null,
            recordTimer: null
        }
    },
    mounted: async function () {
        let {promiseOptions, record} = this
        let stream = await this.getPromise(promiseOptions)
        if (stream) {
            this.stream = stream
            this.$refs.video.srcObject = stream;
            this.$refs.video.play()
            if (record.duration) {
                const options = {mimeType: 'video/webm;codecs=vp9'};
                this.mediaRecorder = new MediaRecorder(stream, options)
                this.mediaRecorder.addEventListener('dataavailable', this.startRecord)
                this.mediaRecorder.start(10)
                this.recordTimer = setInterval(() => {
                    this.mediaRecorder.stop()
                }, record.duration * 1000)
            }
        } else {
            this.error = true
        }
    },
    destroyed: function () {
        clearInterval(this.recordTimer)
    },
    methods: {
        startRecord: function (result) {
            if (result.data.size > 0) {
                this.recordedChunks.push(result.data)
            }
            if (this.mediaRecorder.state === 'inactive') {
                    const blob = new Blob(this.recordedChunks, { type: 'video/webm; codecs=opus' });
                    let reader = new FileReader();
                    reader.onload = () => {
                        this.$emit('recordCallback', reader.result)
                        this.mediaRecorder.start(10)
                        this.recordedChunks = []
                    }
                    reader.readAsDataURL(blob, 'utf-8')
            }
        },
        getPromise (options) {
            return new Promise(function (resolve) {
                navigator.getUserMedia(options, resolve, function () {
                    resolve(null)
                })
            })
        }
    }
}
</script>

<style>
.container{
    width: 100%;
    height: 100%;
}
.container video{
        width: 100%;
        height: 100%;
    }
</style>
