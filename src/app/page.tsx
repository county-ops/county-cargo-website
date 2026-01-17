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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const services = [
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from UK to Nigeria',
    description: 'Fast and affordable air and sea freight services from our UK warehouse directly to your doorstep in Nigeria.',
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: 'Shipping from US to Nigeria',
    description: 'Seamless shipping from the US to Nigeria. We handle customs and delivery, whether it\'s a small parcel or a full container.',
  },
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to the World',
    description: 'Export goods from Nigeria to over 200 countries worldwide with our reliable international courier partners.',
  },
  {
    icon: <Truck className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to UK',
    description: 'Send packages, documents, and foodstuff from Nigeria to the United Kingdom with our economy/express delivery services.',
  },
  {
    icon: <Package className="h-6 w-6 text-primary" />,
    title: 'Shipping from Nigeria to US',
    description: 'Send packages, documents, and foodstuff from Nigeria to the United States with our economy/express delivery services.',
  },
  {
    icon: <ShoppingBag className="h-6 w-6 text-primary" />,
    title: 'Shop for Me',
    description: 'Can\'t pay on international sites? We purchase items on your behalf from UK/US stores and ship them to you.',
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

const blogPosts = [
  {
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=640&q=80',
    title: 'The Future of Drone Delivery',
    description: 'Exploring the advancements and challenges of autonomous delivery drones.',
    imageHint: 'drone delivery',
  },
  {
    image: 'https://images.unsplash.com/photo-1518135714426-c18f5ffb6f4d?auto=format&fit=crop&w=640&q=80',
    title: 'Sustainable Logistics Practices',
    description: 'How green initiatives are reshaping the supply chain for a better future.',
    imageHint: 'sustainable logistics',
  },
  {
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=640&q=80',
    title: 'AI in Warehouse Management',
    description: 'The impact of artificial intelligence on inventory accuracy and efficiency.',
    imageHint: 'warehouse AI',
  },
];

const faqItems = [
  {
    question: 'What items are prohibited from shipping?',
    answer: 'Prohibited items include hazardous materials, flammable liquids, explosives, illegal substances, and live animals. Please check our detailed guidelines for a complete list.',
  },
  {
    question: 'How do I track my package?',
    answer: 'Once your package is dispatched, you will receive a tracking number via email. You can use this number on our website\'s tracking page to monitor its journey in real-time.',
  },
  {
    question: 'What are your shipping rates?',
    answer: 'Our shipping rates vary based on the destination, package weight, and dimensions. You can get a quote by contacting our support team.',
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section
          className="min-h-screen flex items-center justify-center text-white pt-28"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0), rgba(31, 41, 55, 0.9)), url('https://picsum.photos/seed/hero/1920/1080')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Send and Receive Goods Worldwide — Nigeria, UK, USA & Beyond</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Seamless Global Shipping, Done Right.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary font-semibold border-2 border-white hover:bg-transparent hover:text-white transition-colors">
                <Link href="https://ship.countycargo.com/register">Create a Free Account</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-primary transition-colors">
                <Link href="https://ship.countycargo.com/">Track Shipment</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="services" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Services</h2>
                    <p className="text-lg text-gray-800 max-w-2xl mx-auto">Comprehensive logistics solutions tailored to meet your business needs</p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="service-card bg-white rounded-lg shadow-md p-6 transition-all duration-300">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-secondary mb-3">{service.title}</h3>
                            <p className="text-gray-800">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How It Works</h2>
                    <p className="text-lg text-gray-800 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step">
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-secondary mb-3">{step.title}</h3>
                            <p className="text-gray-800">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="stats" className="py-20 text-white" style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.85), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                         <div key={index}>
                            {stat.icon}
                            <h3 className="text-4xl font-bold">{stat.value}</h3>
                            <p className="text-blue-200">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="about" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6">About County Cargo</h2>
                        <p className="text-lg text-gray-800 mb-6">With over 15 years of experience, we provide reliable and efficient logistics solutions.</p>
                        <Link href="/about" className="text-primary font-semibold hover:underline">Learn More About Us</Link>
                    </div>
                    <div>
                        <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=640&q=80" alt="County Cargo Team" data-ai-hint="team meeting" width={640} height={427} className="rounded-lg shadow-xl w-full"/>
                    </div>
                </div>
            </div>
        </section>

        <section id="blog" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">From Our Blog</h2>
                    <p className="text-lg text-gray-800 max-w-2xl mx-auto">Latest news and insights from the logistics world.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <div key={index} className="blog-card bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300">
                            <Image src={post.image} alt={post.title} data-ai-hint={post.imageHint} width={640} height={384} className="w-full h-48 object-cover"/>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-secondary mb-3">{post.title}</h3>
                                <p className="text-gray-800 mb-4">{post.description}</p>
                                <Link href="#" className="text-primary font-semibold hover:underline">Read More &rarr;</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="faq" className="py-20 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-800">Have questions? We have answers. If you don't find what you're looking for, feel free to contact us.</p>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="bg-white p-6 rounded-lg shadow-md border-b-0">
                            <AccordionTrigger className="w-full text-left flex justify-between items-center text-xl font-semibold text-secondary focus:outline-none hover:no-underline">
                                <span>{item.question}</span>
                            </AccordionTrigger>
                            <AccordionContent className="mt-4 text-gray-800">
                                <p>{item.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
