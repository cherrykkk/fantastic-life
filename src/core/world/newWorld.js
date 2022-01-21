import { World } from '@/core/world/World.js'
import { newSociety } from '@/core/society/newSociety.js'

export async function newWorld(){
  const world = new World()
  return world
}