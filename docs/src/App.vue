<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-xs-12 col-sm-6">
        <ComponentBased/>
      </div>
      <div class="col-xs-12 col-sm-6">
        <DirectiveBased/>
      </div>
    </div>
  </div>
</template>

<script>
import ComponentBased from './components/ComponentBased.vue'
import DirectiveBased from './components/DirectiveBased.vue'

export default {
  components: {
    DirectiveBased,
    ComponentBased
  }
}
</script>
