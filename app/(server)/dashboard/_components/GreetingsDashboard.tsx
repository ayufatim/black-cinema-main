'use client'

import React from "react";
import UpdateDataOverview from "./UpdateDataOverview";

interface Props {
  firstName: string;
  payment: any;
  transaction: any
}

export default function GreetingsDashboard({ firstName, payment, transaction }: Props) {
  return (
    <div className="border-b">
      <div className="container flex flex-wrap items-center justify-between gap-6 py-8">
        <p className="text-3xl font-bold">Hello, {firstName}!👋🏼</p>

        <div className="flex items-center gap-3">
          <UpdateDataOverview payment={payment} transaction={transaction} />
        </div>
      </div>
    </div>
  );
}
