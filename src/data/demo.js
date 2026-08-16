// Demo dataset used when Supabase env vars are absent.
// Mirrors the Supabase schema exactly, so swapping to live data is seamless.

export const demoCars = [
  {
    id: 'c1', slug: 'toyota-land-cruiser-prado-2021', make: 'Toyota', model: 'Land Cruiser Prado TX-L', year: 2021,
    price: 8950000, mileage: 42000, fuel_type: 'Diesel', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.8L Turbo Diesel', drive: '4WD', color: 'Pearl White', location: 'Nairobi', condition: 'Foreign Used',
    description: 'Immaculate 2021 Prado TX-L, freshly imported from Japan with full auction sheet (Grade 4.5). Sunroof, leather interior, 7 seats, and a full dealer inspection with 6-month engine & gearbox warranty.',
    features: ['Sunroof', 'Leather seats', '7 seats', 'Reverse camera', 'Cruise control', 'Hill descent control', 'Dual-zone climate', 'Alloy wheels'],
    images: ['/images/prado.jpg', '/images/interior.jpg', '/images/hero.jpg'],
    status: 'available', featured: true, views: 1240, created_at: '2026-07-30T08:00:00Z',
  },
  {
    id: 'c2', slug: 'toyota-harrier-2020', make: 'Toyota', model: 'Harrier Premium', year: 2020,
    price: 4650000, mileage: 38500, fuel_type: 'Hybrid', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.5L Hybrid', drive: '2WD', color: 'Black', location: 'Nairobi', condition: 'Foreign Used',
    description: 'Sleek 2020 Harrier Premium hybrid. Exceptional fuel economy (up to 19 km/l), panoramic roof, power tailgate, and Toyota Safety Sense suite. KRA duty fully paid.',
    features: ['Panoramic roof', 'Power tailgate', 'Toyota Safety Sense', 'Half-leather seats', 'Push start', 'LED headlamps'],
    images: ['/images/harrier.jpg', '/images/interior.jpg'],
    status: 'available', featured: true, views: 986, created_at: '2026-08-02T08:00:00Z',
  },
  {
    id: 'c3', slug: 'mazda-cx5-2019', make: 'Mazda', model: 'CX-5 Diesel', year: 2019,
    price: 3350000, mileage: 55200, fuel_type: 'Diesel', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.2L SkyActiv-D', drive: 'AWD', color: 'Soul Red', location: 'Mombasa', condition: 'Foreign Used',
    description: 'Head-turning Soul Red CX-5 with the punchy yet frugal SkyActiv diesel. AWD confidence, BOSE sound, radar cruise, and a spotless service history.',
    features: ['BOSE audio', 'Radar cruise control', 'AWD', 'Heads-up display', 'Blind spot monitor', 'Keyless entry'],
    images: ['/images/cx5.jpg', '/images/interior.jpg'],
    status: 'available', featured: true, views: 731, created_at: '2026-08-05T08:00:00Z',
  },
  {
    id: 'c4', slug: 'subaru-forester-2018', make: 'Subaru', model: 'Forester XT', year: 2018,
    price: 2780000, mileage: 68400, fuel_type: 'Petrol', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.0L Turbo Boxer', drive: 'AWD', color: 'Ice Silver', location: 'Nairobi', condition: 'Foreign Used',
    description: 'The enthusiast favourite — Forester XT turbo with symmetrical AWD. EyeSight driver assist, X-Mode, and new tyres all round. Perfect for both city and upcountry runs.',
    features: ['EyeSight assist', 'X-Mode', 'Turbo', 'Power seats', 'Paddle shifters', 'Roof rails'],
    images: ['/images/forester.jpg', '/images/interior.jpg'],
    status: 'available', featured: false, views: 654, created_at: '2026-07-22T08:00:00Z',
  },
  {
    id: 'c5', slug: 'mercedes-c200-2020', make: 'Mercedes-Benz', model: 'C200 AMG Line', year: 2020,
    price: 5980000, mileage: 31000, fuel_type: 'Petrol', transmission: 'Automatic', body_type: 'Sedan',
    engine: '1.5L Turbo + EQ Boost', drive: 'RWD', color: 'Polar White', location: 'Nairobi', condition: 'Foreign Used',
    description: 'Executive C200 AMG Line with EQ Boost mild-hybrid tech. Burmester sound, ambient lighting, digital cockpit — pure S-Class feel in a compact saloon.',
    features: ['AMG Line package', 'Burmester audio', 'Ambient lighting', 'Digital cockpit', 'Memory seats', 'Parktronic'],
    images: ['/images/c200.jpg', '/images/interior.jpg'],
    status: 'available', featured: true, views: 1512, created_at: '2026-08-08T08:00:00Z',
  },
  {
    id: 'c6', slug: 'bmw-x3-2019', make: 'BMW', model: 'X3 xDrive20d', year: 2019,
    price: 5250000, mileage: 47800, fuel_type: 'Diesel', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.0L Twin-Turbo Diesel', drive: 'AWD', color: 'Phytonic Blue', location: 'Nairobi', condition: 'Foreign Used',
    description: 'Dynamic X3 xDrive20d in stunning Phytonic Blue. Live Cockpit, gesture control, harman/kardon audio and full BMW service history.',
    features: ['xDrive AWD', 'harman/kardon', 'Live Cockpit', 'Gesture control', 'Sport seats', 'Electric tailgate'],
    images: ['/images/x3.jpg', '/images/interior.jpg'],
    status: 'reserved', featured: false, views: 890, created_at: '2026-07-15T08:00:00Z',
  },
  {
    id: 'c7', slug: 'toyota-hilux-2021', make: 'Toyota', model: 'Hilux Double Cab', year: 2021,
    price: 5450000, mileage: 52300, fuel_type: 'Diesel', transmission: 'Manual', body_type: 'Pickup',
    engine: '2.4L GD-6 Diesel', drive: '4WD', color: 'White', location: 'Nakuru', condition: 'Locally Used',
    description: 'Work-ready Hilux Double Cab 4WD. One corporate owner, full service record, new all-terrain tyres, tow bar and bed liner fitted.',
    features: ['4WD', 'Tow bar', 'Bed liner', 'Diff lock', 'Bluetooth', 'All-terrain tyres'],
    images: ['/images/hilux.jpg', '/images/interior.jpg'],
    status: 'available', featured: false, views: 1105, created_at: '2026-07-28T08:00:00Z',
  },
  {
    id: 'c8', slug: 'nissan-xtrail-2019', make: 'Nissan', model: 'X-Trail Hybrid', year: 2019,
    price: 2950000, mileage: 61000, fuel_type: 'Hybrid', transmission: 'Automatic', body_type: 'SUV',
    engine: '2.0L Hybrid', drive: '2WD', color: 'Gunmetal Grey', location: 'Nairobi', condition: 'Foreign Used',
    description: 'Family-friendly X-Trail hybrid with excellent economy, 360° around-view monitor, propilot assist and generous boot space.',
    features: ['360° camera', 'ProPILOT assist', 'Hybrid', 'Roof rails', 'Auto tailgate', 'ISOFIX'],
    images: ['/images/xtrail.jpg', '/images/interior.jpg'],
    status: 'available', featured: false, views: 512, created_at: '2026-08-10T08:00:00Z',
  },
]

