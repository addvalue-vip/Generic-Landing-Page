import { UserButton } from '@clerk/clerk-react'

function Dashboard({ userDetails }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <nav className="container mx-auto px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold text-gray-700">Your SaaS Dashboard</div>
            <UserButton />
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to your dashboard</h1>
        {userDetails && (
          <div>
            <p>Email: {userDetails.email}</p>
            <p>Subscription Status: {userDetails.subscription_status || 'Not subscribed'}</p>
            {/* Add more user details and functionality here */}
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard