<!--
 * @Author: liruigang
 * @Date: 2019-10-18 17:03:52
 * @LastEditors: liruigang
 * @LastEditTime: 2019-10-19 10:39:00
 * @UI: 
 -->
<template name="component-name">
  <div>
    <a-button type="primary" @click="showDrawer">
      打开播放器
    </a-button>
    <a-drawer
      :placement="placement"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <div
        class="m-playbar"
        style="height:47px;border:1px solid #000;width:1140px;margin:0 auto"
      >
        <div class="btns">
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="prev"
            class="prv"
            title="上一首(ctrl+←)"
            @click="prev"
            >上一首</a
          >
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="play"
            class="ply j-flag"
            title="播放"
            v-show="isPaused"
            @click="playOrPause('play')"
            >播放/暂停</a
          >
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="play"
            class="pause j-flag"
            title="暂停"
            v-show="!isPaused"
            @click="playOrPause('pause')"
            >播放/暂停</a
          >
          <a
            href="javascript:;"
            hidefocus="true"
            data-action="next"
            class="nxt"
            title="下一首(ctrl+→)"
            @click="next"
            >下一首</a
          >
        </div>
        <div class="head j-flag">
          <img
            src="http://p1.music.126.net/3GCL5kBHdqfAeODGolzquQ==/1405175862276913.jpg?param=34y34"
          /><a href="/song?id=405599471" hidefocus="true" class="mask"></a>
        </div>
        <div class="play">
          <div class="j-flag words">
            <a
              hidefocus="true"
              href="/song?id=405599471"
              class="f-thide name fc1 f-fl"
              title="Almost Like This"
              >Almost Like This</a
            ><span class="by f-thide f-fl"
              ><span title="Andrew Applepie"
                ><a class="" href="/artist?id=12006277" hidefocus="true"
                  >Andrew&nbsp;Applepie</a
                ></span
              ></span
            ><a
              href="/playlist?id=1979872358&amp;_hash=songlist-405599471"
              class="src"
              title="来自歌单"
            ></a>
          </div>
          <div class="m-pbar" data-action="noop">
            <div class="barbg j-flag" id="auto-id-aQTSW8TgDBTeJx7i">
              <div class="rdy">
                <a-slider
                  id="test"
                  style="margin:0"
                  v-model="ccc"
                  :defaultValue="defaultValue"
                />
              </div>
            </div>
            <span class="j-flag time"
              ><em>{{ currentTime }}</em> / {{ totalTime }}</span
            >
          </div>
        </div>
      </div>
      <!-- <div>
        音量设置
        <input type="range" @change="volume" min="1" max="10" />
      </div>
      <div>
        速率设置
        <input type="range" @change="playbackRate" min="1" max="30" />
      </div> -->
      <div>
        <audio id="myaudio" preload="auto">
          <source
            :src="'http://120.77.239.216:3000/' + currentSong"
            type="audio/mpeg"
          />
          <source
            :src="'http://120.77.239.216:3000/' + currentSong"
            type="audio/ogg"
          />
          <!-- 如果浏览器不支持，则会呈现下面内容 -->
          <p>
            你的浏览器不支持HTML5音频，你可以
            <a :href="currentSong">下载</a>这个音频文件。
          </p>
        </audio>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import AudioPlayer from "@/common/audioPlayer";
import { mapGetters } from "vuex";
import { FETCH_MUSICS } from "@/store/actions.type";
export default {
  data() {
    return {
      defaultValue: 0,
      ccc: 0,
      visible: false,
      placement: "bottom",
      currentTime: "00:00",
      totalTime: "00:00",
      isPaused: false,
      index: 0,
      currentSong: "6d1062903834839c5e810d2fd0d6a1e572.mp3"
    };
  },

  mounted() {
    this.$store.dispatch(FETCH_MUSICS);
    console.log(this.musics);
  },
  computed: {
    ...mapGetters(["musics"])
  },
  watch: {
    index(current) {
      this.currentSong = this.musics[current].url;
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
      this.ccc = parseInt(value * 100);
      console.log(parseInt(value * 100), ";;;");
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
      if (this.index < this.musics.length - 1) this.index++;
    },
    showDrawer() {
      this.visible = true;
      setTimeout(() => {
        this.audioInit();
      }, 100);
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>
<style>
.ant-drawer-body {
  background: #313131;
}
.ant-drawer-content-wrapper {
  height: 90px !important;
}
.m-playbar .btns,
.m-playbar .head,
.m-playbar .play,
.m-playbar .volum,
.m-playbar .oper {
  float: left;
}
.prv {
  display: inline-block;
  background: url("../../static/playbar.png") no-repeat 0 9999px;
  background-position: 0 -130px;
}
.btns .ply {
  width: 36px;
  height: 36px;
  margin-top: 0;
  background: url("../../static/playbar.png") no-repeat 0 9999px;
  background-position: 0 -204px;
}
.btns .pause {
  width: 36px;
  height: 36px;
  margin-top: 0;
  background: url("../../static/playbar.png") no-repeat 0 9999px;
  background-position: 0 -165px;
}
.nxt {
  background: url("../../static/playbar.png") no-repeat 0 9999px;
  background-position: -80px -130px;
}
.head {
  display: inline-block;
  position: relative;
  *zoom: 1;
  margin: 6px 15px 0 0;
}

.head,
.head img {
  width: 34px;
  height: 34px;
}
.m-playbar .words {
  height: 28px;
  overflow: hidden;
  color: #e8e8e8;
  text-shadow: 0 1px 0 #171717;
  line-height: 28px;
}
.m-playbar .words .name {
  max-width: 300px;
}
.m-playbar .words .fc1 {
  color: #e8e8e8;
}

.f-thide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.f-fl {
  float: left;
}
.m-playbar .words .by {
  max-width: 220px;
  margin-left: 15px;
  color: #9b9b9b;
}
.f-thide {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
}
.m-playbar .words .by a {
  color: #9b9b9b;
}
.m-pbar,
.m-pbar .barbg {
  width: 493px;
}
.m-pbar {
  position: relative;
  *zoom: 1;
}
.m-pbar .barbg,
.m-pbar .cur,
.m-pbar .rdy {
  height: 9px;
  background-position: right 0;
}

.m-pbar,
.m-pbar .barbg {
  width: 493px;
}
.m-pbar .barbg,
.m-pbar .cur,
.m-pbar .rdy,
.m-pbar .left {
  background: url("../../static/statbar.png") no-repeat 0 9999px;
}
.m-pbar .time {
  position: absolute;
  top: -3px;
  right: -84px;
  color: #797979;
  text-shadow: 0 1px 0 #121212;
}
.m-pbar .time em {
  color: #a1a1a1;
  font-style: normal;
  text-align: left;
  font-size: inherit;
}
.btns {
  width: 137px;
  padding: 6px 0 0 0;
}
.btns a {
  display: block;
  float: left;
  width: 28px;
  height: 28px;
  margin-right: 8px;
  margin-top: 5px;
  text-indent: -9999px;
}
</style>
