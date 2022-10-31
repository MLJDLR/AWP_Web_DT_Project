<template>
  <BaseButton :disabled="isPending" :color="color" @click.stop.prevent="handleClick">
    <font-awesome-icon v-if="isPending" :icon="['fas', 'circle-notch']" pulse />
    <slot />
  </BaseButton>
</template>

<script>
import BaseButton from "@/components/utils/BaseButton";

export default {
  name: 'AsyncButton',
	components: {BaseButton},
  props: { color: String, onClick: Function },
  data () {
    return {
      isPending: false
    }
  },
  methods: {
    handleClick() {
      this.isPending = true
      this.onClick().finally(() => { this.isPending = false })
    }
  }
}
</script>
