import { DonationsAndPartnerships } from '@/components/donations-partnerships';
import { Leaderboard } from '@/components/leaderboard';
import React from 'react'

const page = () => {
  return (
    <>
      <Leaderboard />
      <DonationsAndPartnerships />
    </>
  );
}

export default page
