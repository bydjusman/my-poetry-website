// Contact Form Handler with Formspree Integration
// Configuration: Replace YOUR_FORMSPREE_ID with your actual Formspree endpoint ID

const FORMSPREE_ID = 'YOUR_FORMSPREE_ID'; // Replace this with your Formspree ID
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// DOM Elements
const contactForm = document.getElementById('contactForm');
const formAlert = document.getElementById('formAlert');
const submitBtn = document.getElementById('submitBtn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

// Form fields
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');

// Validation Rules
const validationRules = {
  name: {
    field: nameInput,
    errorElement: nameError,
    validate: (value) => {
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (value.trim().length > 50) return 'Name must not exceed 50 characters';
      return null;
    }
  },
  email: {
    field: emailInput,
    errorElement: emailError,
    validate: (value) => {
      if (!value.trim()) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return null;
    }
  },
  subject: {
    field: subjectInput,
    errorElement: subjectError,
    validate: (value) => {
      if (!value.trim()) return 'Subject is required';
      if (value.trim().length < 3) return 'Subject must be at least 3 characters';
      if (value.trim().length > 100) return 'Subject must not exceed 100 characters';
      return null;
    }
  },
  message: {
    field: messageInput,
    errorElement: messageError,
    validate: (value) => {
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      if (value.trim().length > 5000) return 'Message must not exceed 5000 characters';
      return null;
    }
  }
};

// Clear validation error for a field
function clearFieldError(fieldName) {
  const rule = validationRules[fieldName];
  if (rule) {
    rule.field.classList.remove('error');
    rule.errorElement.textContent = '';
  }
}

// Show validation error for a field
function showFieldError(fieldName, errorMessage) {
  const rule = validationRules[fieldName];
  if (rule) {
    rule.field.classList.add('error');
    rule.errorElement.textContent = errorMessage;
  }
}

// Validate single field
function validateField(fieldName) {
  const rule = validationRules[fieldName];
  if (!rule) return true;

  const error = rule.validate(rule.field.value);
  if (error) {
    showFieldError(fieldName, error);
    return false;
  } else {
    clearFieldError(fieldName);
    return true;
  }
}

// Validate entire form
function validateForm() {
  let isValid = true;
  for (const fieldName in validationRules) {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  }
  return isValid;
}

// Show alert message
function showAlert(message, type) {
  formAlert.textContent = message;
  formAlert.className = `alert alert-${type}`;
  formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Hide alert message
function hideAlert() {
  formAlert.className = 'alert alert-hidden';
  formAlert.textContent = '';
}

// Show loading state
function setLoadingState(isLoading) {
  submitBtn.disabled = isLoading;
  if (isLoading) {
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
  } else {
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
  }
}

// Reset loading state
function resetLoadingState() {
  setLoadingState(false);
}

// Submit form handler
async function handleFormSubmit(e) {
  e.preventDefault();
  hideAlert();

  // Validate form
  if (!validateForm()) {
    showAlert('Please fix the errors above before submitting.', 'error');
    return;
  }

  // Show loading state
  setLoadingState(true);

  try {
    // Prepare form data
    const formData = new FormData(contactForm);

    // Send to Formspree
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success
      showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();

      // Clear all errors
      for (const fieldName in validationRules) {
        clearFieldError(fieldName);
      }
    } else {
      // Formspree error
      const data = await response.json();
      showAlert(data.error || 'Failed to send message. Please try again.', 'error');
    }
  } catch (error) {
    // Network error
    console.error('Form submission error:', error);
    showAlert('Network error. Please check your connection and try again.', 'error');
  } finally {
    resetLoadingState();
  }
}

// Real-time validation on input
nameInput.addEventListener('blur', () => validateField('name'));
emailInput.addEventListener('blur', () => validateField('email'));
subjectInput.addEventListener('blur', () => validateField('subject'));
messageInput.addEventListener('blur', () => validateField('message'));

// Clear error on focus
nameInput.addEventListener('focus', () => clearFieldError('name'));
emailInput.addEventListener('focus', () => clearFieldError('email'));
subjectInput.addEventListener('focus', () => clearFieldError('subject'));
messageInput.addEventListener('focus', () => clearFieldError('message'));

// Form submission
contactForm.addEventListener('submit', handleFormSubmit);
