<script>
import { ref } from 'vue'
import FormBuilder from '@/utilities/FormBuilder.js'
import WyxosError from '@/components/WyxosError.vue'

export default {
  name: 'FormBuilderDemo',
  components: {
    WyxosError
  },
  setup() {
    // Create a new form with initial values
    const form = new FormBuilder({
      title: '',
      body: '',
      userId: 1
    })

    const formResponse = ref(null)
    const selectedMethod = ref('post')

    // Method descriptions
    const methodDescriptions = {
      post: 'Creates a new resource',
      patch: 'Partially updates an existing resource',
      put: 'Replaces an existing resource',
      get: 'Retrieves a resource',
      delete: 'Removes a resource'
    }

    // Function to get method description
    const getMethodDescription = (method) => {
      return methodDescriptions[method] || ''
    }

    // Function to preload data
    const preloadData = () => {
      // Reset any previous states
      form.loadState.value = ''

      // Load data from JSONPlaceholder API with callbacks in options
      form.load('https://jsonplaceholder.typicode.com/posts/1', {
        onSuccess: (data) => {
          console.log('Preloaded data:', data)
          // If the API doesn't return a form property, manually set the form data
          if (!data.form) {
            form.setAttributes({
              title: data.title || '',
              body: data.body || '',
              userId: data.userId || 1
            })
          }
          return data
        },
        onFail: (error) => {
          console.error('Preload error:', error)
          return error
        }
      })
    }

    // Function to submit the form
    const submitForm = () => {
      // Clear any previous errors and states
      form.clearErrors()
      form.submitState.value = ''

      // Validate form fields
      let hasErrors = false

      if (!form.title) {
        form.errors.setOne('title', 'Title is required')
        hasErrors = true
      }

      if (!form.body) {
        form.errors.setOne('body', 'Body is required')
        hasErrors = true
      }

      if (!form.userId) {
        form.errors.setOne('userId', 'User ID is required')
        hasErrors = true
      }

      if (hasErrors) {
        return
      }

      // Base URL for all requests
      const baseUrl = 'https://jsonplaceholder.typicode.com/posts'

      // URL for specific resource (for methods that need an ID)
      const resourceUrl = `${baseUrl}/1`

      // Options with callbacks for all HTTP methods
      const options = {
        onSuccess: (response) => {
          formResponse.value = response
          return response
        },
        onFail: (error) => {
          console.error('Form submission error:', error)
          return error
        }
      }

      // Submit the form using the selected method with callbacks in options
      switch (selectedMethod.value) {
        case 'post':
          form.post(baseUrl, options)
          break
        case 'patch':
          form.patch(resourceUrl, options)
          break
        case 'put':
          form.put(resourceUrl, options)
          break
        case 'get':
          form.get(baseUrl, options)
          break
        case 'delete':
          form.delete(resourceUrl, options)
          break
        default:
          form.post(baseUrl, options)
      }
    }

    // Function to reset the form
    const resetForm = () => {
      form.reset()
      form.clearErrors()
      formResponse.value = null
      // Reset states
      form.submitState.value = ''
      form.loadState.value = ''
    }

    return {
      form,
      formResponse,
      selectedMethod,
      getMethodDescription,
      preloadData,
      submitForm,
      resetForm
    }
  }
}
</script>

