import React from 'react'
import TransactionPage from './_components/TransactionsPage'
import getCurrentUser from '@/app/_actions/get-user'
import { redirect } from 'next/navigation'

async function page() {
  const users = await getCurrentUser()

  if (!users) {
    redirect("/signin")
  }
  
  return (
    <div>
      <TransactionPage />
    </div>
  )
}

export default page