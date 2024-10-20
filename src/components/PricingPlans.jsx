import { useState, useEffect } from 'react'
import Paddle from '@paddle/paddle-js'

const PADDLE_SANDBOX_VENDOR_ID = '12345' // Replace with your Paddle Sandbox Vendor ID

function PricingPlans() {
  const [paddle, setPaddle] = useState(null)

  useEffect(() => {
    Paddle.Environment.set('sandbox')
    Paddle.Setup({ vendor: PADDLE_SANDBOX_VENDOR_ID })
    setPaddle(Paddle)
  }, [])

  const handleSubscribe = (planId) => {
    if (paddle) {
      paddle.Checkout.open({
        product: planId,
        email: 'example@example.com', // You should dynamically set this
        successCallback: (data) => {
          console.log('Checkout complete', data)
          // Handle successful subscription
        },
        closeCallback: () => {
          console.log('Checkout closed')
        }
      })
    }
  }

  return (
    <div className="flex justify-center space-x-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Monthly Plan</h2>
        <p className="text-4xl font-bold mb-4">$12<span className="text-sm font-normal">/month</span></p>
        <button
          onClick={() => handleSubscribe('pro_monthly')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Subscribe
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Annual Plan</h2>
        <p className="text-4xl font-bold mb-4">$120<span className="text-sm font-normal">/year</span></p>
        <p className="text-sm text-gray-500 mb-4">Save $24 per year</p>
        <button
          onClick={() => handleSubscribe('pro_annual')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default PricingPlans