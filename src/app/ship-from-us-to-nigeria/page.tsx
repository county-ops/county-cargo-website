
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  UserPlus,
  ShoppingCart,
  Gift,
  Check,
  DollarSign,
  Truck,
  Shield,
  Star,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Faq } from './faq';
import { UsNigeriaQuoteForm } from './quote-form';


export const metadata: Metadata = {
  title: 'Shipping from US to Nigeria (Door-to-Door) | County Cargo',
  description: 'Fast, Reliable & Affordable Shipping from the US to Nigeria. Get your free US shipping address to shop American stores. We deliver to your doorstep in Nigeria.',
};

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Get Your Free US Address',
    description: 'Create a free account to instantly receive your personal US shipping address. Use this address to shop from any US online retailer like Amazon, Walmart, and Shein.',
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    title: '2. Shop & Ship to Your US Address',
    description: 'Shop online at any US store. At checkout, simply use your dedicated County Cargo US address for delivery. We\'ll handle it from there.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Deliver to Nigeria',
    description: 'We handle customs and deliver your packages straight to your doorstep in Nigeria. It\'s that simple!',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping to Lagos',
    price: '$4.50',
    per: '/lbs',
    features: [
      'Minimum chargeable weight: 5 lbs',
      'Delivery in 5-10 working days',
      'No handling charges',
      'Full tracking included',
    ],
  },
  {
    title: 'Standard Shipping (Other States)',
    price: '$5.00',
    per: '/lbs',
    features: [
      'Minimum chargeable weight: 5 lbs',
      'Delivery in 5-10 working days',
      'No handling charges',
      'Full tracking included',
    ],
  },
  {
    title: 'Procurement Service',
    price: 'Shop & Ship',
    per: 'for you',
    features: [
      'We buy items from US stores on your behalf',
      'Access to stores that don\'t accept Nigerian cards',
      'Consolidation of multiple orders',
      'Seamless delivery to your doorstep',
    ],
  },
];

const guideFeatures = [
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Affordable Shipping to Nigeria",
        description: "With transparent pricing and no hidden fees, we offer some of the most competitive rates for shipping from the US to Nigeria, ensuring you get great value."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast and Reliable Delivery",
        description: "From Lagos and Abuja to Port Harcourt, our standard and express services guarantee your cargo from the US arrives on time. We're committed to reliable and timely deliveries across Nigeria."
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Secure Parcel Forwarding",
        description: "We handle your items with care from US hubs like New York, Houston, and Atlanta. Enjoy peace of mind with real-time tracking and insurance options for all your shipments."
    }
];

const stores1 = [
    { name: "Walmart", domain: "walmart.com" }, { name: "Target", domain: "target.com" },
    { name: "Amazon US", domain: "amazon.com" }, { name: "eBay US", domain: "ebay.com" },
    { name: "Best Buy", domain: "bestbuy.com" }, { name: "Home Depot", domain: "homedepot.com" },
    { name: "Lowe's", domain: "lowes.com" }, { name: "Macy's", domain: "macys.com" },
    { name: "Kohl's", domain: "kohls.com" }, { name: "Nordstrom", domain: "nordstrom.com" },
    { name: "Costco", domain: "costco.com" }, { name: "Sam's Club", domain: "samsclub.com" },
    { name: "Gap", domain: "gap.com" }, { name: "Old Navy", domain: "oldnavy.com" },
    { name: "Banana Republic", domain: "bananarepublic.com" }, { name: "Sephora", domain: "sephora.com" },
    { name: "Shein", domain: "shein.com" },
    { name: "Fashion Nova", domain: "fashionnova.com" },
    { name: "Revolve", domain: "revolve.com" },
    { name: "Pacsun", domain: "pacsun.com" },
    { name: "Urban Outfitters", domain: "urbanoutfitters.com" },
    { name: "Lululemon", domain: "lululemon.com" },
    { name: "Madewell", domain: "madewell.com" },
];
const stores2 = [
    { name: "Ulta Beauty", domain: "ulta.com" }, { name: "Foot Locker", domain: "footlocker.com" },
    { name: "Champs Sports", domain: "champssports.com" }, { name: "Finish Line", domain: "finishline.com" },
    { name: "Apple US", domain: "apple.com" }, { name: "Nike US", domain: "nike.com" },
    { name: "Adidas US", domain: "adidas.com" }, { name: "GameStop", domain: "gamestop.com" },
    { name: "Bath & Body Works", domain: "bathandbodyworks.com" }, { name: "Victoria's Secret", domain: "victoriassecret.com" },
    { name: "J.Crew", domain: "jcrew.com" }, { name: "American Eagle", domain: "ae.com" },
    { name: "Forever 21", domain: "forever21.com" }, { name: "Zara US", domain: "zara.com" },
    { name: "H&M US", domain: "hm.com" }, { name: "The Body Shop US", domain: "thebodyshop.com" },
    { name: "Free People", domain: "freepeople.com" },
    { name: "Fenty Beauty", domain: "fentybeauty.com" },
    { name: "Glossier", domain: "glossier.com" },
    { name: "Kylie Cosmetics", domain: "kyliecosmetics.com" },
    { name: "Tarte Cosmetics", domain: "tartecosmetics.com" },
    { name: "ColourPop", domain: "colourpop.com" },
];


