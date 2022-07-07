export default {
  init(that) {
    that.interactions = [{
      request: '求亲',
      response: '被求亲',
      active: false
    },{
      request: '主动搭话',
      response: '被搭话',
      active: true
    },{
      request: '参加升仙大会',
      response: '主持升仙大会',
      active: false
    }]
  },
  mixin: {
    interactedBy(B, request, args) {
      const interaction = this.interactions.find(e => e.request == request)
      if (interaction.active) {
        this[interaction.response](B, args)
      }
    },

    interactWith(B, request, args) {
      this[request] && this[request](B, args)
      this[request] || console.log(`在${this.name}这里找不到${request}的行为`)
      B.interactedBy(this, request, args)
    },

    setInteractionEvent(request, active) {
      this.interactions.forEach(e => e.request==request && (e.active = active))
    },
  }
}