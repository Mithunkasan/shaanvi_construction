import * as React from 'react';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Hero from '@/components/landing/Hero';
import Trusted from '@/components/landing/Trusted';
import About from '@/components/landing/About';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import Services from '@/components/landing/Services';
import Projects from '@/components/landing/Projects';
import BeforeAfter from '@/components/BeforeAfter';
import Timeline from '@/components/landing/Timeline';
import Statistics from '@/components/landing/Statistics';
import Testimonials from '@/components/landing/Testimonials';
import Team from '@/components/landing/Team';
import Pricing from '@/components/landing/Pricing';
import Faq from '@/components/landing/Faq';
import BlogRoll from '@/components/landing/BlogRoll';
import ContactForm from '@/components/landing/ContactForm';
import GoogleMap from '@/components/landing/GoogleMap';
import Newsletter from '@/components/landing/Newsletter';
import Footer from '@/components/landing/Footer';
import FloatingActions from '@/components/FloatingActions';

// Fallback Mock Data in case DB is not yet seeded
const fallbackServices = [
  {
    id: 's1',
    name: 'Residential Construction',
    description: 'Bespoke custom homes, villas, and multi-family premium estates designed with meticulous attention to detail.',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    category: 'Construction',
    priceRange: '$$$$',
    duration: '8-18 Months',
  },
  {
    id: 's2',
    name: 'Commercial Construction',
    description: 'Premium corporate headquarters, office towers, and luxury retail galleries built for maximum visual aesthetics.',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80',
    category: 'Construction',
    priceRange: '$$$$$',
    duration: '12-24 Months',
  },
  {
    id: 's3',
    name: 'Interior Design',
    description: 'Curated luxury spaces featuring customized layouts, bespoke furniture, and elite material selection.',
    icon: 'Palette',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    category: 'Design',
    priceRange: '$$$',
    duration: '2-6 Months',
  },
];

const fallbackProjects = [
  {
    id: 'p1',
    title: 'The Obsidian Pavilion',
    description: 'A breathtaking minimalist custom villa built into the volcanic cliffs of Santorini, Greece.',
    category: 'Residential',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80'],
    budget: '$2,400,000',
    status: 'COMPLETED',
    progress: 100,
    startDate: new Date('2024-03-01'),
    completionDate: new Date('2025-05-15'),
  },
  {
    id: 'p2',
    title: 'AeroCenter Corporate Hub',
    description: 'An eco-friendly commercial tower located in Chicago, incorporating dual skin energy facades.',
    category: 'Commercial',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80'],
    budget: '$18,500,000',
    status: 'CONSTRUCTION',
    progress: 68,
    startDate: new Date('2024-10-10'),
    completionDate: null,
  },
];

const fallbackBlogs = [
  {
    id: 'b1',
    title: 'Designing with Light: The Power of Cantilevers',
    slug: 'designing-with-light-cantilevers',
    content: '<p>Modern architecture thrives on pushing the limits of physics. Cantilevering sections allows buildings to float.</p>',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    authorName: 'Admin',
    tags: ['Design', 'Minimalism'],
    createdAt: new Date(),
    category: { name: 'Architecture' },
  },
];

const fallbackTestimonials = [
  {
    id: 't1',
    name: 'Arthur Pendelton',
    role: 'COO',
    company: 'AeroGroup Inc.',
    comment: 'Shaanvi Construction delivered our corporate headquarters ahead of schedule. The energy facades are saving us 30% on electricity.',
    rating: 5,
  },
];

const fallbackTeam = [
  {
    id: 'tm1',
    name: 'Marcus Vance',
    role: 'CEO & Principal Architect',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'With over 25 years of global experience, Marcus leads Shaanvi Construction with a vision of geometric minimalism.',
    facebook: null,
    twitter: null,
    linkedin: 'https://linkedin.com',
    instagram: null,
  },
];

const fallbackFaqs = [
  {
    id: 'f1',
    question: 'What is your typical project timeline?',
    answer: 'Timeline varies. Small luxury renovations range from 3-6 months. Custom residential estates take 8-18 months.',
    category: 'General',
  },
];

export default async function HomePage() {
  let services: any[] = fallbackServices;
  let projects: any[] = fallbackProjects;
  let blogs: any[] = fallbackBlogs;
  let testimonials: any[] = fallbackTestimonials;
  let team: any[] = fallbackTeam;
  let faqs: any[] = fallbackFaqs;

  let settings: any = {
    companyName: 'Shaanvi Construction',
    email: 'contact@shaanviconstruction.com',
    phone: '+91 8438523322',
    address: 'Nagercoil, Tamil Nadu, India',
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    mapsUrl: "https://maps.app.goo.gl/Z9S6hAWNeV9uRHSM6",
  };

  try {
    // Attempt parallel DB fetch
    const [
      dbServices,
      dbProjects,
      dbBlogs,
      dbTestimonials,
      dbTeam,
      dbFaqs,
      dbSettings,
    ] = await Promise.all([
      prisma.service.findMany({ where: { status: 'ACTIVE' } }),
      prisma.project.findMany({ take: 6 }),
      prisma.blog.findMany({
        where: { published: true },
        include: { category: true },
        take: 3,
      }),
      prisma.testimonial.findMany({ where: { approved: true } }),
      prisma.team.findMany({}),
      prisma.fAQ.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.settings.findFirst({ where: { id: 'site-settings' } }),
    ]);

    if (dbServices.length > 0) services = dbServices;
    if (dbProjects.length > 0) projects = dbProjects;
    if (dbBlogs.length > 0) blogs = dbBlogs;
    if (dbTestimonials.length > 0) testimonials = dbTestimonials;
    if (dbTeam.length > 0) team = dbTeam;
    if (dbFaqs.length > 0) faqs = dbFaqs;
    if (dbSettings) settings = dbSettings;
  } catch (e) {
    console.warn('Database fetch failed, falling back to static luxury assets:', e);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Trusted Partners */}
        <Trusted />

        {/* 4. About */}
        <About />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Services */}
        <Services services={services} />

        {/* 7. Featured Projects Masonry */}
        <Projects projects={projects} />

        {/* Extra Feature: Before/After Comparison slider */}
        <BeforeAfter />

        {/* 8. Process Timeline */}
        <Timeline />

        {/* 9. Statistics counters */}
        <Statistics />

        {/* 10. Testimonials */}
        <Testimonials testimonials={testimonials} />

        {/* 11. Team Members */}
        <Team team={team} />

        {/* 12. Pricing plans */}
        <Pricing />

        {/* 13. Accordion FAQs */}
        <Faq faqs={faqs} />

        {/* 14. Latest Blog entries */}
        <BlogRoll blogs={blogs} />

        {/* 15. Contact form inquiries */}
        <ContactForm />

        {/* 16. Google Maps */}
        <GoogleMap mapsUrl={settings.mapsUrl} />

        {/* 17. Newsletter subscriptions */}
        <Newsletter />
      </main>

      {/* 18. Premium Footer */}
      <Footer
        companyName={settings.companyName}
        email={settings.email}
        phone={settings.phone}
        address={settings.address}
        facebook={settings.facebook}
        twitter={settings.twitter}
        instagram={settings.instagram}
        linkedin={settings.linkedin}
      />

      {/* Floating Call & WhatsApp Action buttons */}
      <FloatingActions />
    </div>
  );
}
