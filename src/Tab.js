import {reactive} from "vue";

export default class Tab {
  attributes = reactive({
    name: null
  })

  callbacks = {}

  constructor (active) {
    this.attributes.name = active
  }

  is (name) {
    return this.attributes.name === name
  }

  onChange (callbacks) {
    this.callbacks = callbacks
  }

  activeClass (name, classes) {
    return {
      class: this.is(name) ? classes : []
    }
  }

  set (name) {
    this.attributes.name = name

    if (this.callbacks[name]) {
      this.callbacks[name]()
    }
  }

  assign(attributes){
    Object.assign(this, attributes)
  }

  static create (name) {
    return new Tab(name)
  }
}
