export interface ContactSubmission {
  id?: number;
  reference_id: string;
  type: "contact" | "pickup";
  name: string;
  email: string;
  phone: string;
  customer_type?: string;
  pickup_day?: string;
  subject?: string;
  message: string;
  promo_code?: string;
  discount_percent?: number;
  status: "New" | "Contacted" | "In Progress" | "Completed";
  notes?: string;
  created_at: string;
}

export const INITIAL_DEMO_SUBMISSIONS: ContactSubmission[] = [
  {
    reference_id: "ML-CT-892140-5812",
    type: "contact",
    name: "Marcus Vance",
    email: "m.vance@southbronxhotel.com",
    phone: "(718) 555-0192",
    customer_type: "Commercial - Hotel",
    subject: "Daily Linen & Towel Service Quote",
    message: "We operate a 45-room boutique hotel in the South Bronx and need daily pickup and delivery for bed linens, duvets, and bath towels. Please send commercial volume pricing and turnaround schedules.",
    status: "New",
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
  },
  {
    reference_id: "ML-PU-610482-9921",
    type: "pickup",
    name: "Elena Rostova",
    email: "elena.r@bronxcare-clinic.org",
    phone: "(917) 555-4819",
    customer_type: "Commercial",
    pickup_day: "Tuesday",
    subject: "Medical Scrubs & Lab Coat Laundry",
    message: "Urgent pickup request for 120 lbs of medical scrubs and patient gowns. We require strict universal precautions and hypoallergenic sanitization.",
    status: "In Progress",
    created_at: new Date(Date.now() - 1000 * 60 * 140).toISOString(), // 2.3 hrs ago
  },
  {
    reference_id: "ML-CT-431980-3310",
    type: "contact",
    name: "David Chen",
    email: "dchen.fitness@ironpeakbronx.com",
    phone: "(347) 555-8831",
    customer_type: "Commercial - Gym & Fitness",
    subject: "Gym Towel Route Service",
    message: "Looking for 3x weekly gym towel wash and fold service with fresh scented folding and hamper bin placement.",
    status: "Contacted",
    notes: "Spoke with David on 11/13. Sent sample contract.",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  }
];