<template>
  <div class="form-demo">
    <h2>FormBuilder Demo</h2>
    <p>This demo shows how to use the FormBuilder utility to create and manage forms.</p>

    <!-- Form States Display -->
    <div class="states-container">
      <h3>Form States</h3>
      <div class="states-grid">
        <div class="state-item">
          <div class="state-label">Submit States:</div>
          <div class="state-badges">
            <span :class="{ active: form.isSubmitting }" class="state-badge">Loading</span>
            <span :class="{ active: form.isSubmitted }" class="state-badge">Loaded</span>
            <span :class="{ active: form.isSubmitFailed }" class="state-badge">Failed</span>
          </div>
        </div>
        <div class="state-item">
          <div class="state-label">Load States:</div>
          <div class="state-badges">
            <span :class="{ active: form.isLoading }" class="state-badge">Loading</span>
            <span :class="{ active: form.isLoaded }" class="state-badge">Loaded</span>
            <span :class="{ active: form.isLoadFailed }" class="state-badge">Failed</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Preload Section -->
    <div class="preload-section">
      <h3>Preload Form Data</h3>
      <p>Load existing data into the form from an API endpoint.</p>
      <div class="preload-actions">
        <button
          :disabled="form.isLoading"
          class="preload-button"
          @click="preloadData"
        >
          {{ form.isLoading ? 'Loading...' : 'Preload Data' }}
        </button>
        <div v-if="form.isLoaded" class="preload-success">Data loaded successfully!</div>
        <div v-if="form.isLoadFailed" class="preload-error">Failed to load data</div>
      </div>
    </div>

    <div class="form-container">
      <form @submit.prevent="submitForm">
        <!-- HTTP Method Selection -->
        <div class="form-group">
          <label for="httpMethod">HTTP Method</label>
          <select id="httpMethod" v-model="selectedMethod" class="method-select">
            <option value="post">POST</option>
            <option value="patch">PATCH</option>
            <option value="put">PUT</option>
            <option value="get">GET</option>
            <option value="delete">DELETE</option>
          </select>
          <div class="method-description">
            <strong>{{ selectedMethod.toUpperCase() }}:</strong>
            {{ getMethodDescription(selectedMethod) }}
          </div>
        </div>

        <div class="form-group">
          <label for="title">Title</label>
          <input
            id="title"
            v-model="form.title"
            :class="{ 'has-error': form.hasError('title') }"
            type="text"
          >
          <WyxosError :form="form" name="title" />
        </div>

        <div class="form-group">
          <label for="body">Body</label>
          <textarea
            id="body"
            v-model="form.body"
            :class="{ 'has-error': form.hasError('body') }"
          ></textarea>
          <WyxosError :form="form" name="body" />
        </div>

        <div class="form-group">
          <label for="userId">User ID</label>
          <input
            id="userId"
            v-model="form.userId"
            :class="{ 'has-error': form.hasError('userId') }"
            type="number"
          >
          <WyxosError :form="form" name="userId" />
        </div>

        <div class="form-actions">
          <button
            :disabled="form.isSubmitting"
            class="submit-button"
            type="submit"
          >
            {{ form.isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
          <button
            class="reset-button"
            type="button"
            @click="resetForm"
          >
            Reset
          </button>
        </div>
      </form>
    </div>

    <div v-if="form.isSubmitted" class="success-message">
      <h3>Form Submitted Successfully!</h3>
      <p>Method used: <strong>{{ selectedMethod.toUpperCase() }}</strong></p>
      <pre>{{ JSON.stringify(formResponse, null, 2) }}</pre>
    </div>

    <div v-if="form.isSubmitFailed" class="error-message-container">
      <h3>Form Submission Failed</h3>
      <div v-if="Object.keys(form.getErrors()).length > 0">
        <h4>Errors:</h4>
        <ul>
          <li v-for="(error, key) in form.getErrors()" :key="key">
            {{ key }}: {{ error }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
.form-demo {
  margin-bottom: 30px;
}

h2, h3 {
  margin-top: 0;
  color: #333;
}

h3 {
  margin-bottom: 10px;
}

/* States Container Styles */
.states-container {
  margin: 20px 0;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.states-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.state-item {
  margin-bottom: 10px;
}

.state-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.state-badges {
  display: flex;
  gap: 10px;
}

.state-badge {
  padding: 5px 10px;
  border-radius: 15px;
  background-color: #e9ecef;
  color: #6c757d;
  font-size: 12px;
  transition: all 0.3s ease;
}

.state-badge.active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

/* Preload Section Styles */
.preload-section {
  margin: 20px 0;
  padding: 15px;
  background-color: #f0f4f8;
  border-radius: 4px;
  border: 1px solid #d0e1f9;
}

.preload-actions {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.preload-button {
  background-color: #6c5ce7;
  color: white;
}

.preload-button:disabled {
  background-color: #a29bfe;
  cursor: not-allowed;
}

.preload-success {
  color: #4CAF50;
  font-weight: bold;
}

.preload-error {
  color: #f44336;
  font-weight: bold;
}

/* Method Selection Styles */
.method-select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 14px;
}

.method-description {
  margin-top: 5px;
  font-size: 13px;
  color: #6c757d;
  font-style: italic;
}

/* Form Container Styles */
.form-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.has-error {
  border-color: #ff5252;
}

.error-message {
  color: #ff5252;
  font-size: 12px;
  margin-top: 5px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  opacity: 0.9;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.reset-button {
  background-color: #f44336;
  color: white;
}

/* Success and Error Message Containers */
.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #e8f5e9;
  border-radius: 4px;
  border-left: 4px solid #4CAF50;
}

.error-message-container {
  margin-top: 20px;
  padding: 15px;
  background-color: #ffebee;
  border-radius: 4px;
  border-left: 4px solid #f44336;
}

.error-message-container ul {
  margin: 10px 0 0 0;
  padding-left: 20px;
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
  max-height: 300px;
}
</style>