export const demoReviews = [
  { id: 'r1', name: 'Wanjiku M.', rating: 5, car_bought: 'Toyota Harrier 2020', approved: true, created_at: '2026-07-10T08:00:00Z', body: 'From the first WhatsApp message to driving off the lot took just four days. Transparent pricing, genuine mileage, and they handled the NTSA transfer for me. Best car-buying experience I have had in Nairobi.' },
  { id: 'r2', name: 'Brian Otieno', rating: 5, car_bought: 'Mazda CX-5 2019', approved: true, created_at: '2026-06-22T08:00:00Z', body: 'I financed 70% through their bank partners and the paperwork was done in a week. The car came with a full inspection report — six months later, zero issues.' },
  { id: 'r3', name: 'Amina Hassan', rating: 4, car_bought: 'Subaru Forester 2018', approved: true, created_at: '2026-05-30T08:00:00Z', body: 'Professional team, no pressure tactics. They even delivered the car to Mombasa at a fair rate. Would definitely buy from Dionz again.' },
  { id: 'r4', name: 'Kevin Njoroge', rating: 5, car_bought: 'Mercedes C200 2020', approved: true, created_at: '2026-07-28T08:00:00Z', body: 'Traded in my old Premio and drove out in a C200 the same week. Fair trade-in valuation and every promise on the phone was honoured in person.' },
]