const allStores1 = [...stores1, ...stores1];
const allStores2 = [...stores2, ...stores2];

const reviews = [
    {
        initial: 'A',
        name: 'Adewale Johnson',
        review: '"Excellent service! I\'ve been using County Cargo for over a year now to ship electronics from US to Lagos. My items always arrive safely. Highly recommended!"',
        time: '2 weeks ago'
    },
    {
        initial: 'C',
        name: 'Chioma Okafor',
        review: '"Best shipping company for US to Nigeria! Their customer service is top-notch. I love shopping from Amazon and Walmart, and County Cargo makes it so easy. The tracking system is very transparent too."',
        time: '1 month ago'
    },
    {
        initial: 'O',
        name: 'Oluwaseun Balogun',
        review: '"Very affordable rates compared to other companies. I shipped my laptop and phone from Best Buy to Abuja using standard shipping and everything arrived in perfect condition. Will definitely use again!"',
        time: '3 weeks ago'
    },
     {
        initial: 'E',
        name: 'Emmanuel Nwosu',
        review: '"Professional and reliable service. I run an online business and County Cargo helps me import products from US suppliers efficiently. Their consolidation service saves me a lot of money!"',
        time: '1 week ago'
    },
    {
        initial: 'F',
        name: 'Funke Adeyemi',
        review: '"I love County Cargo! Easy to use website, great prices, and my packages always arrive on time. I shop from Target, Macy\'s, and Nordstrom regularly and they handle everything perfectly."',
        time: '2 months ago'
    },
    {
        initial: 'T',
        name: 'Tunde Ajayi',
        review: '"The standard shipping is fast enough for my needs. I needed urgent documents and gadgets shipped to Port Harcourt and they delivered exactly on time. Worth every penny. 5 stars!"',
        time: '5 days ago'
    },
];

