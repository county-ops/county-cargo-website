
import Image from 'next/image';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Shipping from UK to Nigeria - Fast & Affordable Shipping | County Cargo',
  description: 'Looking to ship from UK to Nigeria? County Cargo offers fast, reliable, and affordable shipping from the UK to Nigeria. Get your free UK address today and enjoy seamless delivery of your goods.',
  keywords: 'ship from UK to Nigeria, shipping to Nigeria, UK to Nigeria cargo, send parcel to Nigeria, UK personal shopper Nigeria, cheapest shipping to Nigeria, fast shipping Nigeria, reliable shipping UK Nigeria, freight forwarding Nigeria, UK shipping address Nigeria',
};

const processSteps = [
  {
    icon: <UserPlus className="h-10 w-10 text-white" />,
    title: '1. Get Your Free UK Shipping Address',
    description: 'Create your free account in minutes to receive your personal UK shipping address.',
  },
  {
    icon: <ShoppingCart className="h-10 w-10 text-white" />,
    title: '2. Shop in the UK',
    description: 'Shop from any online retailer in the UK and use your County Cargo UK shipping address at checkout.',
  },
  {
    icon: <Gift className="h-10 w-10 text-white" />,
    title: '3. We Handle the Rest',
    description: 'We process and deliver your packages to your doorstep or nearest collection point.',
  },
];

const pricingTiers = [
  {
    title: 'Standard Shipping',
    price: '£5.80',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Delivery in 5-10 working days',
      'Full tracking included',
      '£15 handling charge',
    ],
  },
  {
    title: '48hrs Express Shipping',
    price: '£22.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Fast delivery in 48 hours',
      'Full tracking included',
      '£20 handling charge',
    ],
  },
  {
    title: '24hrs Express Shipping',
    price: '£24.00',
    per: '/kg',
    features: [
      '1kg minimum weight',
      'Super-fast delivery in 24 hours',
      'Real-time tracking',
      'Highest priority handling',
      '£20 handling charge',
    ],
  },
];

const guideFeatures = [
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Affordable Rates",
        description: "We offer the most competitive rates for shipping from UK to Nigeria. Our transparent pricing means you know exactly what you're paying for, with no hidden costs."
    },
    {
        icon: <Truck className="h-8 w-8 text-primary" />,
        title: "Fast & Reliable Delivery",
        description: "With our standard and express options, you can choose the speed that fits your needs. We are committed to providing a fast and reliable ship from UK to Nigeria service every time."
    },
    {
        icon: <Shield className="h-8 w-8 text-primary" />,
        title: "Security & Peace of Mind",
        description: "Every parcel is handled with the utmost care. We offer tracking and insurance options so you can ship from UK to Nigeria with confidence, knowing your items are safe."
    }
];

const stores1 = [
    { name: "Marks & Spencer", seed: "ms" }, { name: "Tesco", seed: "tesco" },
    { name: "ASOS", seed: "asos" }, { name: "John Lewis", seed: "johnlewis" },
    { name: "Next", seed: "next" }, { name: "Boots", seed: "boots" },
    { name: "Currys", seed: "currys" }, { name: "JD Sports", seed: "jdsports" },
    { name: "Amazon UK", seed: "amazonuk" }, { name: "eBay UK", seed: "ebayuk" },
    { name: "Argos", seed: "argos" }, { name: "Very", seed: "very" },
    { name: "Boohoo", seed: "boohoo" }, { name: "PrettyLittleThing", seed: "plt" },
    { name: "River Island", seed: "riverisland" }, { name: "Sports Direct", seed: "sportsdirect" },
];
const stores2 = [
    { name: "Debenhams", seed: "debenhams" }, { name: "Selfridges", seed: "selfridges" },
    { name: "Harrods", seed: "harrods" }, { name: "Superdrug", seed: "superdrug" },
    { name: "Primark", seed: "primark" }, { name: "Zara", seed: "zara" },
    { name: "H&M", seed: "hm" }, { name: "Matalan", seed: "matalan" },
    { name: "The Body Shop", seed: "bodyshop" }, { name: "Waitrose", seed: "waitrose" },
    { name: "Sainsbury's", seed: "sainsburys" }, { name: "Asda", seed: "asda" },
    { name: "TK Maxx", seed: "tkmaxx" }, { name: "Dunelm", seed: "dunelm" },
    { name: "The Range", seed: "therange" }, { name: "IKEA UK", seed: "ikeauk" },
];
const stores3 = [
    { name: "PC World", seed: "pcworld" }, { name: "AO.com", seed: "ao" },
    { name: "Apple UK", seed: "appleuk" }, { name: "Nike UK", seed: "nikeuk" },
    { name: "Adidas UK", seed: "adidasuk" }, { name: "Footasylum", seed: "footasylum" },
    { name: "Schuh", seed: "schuh" }, { name: "Clarks", seed: "clarks" },
    { name: "LookFantastic", seed: "lookfantastic" }, { name: "Cult Beauty", seed: "cultbeauty" },
    { name: "Space NK", seed: "spacenk" }, { name: "Feel Unique", seed: "feelunique" },
    { name: "New Look", seed: "newlook" }, { name: "Topshop", seed: "topshop" },
];

