import Search from './utilities/Search.js'
import FormBuilder from './utilities/FormBuilder.js'
import ResourceList from './utilities/ResourceList.js'
import Listing from './utilities/Listing.js'
import LoadState from './utilities/LoadState.js'
import dateRender from './utilities/DateRender.js'
import useFormErrors from './utilities/formErrors.js'
import WyxosButton from './components/WyxosButton.vue'
import WyxosCollection from './components/WyxosCollection.vue'
import WyxosDatepicker from './components/WyxosDatepicker.vue'
import WyxosForm from './components/WyxosForm.vue'
import WyxosImage from './components/WyxosImage.vue'
import WyxosInput from './components/WyxosInput.vue'
import WyxosTags from './components/WyxosTags.vue'
import WyxosPrompt from './components/WyxosPrompt.vue'
import Modal from './utilities/Modal.js'
import Tab from './utilities/Tab.js'

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
    dateRender,
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
    dateRender,
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
