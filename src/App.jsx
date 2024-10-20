import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import LandingPage from './components/LandingPage'
import Dashboard from './components/Dashboard'
import AffiliatePage from './components/AffiliatePage'
import { supabase } from './supabaseClient'

function App() {
  const { user } = useUser()
  const [userDetails, setUserDetails] = useState(null)

  useEffect(() => {
    if (user) {
      fetchUserDetails()
    }
  }, [user])

  async function fetchUserDetails() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching user details:', error)
    } else if (data) {
      setUserDetails(data)
    } else {
      // User doesn't exist in Supabase, create a new record
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert({ clerk_id: user.id, email: user.primaryEmailAddress.emailAddress })
        .single()

      if (createError) {
        console.error('Error creating user in Supabase:', createError)
      } else {
        setUserDetails(newUser)
      }
    }
  }

  return (
    <Routes>
      <Route path="/" element={
        <>
          <SignedOut>
            <LandingPage />
          </SignedOut>
          <SignedIn>
            <Dashboard userDetails={userDetails} />
          </SignedIn>
        </>
      } />
      <Route path="/affiliate" element={<AffiliatePage />} />
    </Routes>
  )
}

export default App