const allStores1 = [...stores1, ...stores1];
const allStores2 = [...stores2, ...stores2];
const allStores3 = [...stores3, ...stores3];

const reviews = [
    {
        initial: 'A',
        name: 'Adewale Johnson',
        review: '"Excellent service! I\'ve been using County Cargo for over a year now to ship electronics from UK to Lagos. The 48hrs express option is incredibly fast and my items always arrive safely. Highly recommended!"',
        time: '2 weeks ago'
    },
    {
        initial: 'C',
        name: 'Chioma Okafor',
        review: '"Best shipping company for UK to Nigeria! Their customer service is top-notch. I love shopping from ASOS and Next, and County Cargo makes it so easy. The tracking system is very transparent too."',
        time: '1 month ago'
    },
    {
        initial: 'O',
        name: 'Oluwaseun Balogun',
        review: '"Very affordable rates compared to other companies. I shipped my laptop and phone from Amazon UK to Abuja using standard shipping and everything arrived in perfect condition. Will definitely use again!"',
        time: '3 weeks ago'
    },
     {
        initial: 'E',
        name: 'Emmanuel Nwosu',
        review: '"Professional and reliable service. I run an online business and County Cargo helps me import products from UK suppliers efficiently. Their consolidation service saves me a lot of money!"',
        time: '1 week ago'
    },
    {
        initial: 'F',
        name: 'Funke Adeyemi',
        review: '"I love County Cargo! Easy to use website, great prices, and my packages always arrive on time. I shop from Boots, M&S, and John Lewis regularly and they handle everything perfectly."',
        time: '2 months ago'
    },
    {
        initial: 'T',
        name: 'Tunde Ajayi',
        review: '"The 24hrs express shipping is a game changer! I needed urgent documents and gadgets shipped to Port Harcourt and they delivered exactly on time. Worth every penny. 5 stars!"',
        time: '5 days ago'
    },
];

const faqItems = [
    {
        question: 'How do I get a UK shipping address?',
        answer: 'Simply create a free account with County Cargo, and we\'ll instantly provide you with your unique UK shipping address. This is essential for anyone looking to ship from UK to Nigeria. You can then use this address when shopping from any UK online retailer. You might even consider our UK personal shopper Nigeria service for added convenience.'
    },
    {
        question: 'What is the cost of shipping from UK to Nigeria?',
        answer: 'Our shipping costs to Nigeria vary depending on the weight, dimensions, and chosen shipping speed (Standard, 48hrs Express, or 24hrs Express). We aim for the cheapest shipping to Nigeria without compromising service. Please refer to our pricing section above for detailed rates, starting from £5.80/kg. This covers your UK to Nigeria cargo needs.'
    },
    {
        question: 'How long does it take to ship from UK to Nigeria?',
        answer: 'Standard shipping typically takes 5-10 working days. For fast shipping Nigeria, our 48hrs Express option delivers in 2 working days, and our 24hrs Express option delivers in 1 working day. Delivery times are from when the parcel leaves our UK warehouse. We are committed to reliable shipping UK Nigeria for all your packages.'
    },
    {
        question: 'Is my parcel insured when shipping from UK to Nigeria?',
        answer: 'Yes, all our shipping options include basic insurance cover when you send parcel to Nigeria. Premium insurance is available with our express services for enhanced peace of mind. You can find more details in our terms and conditions, ensuring safe freight forwarding Nigeria.'
    },
     {
        question: 'Can I track my shipment from UK to Nigeria?',
        answer: 'Absolutely! Full tracking is included with all our shipping services. You will receive a tracking number once your parcel is dispatched, allowing you to monitor its journey from our UK warehouse to your doorstep in Nigeria. This ensures transparent UK to Nigeria cargo delivery.'
    },
]

