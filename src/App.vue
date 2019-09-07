<template>
    <div>
      <router-view/>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    mounted() {
    },
    methods: {
      onSubmit() {
        console.log('submit!'); 
      }
    }
  }
</script>
<style>
</style>