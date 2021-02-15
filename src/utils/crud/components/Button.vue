<template>
  <v-btn
    :class="noMargin ? '' : 'mr-1'"
    :icon="!dark"
    :fab="dark"
    :dark="dark"
    :x-small="xSmall"
    :small="small"
    :large="large"
    :x-large="xLarge"
    :color="color"
    :loading="loading"
    @click="emitClick()"
  >
    <v-icon
      :dark="dark"
      v-if="icon"
    >{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    xSmall: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    xLarge: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    noMargin: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emitClick () {
      this.$emit('clicked')
    },
  },
}
</script>