export default function ShipFromUkToNigeriaPage() {
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Shipping from UK to Nigeria</h1>
            <p className="text-lg md:text-xl mt-4 max-w-3xl mx-auto">Fast, reliable, and affordable shipping from UK to Nigeria. Get your personal UK shipping address and start your shipping journey today!</p>
            <div className="mt-8">
              <Button asChild size="lg" className="bg-white text-destructive font-semibold hover:bg-gray-100 transition-colors">
                <Link href="https://ship.countycargo.com/register">Get your free UK shipping address</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="process" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">How Our Shipping From UK to Nigeria Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">A simple, three-step process to get your packages delivered when you ship from the UK to Nigeria.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {processSteps.map((step, index) => (
                        <div key={index} className="process-step">
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
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Pricing to Ship from UK to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Transparent and competitive pricing for your shipping from UK to Nigeria needs.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {pricingTiers.map((tier, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-semibold text-secondary mb-4">{tier.title}</h3>
                            <p className="text-4xl font-bold text-primary mb-4">
                                <span className="text-lg font-normal text-gray-500">from</span> {tier.price}
                                <span className="text-lg font-normal text-gray-500">{tier.per}</span>
                            </p>
                            <ul className="text-gray-600 space-y-2">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <Check className="h-5 w-5 text-green-500 mr-2" />{feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <section id="seo-content" className="py-20 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Ultimate Guide to Shipping from UK to Nigeria</h2>
                    <p className="mb-12 text-lg max-w-3xl mx-auto">When it comes to shipping from UK to Nigeria, County Cargo is your most trusted partner. We've simplified the entire process, making it easier than ever for you to shop from your favourite UK stores and receive your goods in Nigeria without hassle.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    {guideFeatures.map((feature, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
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
                 <div className="text-center mt-12">
                     <p className="text-lg">Our 3-step process is designed for your convenience. The journey of your shipping from UK to Nigeria begins with a simple registration, giving you a unique UK shipping address. This address is your gateway to thousands of UK retailers. Once your purchases arrive at our warehouse, we handle the consolidation, customs, and final delivery, completing the ship from UK to Nigeria process with professionalism and care.</p>
                </div>
            </div>
        </section>

        <section id="uk-stores" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Shop Thousands of UK Stores and Ship to Nigeria</h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">Here are just a few of the thousands of UK online stores you can shop from for your shipping from UK to Nigeria.</p>
                </div>
            </div>
            <div className="logos">
                <div className="scroller">
                    <div className="scroller__inner">
                        {allStores1.map((store, index) => (
                            <Image key={index} src={`https://picsum.photos/seed/${store.seed}/140/50`} alt={store.name} width={140} height={50} className="object-contain" />
                        ))}
                    </div>
                </div>
                <div className="scroller mt-4">
                    <div className="scroller__inner" style={{animationDirection: "reverse"}}>
                         {allStores2.map((store, index) => (
                            <Image key={index} src={`https://picsum.photos/seed/${store.seed}/140/50`} alt={store.name} width={140} height={50} className="object-contain" />
                        ))}
                    </div>
                </div>
                <div className="scroller mt-4">
                    <div className="scroller__inner">
                         {allStores3.map((store, index) => (
                            <Image key={index} src={`https://picsum.photos/seed/${store.seed}/140/50`} alt={store.name} width={140} height={50} className="object-contain" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="text-center mt-12">
                <Button asChild>
                    <Link href="#">See All UK Stores</Link>
                </Button>
            </div>
        </section>

        <section id="reviews" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Customers Say</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by thousands for shipping from UK to Nigeria</p>
                    <div className="mt-4">
                        <Link href="https://www.google.com/search?q=county+cargo+uk" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                            View our Google reviews
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="service-card bg-white rounded-lg shadow-md p-6">
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

                <div className="text-center mt-12">
                    <Link href="https://www.google.com/search?q=county+cargo+uk" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary font-semibold hover:underline">
                        Read More Reviews on Google
                        <ExternalLink className="h-5 w-5 ml-2" />
                    </Link>
                </div>
            </div>
        </section>

        <section id="faq" className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Find answers to common questions about shipping from UK to Nigeria with County Cargo.</p>
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

        <section className="py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Shipping from UK to Nigeria?</h2>
                <p className="text-lg mb-8">Join thousands of satisfied customers who trust County Cargo for their shipping needs.</p>
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200">
                    <Link href="#">Get Your Free UK Address Now</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
