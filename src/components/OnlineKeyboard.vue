<template>
  <div class="keyboard" v-if="visible">
    <div class="keyboard-row" v-for="(row, idx) in keys" :key="idx">
      <button v-for="key in row" :key="key" class="key" @click="handleKeyPress(key)">
        {{ key }}
      </button>
    </div>
    <button class="key special" @click="handleKeyPress('Backspace')">←</button>
    <button class="key special" @click="handleKeyPress('Space')">Space</button>
    <button class="key special" @click="closeKeyboard">Close</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

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

    const handleKeyPress = (key: string) => {
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
}
.key.special {
  background: #e0e0e0;
}
.key:hover {
  background: #ddd;
}
</style>
