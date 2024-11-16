<template>
  <div class="keyboard" v-if="visible">
    <div class="keyboard-row" v-for="(row, idx) in keys" :key="idx">
      <button v-for="key in row" :key="key" class="key" @click="handleKeyPress(key)">
        {{ key }}
      </button>
    </div>
    <div class="flex justify-center gap-4">
      <button class="key special" @click="handleKeyPress('Backspace')">←</button>
      <button class="key special" @click="handleKeyPress('Space')">Space</button>
      <button class="key special" @click="closeKeyboard">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import KeyboardAudio from '@/assets/key-1.mp3'

export default defineComponent({
  name: 'OnlineKeyboard',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    targetInput: {
      type: String,
      required: true
    }
  },
  emits: ['update:input', 'close'],
  setup(props, { emit }) {
    const keys = ref([
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ])

    // Create an audio element for the keyboard sound
    const sound = new Audio(KeyboardAudio) // Replace with the path to your sound file

    const handleKeyPress = (key: string) => {
      // Play sound on button press
      sound.play()

      if (key === 'Backspace') {
        emit('update:input', props.targetInput.slice(0, -1))
      } else if (key === 'Space') {
        emit('update:input', props.targetInput + ' ')
      } else {
        emit('update:input', props.targetInput + key)
      }
    }

    const closeKeyboard = () => {
      emit('close')
    }

    return {
      keys,
      handleKeyPress,
      closeKeyboard
    }
  }
})
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-direction: column;
  max-width: 700px;
  gap: 8px;
  background: #f4f4f4;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.keyboard-row {
  display: flex;
  justify-content: center;
  gap: 6px;
}
.key {
  padding: 8px 12px;
  border: none;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 1rem;
  max-width: 100px;
  width: 100%;
}
.key.special {
  background: #e0e0e0;
}
.key:hover {
  background: #ddd;
}
</style>
