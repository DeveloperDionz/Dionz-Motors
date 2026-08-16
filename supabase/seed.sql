-- Dionz Motors — seed data (run after schema.sql)
-- Note: image URLs point to the app's bundled /images. After uploading real photos
-- to the car-images bucket, replace them with storage public URLs.

insert into public.cars (slug, make, model, year, price, mileage, fuel_type, transmission, body_type, engine, drive, color, location, condition, description, features, images, status, featured) values
('toyota-land-cruiser-prado-2021','Toyota','Land Cruiser Prado TX-L',2021,8950000,42000,'Diesel','Automatic','SUV','2.8L Turbo Diesel','4WD','Pearl White','Nairobi','Foreign Used','Immaculate 2021 Prado TX-L, freshly imported from Japan with full auction sheet (Grade 4.5). Sunroof, leather interior, 7 seats, and a full dealer inspection with 6-month engine & gearbox warranty.','{"Sunroof","Leather seats","7 seats","Reverse camera","Cruise control","Alloy wheels"}','{"/images/prado.jpg","/images/interior.jpg"}','available',true),
('toyota-harrier-2020','Toyota','Harrier Premium',2020,4650000,38500,'Hybrid','Automatic','SUV','2.5L Hybrid','2WD','Black','Nairobi','Foreign Used','Sleek 2020 Harrier Premium hybrid. Exceptional fuel economy, panoramic roof, power tailgate, and Toyota Safety Sense suite. KRA duty fully paid.','{"Panoramic roof","Power tailgate","Toyota Safety Sense","Push start","LED headlamps"}','{"/images/harrier.jpg","/images/interior.jpg"}','available',true),
('mazda-cx5-2019','Mazda','CX-5 Diesel',2019,3350000,55200,'Diesel','Automatic','SUV','2.2L SkyActiv-D','AWD','Soul Red','Mombasa','Foreign Used','Head-turning Soul Red CX-5 with the punchy yet frugal SkyActiv diesel. AWD confidence, BOSE sound, radar cruise, and a spotless service history.','{"BOSE audio","Radar cruise control","AWD","Heads-up display","Keyless entry"}','{"/images/cx5.jpg","/images/interior.jpg"}','available',true),
('subaru-forester-2018','Subaru','Forester XT',2018,2780000,68400,'Petrol','Automatic','SUV','2.0L Turbo Boxer','AWD','Ice Silver','Nairobi','Foreign Used','The enthusiast favourite — Forester XT turbo with symmetrical AWD, EyeSight driver assist and X-Mode.','{"EyeSight assist","X-Mode","Turbo","Paddle shifters","Roof rails"}','{"/images/forester.jpg","/images/interior.jpg"}','available',false),
('mercedes-c200-2020','Mercedes-Benz','C200 AMG Line',2020,5980000,31000,'Petrol','Automatic','Sedan','1.5L Turbo + EQ Boost','RWD','Polar White','Nairobi','Foreign Used','Executive C200 AMG Line with EQ Boost mild-hybrid tech, Burmester sound and digital cockpit.','{"AMG Line package","Burmester audio","Digital cockpit","Memory seats","Parktronic"}','{"/images/c200.jpg","/images/interior.jpg"}','available',true),
('bmw-x3-2019','BMW','X3 xDrive20d',2019,5250000,47800,'Diesel','Automatic','SUV','2.0L Twin-Turbo Diesel','AWD','Phytonic Blue','Nairobi','Foreign Used','Dynamic X3 xDrive20d with Live Cockpit, gesture control and harman/kardon audio. Full BMW service history.','{"xDrive AWD","harman/kardon","Live Cockpit","Sport seats","Electric tailgate"}','{"/images/x3.jpg","/images/interior.jpg"}','reserved',false),
('toyota-hilux-2021','Toyota','Hilux Double Cab',2021,5450000,52300,'Diesel','Manual','Pickup','2.4L GD-6 Diesel','4WD','White','Nakuru','Locally Used','Work-ready Hilux Double Cab 4WD. One corporate owner, full service record, tow bar and bed liner fitted.','{"4WD","Tow bar","Bed liner","Diff lock","All-terrain tyres"}','{"/images/hilux.jpg","/images/interior.jpg"}','available',false),
('nissan-xtrail-2019','Nissan','X-Trail Hybrid',2019,2950000,61000,'Hybrid','Automatic','SUV','2.0L Hybrid','2WD','Gunmetal Grey','Nairobi','Foreign Used','Family-friendly X-Trail hybrid with 360-degree around-view monitor, ProPILOT assist and generous boot space.','{"360 camera","ProPILOT assist","Hybrid","Auto tailgate","ISOFIX"}','{"/images/xtrail.jpg","/images/interior.jpg"}','available',false);

