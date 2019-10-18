class AudioPlayer {
  constructor(audio) {
    this.audio = audio;
  }
  // 音频播放
  play() {
    return this.audio.play();
  }
  // 音频暂停
  pause() {
    return this.audio.pause();
  }
  // 检测浏览器是否支持某种类型的音频文件 支持一个mime type值作为参数
  canPlayType() {
    return this.audio.canPlayType();
  }
  // 触发音频文件的加载。如果浏览器不支持preload属性，则此方法也不会有效果。
  load() {
    return this.audio.load();
  }
  // 调整音量
  changeVolume(volumeVal) {
    this.audio.volume = volumeVal;
  }
  // 调整进度
  changeCurrentTime(currentTimeVal) {
    this.audio.currentTime = currentTimeVal;
  }
  // 调整速率
  changePlaybackRate(playbackRateVal) {
    this.audio.playbackRate = playbackRateVal;
  }
  // 音频是否处于暂停状态
  isPaused() {
    return this.audio.paused;
  }
  // 加载过程已经开始，浏览器正在连接到媒体
  loadstart() {
    this.audio.addEventListener("loadstart", function(e) {
      console.log("loadstart", e);
    });
  }
  // 获取音频文件的播放时长
  durationchange() {
    this.audio.addEventListener("durationchange", function(e) {
      console.log("durationchange", e);
    });
  }
  // 获取音频文件的播放时长
  loadedmetadata() {
    this.audio.addEventListener("loadedmetadata", function(e) {
      console.log("loadedmetadata", e);
    });
  }
}

export default AudioPlayer;
