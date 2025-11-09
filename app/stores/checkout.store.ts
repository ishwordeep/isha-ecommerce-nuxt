import { defineStore } from 'pinia'
import { ref, readonly, reactive, computed } from 'vue'

export interface CheckoutForm {
  name: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  paymentMethod?: string
}

const mapCheckoutToForm = (checkout: CheckoutForm | null): CheckoutForm => {
  if (!checkout) return emptyForm()

  return {
    name: checkout.name ?? '',
    email: checkout.email ?? '',
    phone: checkout.phone ?? '',
    address: checkout.address ?? '',
    city: checkout.city ?? '',
    zipCode: checkout.zipCode ?? '',
    paymentMethod: checkout.paymentMethod ?? '',
  }
}

const emptyForm = (): CheckoutForm => ({
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  paymentMethod: '',
})

export const useCheckoutStore = defineStore('checkout', () => {
  const isLoading = ref(false)
  const checkoutData = ref<CheckoutForm | null>(null)
  const formInputs = reactive<CheckoutForm>(emptyForm())

  const initializeForCheckout = async () => {
    isLoading.value = true
    try {
      const data = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
        address: '123 Main St',
        city: 'Anytown',
        zipCode: '12345',
        paymentMethod: 'credit_card',
      }
      checkoutData.value = data
      if (data) Object.assign(formInputs, mapCheckoutToForm(data))
    } finally {
      isLoading.value = false
    }
  }

  const resetToOriginal = () => {
    Object.assign(formInputs, mapCheckoutToForm(checkoutData.value))
  }

  const reset = async () => {
    await initializeForCheckout()
  }

  return {
    isLoading,
    initializeForCheckout,
    formInputs,
    resetToOriginal,
    reset,
  }
})
