<template>
    <div>
      <a-locale-provider :locale="zh_CN">
        <router-view/>
      </a-locale-provider>
    </div>
</template>
<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
export default {
  data() {
    return {
      zh_CN,
    }
  }
}
</script>
<style>
</style>