import { reactive } from 'vue'

export default class LoadState {
  state = reactive({
    isLoading: false,
    isLoaded: false,
    isFailure: false
  })

  get isLoading(){
    return this.state.isLoading
  }

  get isLoaded(){
    return this.state.isLoaded
  }

  get isFailure(){
    return this.state.isFailure
  }

  isState(state){
    return this.state[state]
  }

  loading () {
    Object.assign(this.state, {
      isLoading: true,
      isLoaded: false,
      isFailure: false
    })
  }

  loaded () {
    Object.assign(this.state, {
      isLoading: false,
      isLoaded: true,
      isFailure: false
    })
  }

  failed () {
    Object.assign(this.state, {
      isLoading: false,
      isLoaded: false,
      isFailure: true
    })
  }
}
