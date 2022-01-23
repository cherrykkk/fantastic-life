import { newGame } from '@/core/game/newGame.js'
import { monthGame } from '@/core/game/aMonthGoBy/monthGame.js'
import { getCharacterById } from '@/core/game/aMonthGoBy/monthCharacter.js'

export const GAME = {
  newGame: newGame,
  monthGame: monthGame,
  getCharacterById: getCharacterById
}
