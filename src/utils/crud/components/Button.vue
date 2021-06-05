<template>
  <v-btn
    :icon="!dark"
    :fab="dark"
    :dark="dark"
    :x-small="xSmall"
    :small="small"
    :large="large"
    :x-large="xLarge"
    :color="color"
    @click="emitClick()"
  >
    {{ text }}
    <v-icon
      v-if="icon"
      :dark="dark"
    >
      {{ icon }}
    </v-icon>
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
    text: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    active: {
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
