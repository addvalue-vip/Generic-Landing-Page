import { useState } from 'react'
import { SignUp, SignIn } from '@clerk/clerk-react'
import PricingPlans from './PricingPlans'

function LandingPage() {
  const [showSignUp, setShowSignUp] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">Your SaaS</div>
            <div>
              <button
                onClick={() => setShowSignUp(!showSignUp)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {showSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Your SaaS</h1>
          <p className="text-xl text-gray-600 mb-8">The best solution for your needs</p>
        </div>

        <PricingPlans />

        <div className="mt-12">
          {showSignUp ? (
            <SignUp />
          ) : (
            <SignIn />
          )}
        </div>
      </main>
    </div>
  )
}

export default LandingPage