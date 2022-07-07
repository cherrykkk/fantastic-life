export function mixin(that, world, mixin) {
  Object.assign(that, mixin.mixin)
  if (world) {
    mixin.init(that)
  }
}