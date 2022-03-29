<template>
  <div>
    <div class="body-bg" v-if="!isLoading">
      <div class="WgciCg LCN0VA"></div>
      <h2 class="title">人脸识别验证登录</h2>
      <h3 class="title">【温馨提示：请保持光线充足，并正对摄像头】</h3>
      <h2 class="scanTip">{{scanTip}}</h2>
      <div class="take-photo" v-show="showContainer">
        <video autoplay height="400" id="video" loop muted preload ref="refVideo" width="500"></video>
        <canvas height="400" id="canvas" ref="refCanvas" width="500"></canvas>
      </div>
      <img :src="imgUrl" class="imgpre" height="400" v-show="!showContainer" width="500"/>
    </div>
  </div>
</template>

<script>
import tracking from '@/assets/js/tracking-min'
import '@/assets/js/face-min'
export default {
  data(){
    return {
      showContainer: true,   // 显示
      tracker: null,
      tipFlag: false,         // 提示用户已经检测到
      flag: false,            // 判断是否已经拍照
      context: null,          // canvas上下文
      removePhotoID: null,    // 停止转换图片
      scanTip: '正在调取摄像头...', // 提示文字
      imgUrl: '',              // base64格式图片
      canvas: null,
      video: null,
      streamIns: null,      // 视频流
      isLoading: false,
      userData: ''
    }
  },
  mounted() {

  },
  methods:{
    // 访问用户媒体设备
    getUserMedia(constrains, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        // 最新标准API
        navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error);
      } else if (navigator.webkitGetUserMedia) {
        // webkit内核浏览器
        navigator.webkitGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.mozGetUserMedia) {
        // Firefox浏览器
        // eslint-disable-next-line no-undef
        navigator.mozGetUserMedia(constrains).then(success).catch(error);
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator.getUserMedia(constrains).then(success).catch(error);
      } else {
        this.scanTip = "你的浏览器不支持访问用户媒体设备"
      }
    },
    success(stream) {
      this.streamIns = stream
      // webkit内核浏览器
      this.URL = window.URL || window.webkitURL
      if ("srcObject" in this.$refs.refVideo) {
        this.$refs.refVideo.srcObject = stream
      } else {
        this.$refs.refVideo.src = this.URL.createObjectURL(stream)
      }
      //播放视屏方法最好写在onloadmetadata回调函数中，否则可能会报错。
      //播放视频的时候出于安全性考虑，必须在本地环境中测试，也就是http://localhost/xxxx中测试，或者带有https://xxxxx环境中测试，不然的话或有跨域问题。
      this.$refs.refVideo.onloadedmetadata = e => {
        // 播放视频
        this.$refs.refVideo.play()
        this.playVideo()
      }
    },
    error(e) {
      this.scanTip = "访问用户媒体失败" + e.name + "," + e.message
    },
    playVideo(){
      this.getUserMedia({
        video: {
          width: 500, height: 400, facingMode: "user"
        }     /* 前置优先 */
      }, this.success, this.error)
      this.video = document.getElementById('video')
      this.canvas = document.getElementById('canvas')
      this.context = this.canvas.getContext('2d') // 画布
      // eslint-disable-next-line no-undef
      this.tracker = new tracking.ObjectTracker('face')
      this.tracker.setInitialScale(4)
      this.tracker.setStepSize(2)
      this.tracker.setEdgesDensity(0.1)
      // eslint-disable-next-line no-undef
      tracking.track('#video', this.tracker, {camera: true})
      this.tracker.on('track', this.handleTracked)
    },
    // 追踪事件
    handleTracked(event) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      if (event.data.length === 0) {
        this.scanTip = '未识别到人脸'
      } else {
        if (!this.tipFlag) {
          this.scanTip = '识别到人脸，请保持当前姿势~'
        }
        // 1秒后拍照，仅拍一次
        if (!this.flag) {
          this.scanTip = '拍照中...'
          this.flag = true
          this.removePhotoID = setTimeout(() => {
                this.tackPhoto()
                this.tipFlag = true
              },2000)
        }
        event.data.forEach(this.plot)
      }
    },
    plot(rect) {
      this.context.strokeStyle = '#eb652e'
      this.context.strokeRect(rect.x, rect.y, rect.width, rect.height)
      this.context.font = '11px Helvetica'
      this.context.fillStyle = '#fff'
      this.context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
      this.context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
    },
    tackPhoto() {
      this.context.drawImage(this.$refs.refVideo, 1, 0, 500, 400)
      // 保存为base64格式
      this.imgUrl = this.saveAsPNG(this.$refs.refCanvas)
      // axios({
      //   method: 'post',
      //   url: '/login/detectFaces',
      //   data: formData,
      // }).then(function (response) {
      //
      //   if (response.data.data.firstLogin) {
      //     window.location.href = "/login/index1"
      //   } else {
      //     window.location.href = "/login/index2"
      //   }
      // }).catch(function (error) {
      //   console.log(error);
      // });
      // detectFaces(formData).then(res => {
      //     this.isLoading = true
      //     if (res.code === 200) {
      //         alert(111)
      //         // 登录成功保存token
      //         this.userData = res.data
      //     }
      // }).catch(err => {
      //     console.log(err);
      // })

      this.close()
      this.scanTip = '登录中，请稍等~'
      this.isLoading = true
    },

    // 关闭并清理资源
    close() {
      this.video.srcObject.getTracks()[0].stop()
      this.flag = false
      this.tipFlag = false
      this.showContainer = false
      this.tracker && this.tracker.removeListener('track', this.handleTracked) && tracking.track('#video', this.tracker, {camera: false})
      this.tracker = null
      this.context = null
      this.scanTip = ''
      clearTimeout(this.removePhotoID)
      if (this.streamIns) {
        this.streamIns.enabled = false
        this.streamIns.getTracks()[0].stop()
        this.streamIns.getVideoTracks()[0].stop()
      }
      this.streamIns = null
    }
  }
}
</script>

<style scoped>
.body-bg {
  background: url("../assets/img/login_bg.jpg");
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -10;
  zoom: 1;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.filmvideo {
  margin: 200px auto;
  width: 600px;
  height: 400px;
  display: block;
  clear: both;
}
.take-photo {
  position: relative;
  z-index: 99999;
}

.close {
  width: 0.8rem;
  height: 0.8rem;
  text-align: center;
  margin: -50px auto;
}

.rect {
  border: 2px solid #0aeb08;
  position: fixed;
  z-index: 3;
}
.imgpre {
  width: 500px;
  height: 400px;
  display: block;
  clear: both;
  position: absolute;
  margin: 0px auto;
  left: 0;
  right: 0;
  z-index: 7;
  border-radius: 10px;
}
video, canvas {
  width: 500px;
  height: 400px;
  margin: 0px auto;
  position: absolute;
  left: 0;
  right: 0;
  border-radius: 10px;
}
.scanTip {
  padding-top: 80px;
  padding-bottom: 40px;
  position: relative;
  z-index: 99999;
  text-align: center;
  color: white;
  margin: 0px auto;
  font-size: 18px;
}
.title{
  color: white;
  text-align: center;
  position: relative;
  padding-top: 30px;
  z-index: 99999;
}

.WgciCg {
  backdrop-filter: blur(2px);
  background: linear-gradient(180deg, rgba(0, 0, 0, .8), rgba(0, 0, 0, .4), rgba(0, 0, 0, .8));
  min-height: 100%;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

</style>
