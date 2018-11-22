<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: mapState({
    count: state => state.a.count
  }),
  mounted () {
    // this.$store.dispatch(ADD);
    console.log(this.$store)
  },
  methods: {
    ...mapMutations({
      add: 'ADD' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
</script>

<style lang="scss">
</style>
