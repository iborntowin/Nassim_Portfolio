"use client";

import React, { useState } from "react"

const pricing = {
  monthly: [
    { title: "Starter", price: "$19/mo", features: ["1 Project", "Basic Support", "All Core Features"] },
    { title: "Pro", price: "$49/mo", features: ["10 Projects", "Priority Support", "Advanced Features"] },
    { title: "Enterprise", price: "$99/mo", features: ["Unlimited Projects", "Dedicated Support", "Custom Solutions"] },
  ],
  yearly: [
    { title: "Starter", price: "$190/yr", features: ["1 Project", "Basic Support", "All Core Features"] },
    { title: "Pro", price: "$490/yr", features: ["10 Projects", "Priority Support", "Advanced Features"] },
    { title: "Enterprise", price: "$990/yr", features: ["Unlimited Projects", "Dedicated Support", "Custom Solutions"] },
  ],
}

export default function ThreeTiersWithToggle() {
  const [plan, setPlan] = useState<'monthly' | 'yearly'>('monthly')
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Pricing & Services</h2>
        <div className="flex justify-center mb-8">
          <div className="inline-flex border rounded-md overflow-hidden">
            <button onClick={() => setPlan('monthly')} className={`px-6 py-2 font-medium ${plan==='monthly' ? 'bg-primary text-primary-foreground' : 'bg-background text-primary'}`}>Monthly</button>
            <button onClick={() => setPlan('yearly')} className={`px-6 py-2 font-medium ${plan==='yearly' ? 'bg-primary text-primary-foreground' : 'bg-background text-primary'}`}>Yearly</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricing[plan].map((tier, idx) => (
            <div key={idx} className="bg-card rounded-xl shadow-md p-8 flex flex-col gap-6 border hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold mb-2">{tier.title}</h3>
              <div className="text-4xl font-bold mb-4">{tier.price}</div>
              <ul className="mb-6 space-y-2">
                {tier.features.map((f, i) => <li key={i} className="text-muted-foreground">{f}</li>)}
              </ul>
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold shadow hover:bg-primary/90 transition">Choose Plan</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 