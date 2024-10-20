import { useState } from 'react'
import { useUser } from '@clerk/clerk-react'
import { supabase } from '../supabaseClient'

function AffiliatePage() {
  const { user } = useUser()
  const [affiliateCode, setAffiliateCode] = useState('')

  const generateAffiliateCode = async () => {
    if (!user) return

    const code = Math.random().toString(36).substring(7)
    const { data, error } = await supabase
      .from('users')
      .update({ affiliate_code: code })
      .eq('clerk_id', user.id)
      .single()

    if (error) {
      console.error('Error generating affiliate code:', error)
    } else {
      setAffiliateCode(code)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Affiliate Program</h1>
      <p className="mb-4">Join our affiliate program and earn rewards!</p>
      {affiliateCode ? (
        <div>
          <p>Your affiliate code: <strong>{affiliateCode}</strong></p>
          <p>Share this code with others to earn rewards!</p>
        </div>
      ) : (
        <button
          onClick={generateAffiliateCode}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Generate Affiliate Code
        </button>
      )}
    </div>
  )
}

export default AffiliatePage