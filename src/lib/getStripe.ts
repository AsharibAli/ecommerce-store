import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`pk_test_51Mr1NYJ4Lw2nE9ClkjPMCKRW0FVtd59rboGUILv5gr9mvSKxAAxHgSXVNbTqfdSpxqoZXIxSe0VJLdBV1FBYZgnQ00LvViLg0E` || '')
  }

  return stripePromise
}

export default getStripe