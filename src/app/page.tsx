
import Image from 'next/image';
import Link from 'next/link';
import {
  Truck,
  Package,
  Globe,
  ShoppingBag,
  UserPlus,
  Send,
  Gift,
  Users,
  DollarSign,
  Anchor,
  UserCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import blogPosts from '@/lib/blog-posts.json';

const services = [
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from UK to Nigeria',
    description: 'Fast and affordable air and sea freight services from our UK warehouse directly to your doorstep in Nigeria.',
    href: '/shipping-from-uk-to-nigeria',
    image: '/service-uk-to-nigeria-enhanced.png'
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: 'Shipping from US to Nigeria',
    description: 'Seamless shipping from the US to Nigeria. We handle customs and delivery, whether it\'s a small parcel or a full container.',
    href: '/ship-from-us-to-nigeria',
    image: '/service-us-to-nigeria-enhanced.png'
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to the World',
    description: 'Export goods from Nigeria to over 200 countries worldwide with our reliable international courier partners.',
    href: '/ship-from-nigeria-to-world',
    image: '/nigeria-market-packing-enhanced.png'
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to UK',
    description: 'Send packages, documents, and foodstuff from Nigeria to the United Kingdom with our economy/express delivery services.',
    href: '/ship-from-nigeria-to-uk',
    image: '/service-nigeria-uk-enhanced.png'
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to US',
    description: 'Send packages, documents, and foodstuff from Nigeria to the United States with our economy/express delivery services.',
    href: '/ship-from-nigeria-to-us',
    image: '/service-nigeria-to-us-enhanced.png'
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: 'Shop for Me',
    description: 'Can\'t pay on international sites? We purchase items on your behalf from UK/US stores and ship them to you.',
    href: '#services',
    image: '/service-uk-to-nigeria-enhanced.png' // Fallback or use a generic one
  },
];

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Register With Us',
    description: 'Create a free account to get your County Cargo shipping address.',
  },
  {
    icon: <Send className="h-10 w-10 text-white" />,
    title: '2. Send Your Items',
    description: 'Shop UK/US stores and ship to your County Cargo address, or drop off exports in Lagos or Abuja.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Handle the Rest',
    description: 'We process and deliver your packages to your doorstep or nearest collection point.',
  },
];

const stats = [
  {
    icon: <Users className="h-12 w-12 mx-auto mb-4" />,
    value: '10k+',
    label: 'Customers Trust Us',
  },
  {
    icon: <DollarSign className="h-12 w-12 mx-auto mb-4" />,
    value: '68%',
    label: 'Savings on Shipping',
  },
  {
    icon: <Anchor className="h-12 w-12 mx-auto mb-4" />,
    value: '3,000',
    label: 'Tons Shipped Annually',
  },
  {
    icon: <UserCheck className="h-12 w-12 mx-auto mb-4" />,
    value: '500+',
    label: 'SMEs Served Annually',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center pt-40 sm:pt-52 hero-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white hero-text-glow drop-shadow-md leading-tight">
              Send and Receive Goods Worldwide<br className="hidden sm:block" />
              <span className="block sm:inline"> Nigeria, UK, USA &amp; Beyond</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-gray-100 hero-subtitle-glow font-medium drop-shadow-sm">
              Seamless Global Shipping, Done Right.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button asChild size="lg" className="w-full sm:w-auto bg-white text-[#dc2626] font-bold border-2 border-white hover:bg-red-50 hover:text-[#b91c1c] hover:border-red-50 transition-all duration-300 shadow-xl rounded-md px-8 py-4">
                <Link href="https://ship.countycargo.com/login">Create a Free Account</Link>
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto bg-black/20 text-white font-bold border-2 border-white hover:bg-white hover:text-[#0a2a5e] hover:border-white transition-all duration-300 shadow-xl rounded-md px-8 py-4">
                <Link href="https://ship.countycargo.com/">Track Shipment</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">Our Services</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">Comprehensive logistics solutions tailored to meet your business needs</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {services.map((service, index) => (
                <div key={index} className="service-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 h-full group relative" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                      <Link href={service.href}>
                        <span className="absolute inset-0 z-10" aria-hidden="true" />
                        {service.title}
                      </Link>
                    </h3>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="process" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">How It Works</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-center">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    {step.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-secondary mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-800 text-sm sm:text-base">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section id="stats" className="py-14 sm:py-20 text-white stats-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  {stat.icon}
                  <h3 className="text-3xl sm:text-4xl font-bold">{stat.value}</h3>
                  <p className="text-blue-200 text-sm sm:text-base">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-14 sm:py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-4 sm:mb-6">About County Cargo</h2>
                <p className="text-base sm:text-lg text-gray-800 mb-4 sm:mb-6">With over 15 years of experience, we provide reliable and efficient logistics solutions.</p>
                <Link href="/about" className="text-primary font-semibold hover:underline">Learn More About Us</Link>
              </div>
              <div data-aos="fade-left">
                <Image
                  src="/nigeria-market-packing-enhanced.png"
                  alt="County Cargo Professional Logistics Team"
                  data-ai-hint="vibrant nigerian market packing logistics"
                  width={640}
                  height={427}
                  className="rounded-xl shadow-2xl w-full h-56 sm:h-80 md:h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog */}
        <section id="blog" className="py-14 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16" data-aos="fade-up">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-3 sm:mb-4">From Our Blog</h2>
              <p className="text-base sm:text-lg text-gray-800 max-w-2xl mx-auto">Latest news and insights from the logistics world.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
              {blogPosts.map((post, index) => (
                <div key={index} className="blog-card bg-gray-50 rounded-xl shadow-md overflow-hidden transition-all duration-300 group" data-aos="fade-up" data-aos-delay={`${100 * (index + 1)}`}>
                  <div className="overflow-hidden">
                    <Image src={post.image} alt={post.title} data-ai-hint={post.imageHint} width={640} height={384} className="w-full h-44 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-2 sm:mb-3">{post.title}</h3>
                    <p className="text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">{post.description}</p>
                    <Link href={post.url} className="text-primary font-semibold hover:underline text-sm sm:text-base">Read More &rarr;</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