const transitRoutes = [
  { origin: 'Atlanta', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Austin', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Boston', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Charlotte', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Chicago', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Dallas', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Denver', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Houston', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Los Angeles', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Miami', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'New York', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Philadelphia', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Phoenix', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'San Antonio', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'San Diego', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'San Francisco', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Seattle', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Washington D.C.', destination: 'Lagos', time: '5-10 working days' },
  { origin: 'Atlanta', destination: 'Abuja', time: '5-10 working days' },
  { origin: 'Houston', destination: 'Abuja', time: '5-10 working days' },
  { origin: 'New York', destination: 'Abuja', time: '5-10 working days' },
  { origin: 'Atlanta', destination: 'Port Harcourt', time: '5-10 working days' },
  { origin: 'Houston', destination: 'Port Harcourt', time: '5-10 working days' },
];

export default function ShipFromUsToNigeriaPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section
          className="min-h-[50vh] flex items-center justify-center text-white"
          style={{
            background: `linear-gradient(rgba(30, 64, 175, 0.85), rgba(31, 41, 55, 0.9)), url('https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl font-bold flex flex-col items-center">
              <span>Shipping from US to Nigeria</span>
              <span className="mt-2">(Door-to-Door)</span>
            </h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">Fast, Reliable & Affordable Shipping from the US to Nigeria. Get your free US shipping address and shop any American store online. We'll deliver your packages to your doorstep anywhere in Nigeria. It's that simple.</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-destructive font-semibold hover:bg-gray-100 transition-colors">
                <Link href="https://ship.countycargo.com/register">Get Your Free US Address</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How to Ship from the US to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our seamless 3-step process makes US to Nigeria cargo and parcel forwarding effortless. Get your packages from US stores to your doorstep in Nigeria, hassle-free.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-semibold text-secondary mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        <section id="pricing" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Pricing to Ship from US to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping from US to Nigeria needs.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8 flex flex-col" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                {tier.price.startsWith('$') ? <>{tier.price}</> : tier.price}
                                <span className="text-lg font-normal text-gray-500"> {tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                             <Button asChild className="w-full mt-auto">
                                <Link href={tier.title.includes('Standard') ? '#quote' : '/contact'}>
                                    {tier.title.includes('Standard') ? 'Get an Estimate' : 'Contact Us'}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="quote" className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <UsNigeriaQuoteForm />
            </div>
        </section>

        <section id="routes" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-aos="fade-up">
                <div>
                    <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Popular Routes & Estimated Transit Times</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find estimated transit times for our most popular shipping routes from the US to Nigeria.</p>
                    </div>
                    <div className="overflow-x-auto rounded-lg shadow-md border">
                        <table className="min-w-full bg-white">
                            <thead className="bg-primary text-primary-foreground">
                            <tr>
                                <th className="py-4 px-6 text-left font-semibold">Origin (US City)</th>
                                <th className="py-4 px-6 text-left font-semibold">Destination (Nigeria City)</th>
                                <th className="py-4 px-6 text-left font-semibold">Estimated Transit Time</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-700">
                            {transitRoutes.map((route, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                                <td className="py-4 px-6">{route.origin}</td>
                                <td className="py-4 px-6">{route.destination}</td>
                                <td className="py-4 px-6">{route.time}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <section id="seo-content" className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Ultimate Guide to Shipping from US to Nigeria</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto">Shipping from the US to Nigeria is seamless with County Cargo. As your trusted freight forwarding partner, we provide a reliable and affordable way to shop from top US retailers like Amazon, Walmart, and Shein. Our service is designed to be fast and dependable, ensuring your packages arrive in Nigeria without any hassle.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex justify-center items-center mb-4">
                                <div className="bg-white p-3 rounded-full">
                                    {feature.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-12" data-aos="fade-up">
                     <p className="text-lg">Our 3-step process is designed for your convenience. Your journey begins with a free US shipping address, giving you access to thousands of US retailers. Once your items arrive at our US warehouse, we handle everything from package consolidation and customs paperwork to final delivery. We manage the entire process professionally, making your US to Nigeria shipping experience effortless.</p>
                </div>
            </div>
        </section>

        <section id="us-stores" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Shop Thousands of US Stores and Ship to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Here are just a few of the thousands of US online stores you can shop from for your shipping from US to Nigeria.</p>
                </div>
            </div>
            <div className="logos" data-aos="fade-up" data-aos-delay="200">
                <div className="scroller">
                    <div className="scroller__inner">
                        {allStores1.map((store, index) => (
                           <a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" key={`us-store1-${index}-${store.name}`}>{store.name}</a>
                        ))}
                    </div>
                </div>
                <div className="scroller mt-4">
                    <div className="scroller__inner" style={{animationDirection: "reverse"}}>
                         {allStores2.map((store, index) => (
                            <a href={`https://${store.domain}`} target="_blank" rel="noopener noreferrer" key={`us-store2-${index}-${store.name}`}>{store.name}</a>
                         ))}
                    </div>
                </div>
            </div>
            <div className="text-center mt-12" data-aos="fade-up">
                <Button asChild>
                    <Link href="/us-stores">See All US Stores</Link>
                </Button>
            </div>
        </section>

        <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by thousands for shipping from US to Nigeria</p>
                    <div className="mt-4">
                        <Link href="https://www.google.com/search?q=county+cargo+us" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                            View our Google reviews
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="service-card bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay={`${index * 100}`}>
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    {review.initial}
                                </div>
                                <div className="ml-4">
                                    <h4 className="font-semibold text-secondary">{review.name}</h4>
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600 mb-3">{review.review}</p>
                            <p className="text-sm text-gray-400">{review.time}</p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12" data-aos="fade-up">
                    <Link href="https://www.google.com/search?q=county+cargo+us" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-semibold hover:underline">
                        Read More Reviews on Google
                        <ExternalLink className="h-5 w-5 ml-2" />
                    </Link>
                </div>
            </div>
        </section>

        <Faq />

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shipping from US to Nigeria?</h2>
                <p className="text-lg mb-8">Join thousands of satisfied customers who trust County Cargo for their shipping needs.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="https://ship.countycargo.com/register">Get Your Free US Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
