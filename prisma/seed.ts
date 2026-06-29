import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing data
  await prisma.payment.deleteMany({});
  await prisma.invoice.deleteMany({});
  await prisma.notification.deleteMany({});
  await prisma.booking.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.service.deleteMany({});
  await prisma.team.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.gallery.deleteMany({});
  await prisma.contact.deleteMany({});
  await prisma.newsletter.deleteMany({});
  await prisma.settings.deleteMany({});
  await prisma.sEO.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Hash passwords
  const adminPasswordHash = await bcrypt.hash('AdminPassword123!', 10);
  const userPasswordHash = await bcrypt.hash('ClientPassword123!', 10);

  // 3. Create Admin
  const admin = await prisma.admin.create({
    data: {
      name: 'Super Admin',
      email: 'admin@company.com',
      password: adminPasswordHash,
      role: 'ADMIN',
    },
  });
  console.log(`Created admin: ${admin.email}`);

  // 4. Create User
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'client@company.com',
      password: userPasswordHash,
      role: 'USER',
    },
  });
  console.log(`Created user: ${user.email}`);

  // 5. Create Settings
  const settings = await prisma.settings.create({
    data: {
      id: 'site-settings',
      companyName: 'Shaanvi Construction',
      logo: '/logo.png',
      email: 'contact@shaanviconstruction.com',
      phone: '+1 (800) 555-0199',
      address: '742 Evergreen Terrace, Springfield, OR 97477',
      facebook: 'https://facebook.com/shaanviconstruction',
      twitter: 'https://twitter.com/shaanviconstruction',
      instagram: 'https://instagram.com/shaanviconstruction',
      linkedin: 'https://linkedin.com/company/shaanviconstruction',
      mapsUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.183792015093!2d-73.98773122425988!3d40.75797877138676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25859c1b9b1b3%3A0xa59f972b9a7c36a4!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
      themeColors: JSON.stringify({
        primary: '#0F172A',
        secondary: '#F59E0B',
        white: '#FFFFFF',
        lightGray: '#F1F5F9',
        darkGray: '#334155',
      }),
    },
  });
  console.log('Created website settings');

  // 6. Create SEO pages config
  const pagesSeo = [
    {
      pageRoute: '/',
      title: 'Luxury Architecture & Premium Construction Services | Shaanvi Construction',
      description: 'Shaanvi Construction provides elite residential and commercial construction, architecture planning, and luxury interior design. View our portfolio of award-winning developments.',
      keywords: 'luxury architecture, custom homes, premium construction, commercial building, interior design, residential builders',
    },
    {
      pageRoute: '/about',
      title: 'About Our Luxury Construction Company | Shaanvi Construction',
      description: 'Discover the heritage of Shaanvi Construction. For over two decades, we have crafted high-end estates, commercial hubs, and breathtaking landscapes globally.',
      keywords: 'about construction company, luxury builders, award winning architects, building contract team',
    },
    {
      pageRoute: '/services',
      title: 'Elite Architecture & Engineering Services | Shaanvi Construction',
      description: 'From structural engineering and landscape design to interior planning and full scale project management. Explore our premium architectural services.',
      keywords: 'architectural planning, structural inspection, renovation, commercial builder, interior stylist',
    },
    {
      pageRoute: '/projects',
      title: 'Premium Project Portfolio | Shaanvi Construction Development',
      description: 'Browse our signature architectural masterpieces, residential complexes, and luxury commercial properties across metropolitan cities.',
      keywords: 'architecture gallery, building projects, skyscraper design, luxury home renovations',
    },
    {
      pageRoute: '/blog',
      title: 'Architecture & Design Insights | Shaanvi Construction Magazine',
      description: 'Read the latest trends in green building, structural engineering innovations, and luxury interior concepts written by leading design directors.',
      keywords: 'construction news, green design, modern buildings, design trends 2026',
    },
    {
      pageRoute: '/contact',
      title: 'Schedule a Consultation | Shaanvi Construction Architecture',
      description: 'Get in touch with our design studio. Book a site visit, structural evaluation, or initial design review for your next luxury development.',
      keywords: 'contact architects, book builder, site visit request, architectural consultation',
    },
  ];

  for (const page of pagesSeo) {
    await prisma.sEO.create({ data: page });
  }
  console.log('Seeded SEO configuration metadata');

  // 7. Create Services
  const services = [
    {
      name: 'Residential Construction',
      description: 'Bespoke custom homes, villas, and multi-family premium estates designed with meticulous attention to detail, integrating sustainable materials and cutting-edge automation.',
      icon: 'Home',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      category: 'Construction',
      priceRange: '$$$$',
      duration: '8-18 Months',
    },
    {
      name: 'Commercial Construction',
      description: 'Premium corporate headquarters, high-rise office towers, hospitality complexes, and luxury retail galleries built for maximum efficiency and modern visual aesthetics.',
      icon: 'Building2',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      category: 'Construction',
      priceRange: '$$$$$',
      duration: '12-24 Months',
    },
    {
      name: 'Interior Design',
      description: 'Curated luxury spaces featuring customized layouts, bespoke furniture selection, elite material procurement, and lighting designs that balance functionality and splendor.',
      icon: 'Palette',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
      category: 'Design',
      priceRange: '$$$',
      duration: '2-6 Months',
    },
    {
      name: 'Exterior & Landscape Design',
      description: 'Stunning outdoor environments including manicured private gardens, luxury pool lounges, outdoor kitchens, and modern facades that harmonize with natural surroundings.',
      icon: 'Trees',
      image: 'https://images.unsplash.com/photo-1558904541-efa8c3a30fc9?auto=format&fit=crop&w=1200&q=80',
      category: 'Design',
      priceRange: '$$$',
      duration: '2-4 Months',
    },
    {
      name: 'Renovation & Restoration',
      description: 'Transforming historic structures or updating legacy estates into modern masterpieces with high-end structural enhancements and luxury updates while retaining historic character.',
      icon: 'Hammer',
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=1200&q=80',
      category: 'Construction',
      priceRange: '$$$',
      duration: '3-9 Months',
    },
    {
      name: 'Architecture Planning',
      description: 'Pre-construction blueprint drafting, structural conceptualization, spatial programming, and zoning alignment designed using advanced 3D BIM modelling software.',
      icon: 'Compass',
      image: 'https://images.unsplash.com/photo-1503387762-592dedb802d7?auto=format&fit=crop&w=1200&q=80',
      category: 'Planning',
      priceRange: '$$$$',
      duration: '1-3 Months',
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }
  console.log('Seeded Construction & Design Services');

  // 8. Create Categories
  const catResidential = await prisma.category.create({
    data: { name: 'Residential', slug: 'residential' },
  });
  const catCommercial = await prisma.category.create({
    data: { name: 'Commercial', slug: 'commercial' },
  });
  const catRenovation = await prisma.category.create({
    data: { name: 'Renovation', slug: 'renovation' },
  });
  const catArchitecture = await prisma.category.create({
    data: { name: 'Architecture', slug: 'architecture' },
  });
  console.log('Seeded blog/project categories');

  // 9. Create Projects
  const projects = [
    {
      title: 'The Obsidian Pavilion',
      description: 'A breathtaking minimalist custom villa built into the volcanic cliffs of Santorini, featuring glass facades, cantilevered infinity pools, and local black stone details.',
      category: 'Residential',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
      ],
      budget: '$2,400,000',
      status: 'COMPLETED',
      progress: 100,
      startDate: new Date('2024-03-01'),
      completionDate: new Date('2025-05-15'),
    },
    {
      title: 'AeroCenter Corporate Hub',
      description: 'An eco-friendly commercial tower located in Chicago, incorporating dual skin energy-recovery facades, vertical wind turbines, and smart automated light filtering systems.',
      category: 'Commercial',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1542362567-b07eac79094f?auto=format&fit=crop&w=1200&q=80'
      ],
      budget: '$18,500,000',
      status: 'CONSTRUCTION',
      progress: 68,
      startDate: new Date('2024-10-10'),
    },
    {
      title: 'Zephyr Heights Estate',
      description: 'A multi-winged luxury mansion in Beverly Hills focused on seamless indoor-outdoor living, private helipad, custom-molded steel structures, and sustainable thermal floor cooling.',
      category: 'Residential',
      images: [
        'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
      ],
      budget: '$5,200,000',
      status: 'DESIGN',
      progress: 35,
      startDate: new Date('2025-02-01'),
    },
    {
      title: 'Lakeside Wellness Retreat',
      description: 'A timber framed restorative wellness center integrated with local lake ecology, combining pre-weathered cedar cladding, structural glulam beams, and high-efficiency heat pumps.',
      category: 'Commercial',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
      ],
      budget: '$4,100,000',
      status: 'COMPLETED',
      progress: 100,
      startDate: new Date('2023-05-10'),
      completionDate: new Date('2024-09-30'),
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log('Seeded portfolio projects');

  // 10. Create Blogs
  const blogs = [
    {
      title: 'Designing with Light: The Power of Cantilevers',
      slug: 'designing-with-light-cantilevers',
      content: '<p>Modern architecture thrives on pushing the limits of physics. Cantilevering sections allows buildings to float, creating visual drama while maximizing scenic panoramas below.</p><p>By extending floor plans outward without supporting pillars, we open up floor space, introduce stunning overhang protection, and capture natural daylight from unique geometric profiles.</p>',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      categoryId: catArchitecture.id,
      tags: ['Design', 'Minimalism', 'Engineering'],
    },
    {
      title: 'BIM Technology: Revolutionizing Pre-Construction Planning',
      slug: 'bim-tech-revolutionizing-pre-construction',
      content: '<p>Building Information Modeling (BIM) goes beyond 3D rendering. It maps material lifetimes, structural stresses, mechanical piping conflicts, and cost estimations dynamically.</p><p>By simulating the entire construction process virtually prior to breaking ground, we eliminate on-site project delays and ensure zero construction design waste.</p>',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
      categoryId: catCommercial.id,
      tags: ['Tech', 'Efficiency', 'BIM'],
    },
    {
      title: 'The Rise of Reclaimed Timber in High-End Residential Estates',
      slug: 'rise-reclaimed-timber-luxury-estates',
      content: '<p>Luxury clients are demanding sustainability, and reclaimed timber provides the ultimate balance of historic character and low environmental impact.</p><p>From structural columns salvaged from old mills to hand-planed oak panels, reclaimed wood offers visual warmth, organic texturing, and rich histories that new materials simply cannot replicate.</p>',
      image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80',
      categoryId: catResidential.id,
      tags: ['Sustainability', 'Luxury', 'Interior'],
    },
  ];

  for (const b of blogs) {
    await prisma.blog.create({ data: b });
  }
  console.log('Seeded blog posts');

  // 11. Create Team Members
  const team = [
    {
      name: 'Marcus Vance',
      role: 'CEO & Principal Architect',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
      bio: 'With over 25 years of global experience, Marcus Vance leads Shaanvi Construction with a vision of blending geometric minimalism with structural absolute strength.',
      linkedin: 'https://linkedin.com/in/marcusvance',
    },
    {
      name: 'Elena Rostova',
      role: 'Director of Design & Interiors',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'Elena creates spaces that capture natural beauty. Her interiors are renowned for curated textures, bespoke woodcraft, and integrated light profiles.',
      instagram: 'https://instagram.com/elenarostova',
    },
    {
      name: 'David Kincaid',
      role: 'Chief Structural Engineer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
      bio: 'David supervises high-rise and complex cantilevered engineering solutions, ensuring architectural elegance matches load-bearing perfection.',
      twitter: 'https://twitter.com/davidkincaid',
    },
  ];

  for (const t of team) {
    await prisma.team.create({ data: t });
  }
  console.log('Seeded team members');

  // 12. Create Testimonials
  const testimonials = [
    {
      name: 'Arthur Pendelton',
      role: 'COO',
      company: 'AeroGroup Inc.',
      comment: 'Shaanvi Construction delivered our corporate headquarters ahead of schedule. The energy фасады are saving us 30% on electricity compared to our old facilities. Stellar communication throughout.',
      rating: 5,
      approved: true,
    },
    {
      name: 'Catherine Vance-Miller',
      role: 'Private Investor',
      company: 'Self-employed',
      comment: 'Building Obsidian Pavilion was a complex feat due to the Santorinian cliffs. Marcus and David worked miracles. The cliff cantilever is a structural masterpiece.',
      rating: 5,
      approved: true,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }
  console.log('Seeded client testimonials');

  // 13. Create FAQs
  const faqs = [
    {
      question: 'What is your typical project timeline?',
      answer: 'Timeline varies. Small luxury renovations range from 3-6 months. Custom residential mansions take 8-18 months. Commercial high-rise developments require 12-24 months, depending on scope and regulatory permits.',
      category: 'General',
      order: 1,
    },
    {
      question: 'Do you assist with zoning approvals and building permits?',
      answer: 'Yes, Shaanvi Construction offers complete pre-construction planning services. We coordinate fully with local municipalities, structural engineers, and environmental agencies to manage zoning and permit processes.',
      category: 'Planning',
      order: 2,
    },
    {
      question: 'Do you integrate smart home automation and sustainable energy system designs?',
      answer: 'Absolutely. We specialize in luxury sustainability, incorporating smart grid setups, solar shingle tiling, heat recovery systems, and automated geothermal climate control directly into our floor plans.',
      category: 'Engineering',
      order: 3,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }
  console.log('Seeded FAQs');

  // 14. Create Contact inquiries
  await prisma.contact.create({
    data: {
      name: 'Sarah Connor',
      email: 'sconnor@cyber.com',
      phone: '+1 (555) 987-6543',
      subject: 'Site Inspection for New Commercial Gym',
      message: 'Hello, I have acquired a 5,000 sq ft warehouse in the design district. I would like to schedule a structural inspection to evaluate converting it to a modern luxury health club.',
    },
  });

  // 15. Create Booking
  await prisma.booking.create({
    data: {
      customerName: 'John Doe',
      phone: '+1 (555) 111-2222',
      email: 'client@company.com',
      location: '100 Hampton Lane, Hamptons NY',
      propertyType: 'Residential Villa',
      budget: '$3,000,000 - $5,000,000',
      preferredDate: new Date('2026-08-15'),
      description: 'Request for initial consultation on building a high-end sustainable beachfront estate.',
      images: [],
      userId: user.id,
      status: 'PENDING',
    },
  });
  console.log('Seeded sample booking and contact form data');

  console.log('Database seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