export const demoPosts = [
  {
    id: 'p1', slug: 'import-vs-local-2026', title: 'Importing vs Buying Locally Used in Kenya: The 2026 Cost Breakdown',
    excerpt: 'CRSP schedules, duty, IDF fees, shipping and the hidden costs — we run the real numbers on a 2019 Harrier so you can decide with confidence.',
    cover_url: '/images/harrier.jpg', tags: ['Buying Guide', 'Import'], published: true, author: 'Dionz Motors', created_at: '2026-08-01T08:00:00Z',
    body: 'When Kenyans shop for a car, the first fork in the road is always the same: import a unit from Japan or buy one already on Kenyan roads?\n\nImporting typically saves 8–15% on newer, cleaner units — but only when you factor everything: CIF value, import duty (25%), excise duty, VAT (16%), IDF and RDL fees, port charges, and inland transport. On a 2019 Toyota Harrier, the landed cost gap versus a locally listed equivalent often narrows to under KES 150,000 once you include the 8–10 week wait and forex risk.\n\nBuying locally used means instant delivery, physical inspection before payment, and easier recourse. The catch is verifying mileage and accident history — which is exactly why every Dionz Motors unit comes with its Japanese auction sheet or a full local inspection report.\n\nOur rule of thumb: if you need the car within a month or the unit is under KES 3M, buy local from a dealer who shows you the paper trail. If you are patient and chasing a specific spec above KES 5M, importing through a trusted agent can be worth it.',
  },
  {
    id: 'p2', slug: 'hybrid-ownership-nairobi', title: 'Is a Hybrid Right for Nairobi Traffic? Real Owner Numbers',
    excerpt: 'We surveyed 40 hybrid owners on Thika Road commutes. Fuel savings, battery life fears, and what servicing actually costs in 2026.',
    cover_url: '/images/xtrail.jpg', tags: ['Hybrid', 'Ownership'], published: true, author: 'Dionz Motors', created_at: '2026-07-18T08:00:00Z',
    body: 'Nairobi stop-and-go traffic is the exact environment hybrids were built for. In our survey of 40 owners commuting on Thika Road and Mombasa Road, hybrids averaged 17–21 km/l against 9–12 km/l for equivalent petrol units — a monthly saving of KES 8,000–14,000 for a typical 1,500 km commute.\n\nThe big fear is battery replacement. Reality check: most 2018+ Toyota hybrid batteries are lasting 8–12 years, and refurbished packs in Nairobi now cost KES 80,000–150,000 fitted, down sharply from five years ago. Hybrid-certified garages have also multiplied across the city.\n\nVerdict: for city-heavy driving, the fuel savings usually recover any price premium in under three years.',
  },
  {
    id: 'p3', slug: 'car-financing-guide-kenya', title: 'Car Financing in Kenya: Bank Loans vs Dealer Financing vs Saccos',
    excerpt: 'Interest rates, deposit requirements, logbook conditions — a plain-English guide to the three main ways Kenyans finance cars in 2026.',
    cover_url: '/images/c200.jpg', tags: ['Financing', 'Guide'], published: true, author: 'Dionz Motors', created_at: '2026-06-25T08:00:00Z',
    body: 'Roughly six in ten cars we sell are financed. Here is how the options stack up in 2026.\n\nBank asset finance: 13–17% p.a., up to 80% financing on units under 8 years old, 12–60 month terms. The logbook stays jointly registered until you clear the loan. Fastest approvals we see are 3–5 working days with complete payslips or certified business accounts.\n\nSacco loans: often the cheapest at 12–14% on reducing balance, and some finance up to 100% against your deposits and guarantors. Slower, but unbeatable if you have an established sacco history.\n\nDealer-arranged financing: we work with three bank partners and can pre-qualify you in hours, bundling insurance and tracking into one monthly figure.\n\nWhatever route you take: insist on a reducing-balance quote, confirm early-repayment terms, and budget for comprehensive insurance (roughly 4–5% of car value annually).',
  },
]

export const demoLeads = [
  { id: 'l1', car_id: 'c1', car_label: 'Toyota Prado 2021', name: 'James Kariuki', email: 'jkariuki@example.com', phone: '+254712345678', message: 'Is the Prado still available? Interested in financing with 30% deposit.', type: 'financing', status: 'new', created_at: '2026-08-13T09:14:00Z' },
  { id: 'l2', car_id: 'c5', car_label: 'Mercedes C200 2020', name: 'Sarah Achieng', email: 'sarah.a@example.com', phone: '+254733222111', message: 'Would like to book a test drive this Saturday morning.', type: 'test_drive', status: 'contacted', created_at: '2026-08-12T15:40:00Z' },
  { id: 'l3', car_id: 'c2', car_label: 'Toyota Harrier 2020', name: 'Peter Mwangi', email: '', phone: '+254701998877', message: 'What is your best cash price?', type: 'quote', status: 'qualified', created_at: '2026-08-11T11:02:00Z' },
  { id: 'l4', car_id: null, car_label: '—', name: 'Grace Wambui', email: 'gwambui@example.com', phone: '+254722334455', message: 'Do you accept trade-ins for a 2016 Vitz?', type: 'trade_in', status: 'new', created_at: '2026-08-13T18:25:00Z' },
]