insert into public.reviews (name, rating, body, car_bought, approved) values
('Wanjiku M.',5,'From the first WhatsApp message to driving off the lot took just four days. Transparent pricing, genuine mileage, and they handled the NTSA transfer for me.','Toyota Harrier 2020',true),
('Brian Otieno',5,'I financed 70% through their bank partners and the paperwork was done in a week. Six months later, zero issues.','Mazda CX-5 2019',true),
('Amina Hassan',4,'Professional team, no pressure tactics. They even delivered the car to Mombasa at a fair rate.','Subaru Forester 2018',true),
('Kevin Njoroge',5,'Traded in my old Premio and drove out in a C200 the same week. Every promise on the phone was honoured in person.','Mercedes C200 2020',true);

insert into public.posts (slug, title, excerpt, body, cover_url, tags, published) values
('import-vs-local-2026','Importing vs Buying Locally Used in Kenya: The 2026 Cost Breakdown','CRSP schedules, duty, IDF fees, shipping and the hidden costs — we run the real numbers on a 2019 Harrier.','When Kenyans shop for a car, the first fork in the road is always the same: import a unit from Japan or buy one already on Kenyan roads?

Importing typically saves 8-15% on newer units — but only when you factor everything: CIF value, import duty, excise duty, VAT, IDF and RDL fees, port charges, and inland transport.

Buying locally used means instant delivery and physical inspection before payment. Our rule of thumb: if you need the car within a month or the unit is under KES 3M, buy local from a dealer who shows you the paper trail.','/images/harrier.jpg','{"Buying Guide","Import"}',true),
('hybrid-ownership-nairobi','Is a Hybrid Right for Nairobi Traffic? Real Owner Numbers','We surveyed 40 hybrid owners on Thika Road commutes. Fuel savings, battery life fears, and what servicing actually costs.','Nairobi stop-and-go traffic is the exact environment hybrids were built for. In our survey of 40 owners, hybrids averaged 17-21 km/l against 9-12 km/l for equivalent petrol units.

The big fear is battery replacement. Reality check: most 2018+ Toyota hybrid batteries last 8-12 years, and refurbished packs in Nairobi now cost KES 80,000-150,000 fitted.

Verdict: for city-heavy driving, fuel savings usually recover any price premium in under three years.','/images/xtrail.jpg','{"Hybrid","Ownership"}',true),
('car-financing-guide-kenya','Car Financing in Kenya: Bank Loans vs Dealer Financing vs Saccos','Interest rates, deposit requirements, logbook conditions — a plain-English guide to financing a car in 2026.','Roughly six in ten cars we sell are financed.

Bank asset finance: 13-17% p.a., up to 80% financing on units under 8 years old. Sacco loans: often cheapest at 12-14% reducing balance. Dealer-arranged financing: we pre-qualify you in hours with three bank partners.

Whatever route you take: insist on a reducing-balance quote, confirm early-repayment terms, and budget for comprehensive insurance.','/images/c200.jpg','{"Financing","Guide"}',true);
