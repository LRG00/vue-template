<template name="component-name">
  <div>
    <div @click="pause">暂停</div>
    <div @click="play">播放</div>
    <div>
      音量设置
      <input type="range" @change="volume" min="1" max="10" />
    </div>
    <div>
      速率设置
      <input type="range" @change="playbackRate" min="1" max="30" />
    </div>
    <div @click="prev">上一首</div>
    <div @click="next">下一首</div>

    <div class="audio-wrapper">
      <audio id="myaudio" preload="auto">
        <source :src="currentSong" type="audio/mpeg" />
        <source :src="currentSong" type="audio/ogg" />
        <!-- 如果浏览器不支持，则会呈现下面内容 -->
        <p>
          你的浏览器不支持HTML5音频，你可以
          <a :href="currentSong">下载</a>这个音频文件。
        </p>
      </audio>
      <div class="audio-left">
        <img v-show="isPaused" @click="playOrPause('play')" src="./pause.png" />
        <img
          v-show="!isPaused"
          @click="playOrPause('pause')"
          src="./play.png"
        />
      </div>
      <div class="audio-right">
        <p style="max-width: 536px;">Beta-B_Kan R. Gao.mp3</p>
        <div class="progress-bar-bg" id="progressBarBg">
          <span id="progressDot"></span>
          <div class="progress-bar" id="progressBar"></div>
        </div>
        <div class="audio-time">
          <span class="audio-length-current" id="audioCurTime"></span>
          {{ currentTime }}
          <span class="audio-length-total">{{ totalTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AudioPlayer from "@/common/audioPlayer";
export default {
  data() {
    return {
      currentTime: "00:00",
      totalTime: "00:00",
      isPaused: false,
      index: 0,
      currentSong:
        "http://120.77.239.216:3000/6d1062903834839c5e810d2fd0d6a1e572.mp3",
      musicList: [
        {
          url:
            "http://120.77.239.216:3000/6d1062903834839c5e810d2fd0d6a1e572.mp3"
        },
        {
          url: "http://120.77.239.216:3000/791dc66de58f5ee24d70c24a6ee89ba3.mp3"
        },
        {
          url:
            "http://120.77.239.216:3000/66c457beca26a87e47feec6108af50d00.mp3"
        }
      ]
    };
  },

  mounted() {
    this.audioInit();
  },
  watch: {
    index(current) {
      this.currentSong = this.musicList[current].url;
    },
    currentSong(val) {
      this.audioPlayer.load();
      this.audioPlayer.play();
      return val;
    }
  },
  methods: {
    audioInit() {
      const myAudio = document.getElementById("myaudio");
      this.audioPlayer = new AudioPlayer(myAudio);
      this.isPaused = this.audioPlayer.isPaused();
      myAudio.addEventListener("ended", () => {
        this.next();
      });
      myAudio.addEventListener(
        "timeupdate",
        () => {
          this.updateProgress(myAudio);
        },
        false
      );
    },
    updateProgress(audio) {
      let value = audio.currentTime / audio.duration;
      document.getElementById("progressBar").style.width = value * 100 + "%";
      document.getElementById("progressDot").style.left = value * 100 + "%";
      this.currentTime = this.transTime(audio.currentTime);
      this.totalTime = audio.duration
        ? this.transTime(audio.duration)
        : "00.00";
    },
    transTime(value) {
      let time = "";
      let h = parseInt(value / 3600);
      value %= 3600;
      let m = parseInt(value / 60);
      let s = parseInt(value % 60);
      if (h > 0) {
        time = this.formatTime(h + ":" + m + ":" + s);
      } else {
        time = this.formatTime(m + ":" + s);
      }

      return time;
    },
    formatTime(value) {
      let time = "";
      let s = value.split(":");
      let i = 0;
      for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? "0" + s[i] : s[i];
        time += ":";
      }
      time += s[i].length == 1 ? "0" + s[i] : s[i];

      return time;
    },
    pause() {
      this.audioPlayer.pause();
    },
    play() {
      this.audioPlayer.play();
    },
    playOrPause(type) {
      this.isPaused = !this.isPaused;
      this.audioPlayer[type]();
    },
    volume(e) {
      this.audioPlayer.changeVolume(e.target.value / 10);
    },
    playbackRate(e) {
      this.audioPlayer.changePlaybackRate(e.target.value / 10);
    },
    prev() {
      if (this.index !== 0) this.index--;
    },
    next() {
      if (this.index < this.musicList.length - 1) this.index++;
    }
  }
};
</script>
<style>
.audio-wrapper {
  background-color: #fcfcfc;
  margin: 10px auto;
  max-width: 670px;
  height: 70px;
  border: 1px solid #e0e0e0;
}

.audio-left {
  float: left;
  text-align: center;
  width: 18%;
  height: 100%;
}

.audio-left img {
  width: 40px;
  position: relative;
  top: 15px;
  margin: 0;
  display: initial; /* 解除与app的样式冲突 */
  cursor: pointer;
}

.audio-right {
  margin-right: 2%;
  float: right;
  width: 80%;
  height: 100%;
}

.audio-right p {
  font-size: 15px;
  height: 35%;
  margin: 8px 0;

  /* 歌曲名称只显示在一行，超出部分显示为省略号 */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 243px; /* 要适配小屏幕手机，所以最大宽度先设小一点，后面js根据屏幕大小重新设置 */
}

.progress-bar-bg {
  background-color: #d9d9d9;
  position: relative;
  height: 2px;
  cursor: pointer;
}

.progress-bar {
  background-color: #649fec;
  width: 0;
  height: 2px;
}

.progress-bar-bg span {
  content: " ";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  background-color: #3e87e8;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -5px;
  margin-left: -5px;
  cursor: pointer;
}

.audio-time {
  overflow: hidden;
  margin-top: -1px;
}

.audio-length-total {
  float: right;
  font-size: 12px;
}

.audio-length-current {
  float: left;
  font-size: 12px;
}
</style>
