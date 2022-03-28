<template>
  <div class="login_container">
    <div align="center" class="down_container">
      <el-header>
        <h2 class="top_tip">
          人脸识别身份验证登录
        </h2>
        <h3 class="top_tip">
          【温馨提示：请保持光线充足，并正对摄像头】
        </h3>
      </el-header>
      <el-main>
        <hr/>
        <el-form label-width="60px" class="login_box">
          <el-form-item>
            <!--           TODO:人脸识别的视频显示位置，识别出人脸后转base64-->
            <video id="videoEl" autoplay muted></video>
            <canvas id="trackBox"></canvas>
            <canvas id="canvasImg"></canvas>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer>
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <el-button type="primary" class="mybtn" @click="reselectButton" plain>重新选择</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="success" class="mybtn" @click="loginButton" plain>确认登录</el-button>
          </el-col>
        </el-row>
        <hr/>
        <router-link :to="{path: '/'}">
          <el-button type="danger" class="mybtn" plain>取消</el-button>
        </router-link>
      </el-footer>
    </div>
  </div>
</template>
<script>
import * as faceapi from "@/assets/face-api/face-api";
import {faceLoginApi} from "@/api/login";

export default {
  data() {
    const errorMap = new Map([
      ['NotAllowedError', '摄像头已被禁用，请在当前浏览器设置中开启后重试'],
      ['AbortError', '硬件问题，导致无法访问摄像头'],
      ['NotFoundError', '未检测到可用摄像头'],
      ['NotReadableError', '操作系统上某个硬件、浏览器或者网页层面发生错误，导致无法访问摄像头'],
      ['OverConstrainedError', '未检测到可用摄像头'],
      ['SecurityError', '摄像头已被禁用，请在系统设置或者浏览器设置中开启后重试'],
      ['TypeError', '类型错误，未检测到可用摄像头']
    ])
    return {
      videoEl: document.querySelector('#videoEl'),// 视频区域
      trackBoxEl: document.querySelector('#trackBox'),// 人脸框绘制区域
      canvasImgEl: document.querySelector('#canvasImg'),// 图片绘制区域
      construct(options) {
        this.options = Object.assign({
          matchedScore: 0.9,
          mediaSize: {
            width: 540,
            height: 325
          }
        }, options)
      }

    }

  },
  mounted() {
  },
  methods: {
    loginButton() {

    },
    reselectButton() {

    },
    resize() {
      const tmp = [this.videoEl, this.canvasImgEl];
      for (let i = 0; i < tmp.length; i++) {
        tmp[i].width = this.options.mediaSize.width;
        tmp[i].height = this.options.mediaSize.height;
      }
      const wraperEl = document.querySelector('.wraper');
      wraperEl.style.width = `${this.options.mediaSize.width}px`;
      wraperEl.style.height = `${this.options.mediaSize.height}px`;
    },

    // 初始化视频流
    initVideo(stream) {
      this.videoEl.onplay = () => {
        this.onPlay();
      };
      this.videoEl.srcObject = this.mediaStreamTrack;
      setTimeout(() => this.onPlay(), 300);
    },

    // 初始化人脸识别
    async initDetection() {
      faceapi.loadTinyFaceDetectorModel('../assets/face-api/models');
      const mediaOpt = {
        video: true
      }
      // 获取 WebRTC 媒体视频流
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // 最新标准API
        this.mediaStreamTrack = await navigator.mediaDevices.getUserMedia(mediaOpt)
            .catch(this.mediaErrorCallback);
      } else if (navigator.webkitGetUserMedia) {
        // webkit内核浏览器
        this.mediaStreamTrack = await navigator.webkitGetUserMedia(mediaOpt)
            .catch(this.mediaErrorCallback);
      } else if (navigator.mozGetUserMedia) {
        // Firefox浏览器
        this.mediaStreamTrack = await navigator.mozGetUserMedia(mediaOpt)
            .catch(this.mediaErrorCallback);
      } else if (navigator.getUserMedia) {
        // 旧版API
        this.mediaStreamTrack = await navigator.getUserMedia(mediaOpt)
            .catch(this.mediaErrorCallback);
      }
      this.initVideo();
    },
    // 人脸框绘制
    drawFaceBox(dimensions, trackBox, detections, score) {
      this.showEl(trackBox);

      // 修改画布大小
      trackBox.width = this.options.mediaSize.width;
      trackBox.height = this.options.mediaSize.height;

      const resizedDetections = detections.map(res => res.forSize(trackBox.width, trackBox.height));

      // 人脸框绘制参数： 人脸评分 > matchedScore，绘制绿色线框，否则，绘制红色线框。
      const faceBoxOpts = score > this.options.matchedScore ? {
        lineWidth: 2,
        textColor: 'green',
        boxColor: 'green',
        withScore: true
      } : {
        lineWidth: 2,
        textColor: 'red',
        boxColor: 'red',
        withScore: true
      };

      // 侦测到人脸后，绘制人脸线框
      faceapi.drawDetection(trackBox, resizedDetections, faceBoxOpts);
    },
    showEl(el) {
      el.style.visibility = 'visible';
      return this;
    },
    hideEl(el) {
      el.style.visibility = 'hidden';
      return this;
    }
  }
}
</script>
<style scoped>
.login_container {
  height: 100vh;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: 100% 100%;
  background-color: #383838;
  background-blend-mode: multiply;
}

.box-card {
  height: 600px;
  width: 750px;
  position: fixed;
  left: 30%;
  top: 20%;
}

.down_container {
  transform: translateY(20%);
}

.top_tip {
  color: #e3e8f9;
}

.mybtn {
  width: 70%;
}

.login_box {
  height: 400px;
  width: 550px;
  background-color: #fff;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
}

</style>
