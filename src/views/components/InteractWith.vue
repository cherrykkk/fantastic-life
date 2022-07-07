<template>
  <div class="interact-board">
    <div class="character-name">{{character.name}}</div>
    <character-avater :character="character" size="200" class="avater"></character-avater>
    <template v-for="interaction in character.interactions" :key="interaction">
      <div v-if="interaction.active" class="button" @click="interact(interaction)">
        {{interaction.request}}
      </div>
    </template>
  </div>
</template>

<script>
import CharacterAvater from './CharacterAvater.vue'
import { inject } from 'vue'
export default {
  props: ['character'],
  components: {
    CharacterAvater
  },
  setup(props) {
    const you = inject('Manager').value.you
    const setMaskLayer = inject('setMaskLayer')
    const interact = (interaction) => {
      you.interactWith(props.character,interaction.request)
      setMaskLayer()
    }
    return {
      interact
    }
  }
}
</script>
<style lang="less" scoped>
.interact-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  .character-name {
    font-size: 30px;
    font-weight: 900;
    margin: 10px 0;
  }
  .avater {
    width: 200px;
    height: 200px;
  }
  .button {
    background-color: @themeColor;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
  }
}
</style>