// import { shallowMount } from '@vue/test-utils'
// import  App from '@/App.vue'

// describe('App.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(App, {
//       props: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

const sum = require('@/sum.js').sum;

test('should return 3 sam when input 1，2', () => {
    let result = sum(1,2);
    expect(result).toBe(3);
})