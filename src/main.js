import Search from './Search.js'
import FormBuilder from './FormBuilder'
import ResourceList from './ResourceList'
import Listing from './Listing'
import LoadState from './LoadState'
import useFormErrors from './formErrors'
import WyxosButton from './WyxosButton.vue'
import WyxosCollection from './WyxosCollection.vue'
import WyxosDatepicker from './WyxosDatepicker.vue'
import WyxosForm from './WyxosForm.vue'
import WyxosImage from './WyxosImage.vue'
import WyxosInput from './WyxosInput.vue'
import WyxosTags from './WyxosTags.vue'
import WyxosPrompt from './WyxosPrompt.vue'
import Modal from './Modal'
import Tab from './Tab'

const install = (app) => {
  app.component(WyxosButton.name, WyxosButton)
  app.component(WyxosCollection.name, WyxosCollection)
  app.component(WyxosDatepicker.name, WyxosDatepicker)
  app.component(WyxosForm.name, WyxosForm)
  app.component(WyxosImage.name, WyxosImage)
  app.component(WyxosInput.name, WyxosInput)
  app.component(WyxosPrompt.name, WyxosPrompt)
  app.component(WyxosTags.name, WyxosTags)
}

export {
  Search,
  FormBuilder,
  ResourceList,
  Listing,
  LoadState,
  Modal,
  Tab,
  useFormErrors,
  WyxosButton,
  WyxosCollection,
  WyxosDatepicker,
  WyxosForm,
  WyxosImage,
  WyxosInput,
  WyxosTags,
  WyxosPrompt,
  install
}

export default {
  Search,
  FormBuilder,
  ResourceList,
  Listing,
  LoadState,
  Modal,
  Tab,
  useFormErrors,
  WyxosButton,
  WyxosCollection,
  WyxosDatepicker,
  WyxosForm,
  WyxosImage,
  WyxosInput,
  WyxosTags,
  WyxosPrompt,
  install
}
