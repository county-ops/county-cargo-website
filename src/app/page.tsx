import Image from 'next/image';
import Link from 'next/link';
import {
  Globe,
  Ship,
  ShieldCheck,
  Facebook,
  Twitter,
  Instagram,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/header';
import { RealtimeTracking } from '@/components/realtime-tracking';
import { Input } from '@/components/ui/input';


const features = [
  {
    icon: <Globe className="h-8 w-8 text-primary" />,
    title: 'Global Connectivity',
    description:
      'We offer a vast network of shipping routes, ensuring your package can reach any destination worldwide.',
  },
  {
    icon: <Ship className="h-8 w-8 text-primary" />,
    title: 'Versatile Fleet Options',
    description:
      'Our diverse fleet of vehicles can handle any type of shipment, from small parcels to large cargo.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Secure Handling',
    description:
      'Your package is handled with the utmost care, with multiple security checks to ensure its safety.',
  },
];

const vehicles = [
  {
    id: 'air',
    name: 'Air Freight',
    description: 'Our strategic solutions are designed for time-sensitive international shipments, ensuring fast parcel delivery at lower operational costs, maximizing your reach and profits.',
    image: 'https://picsum.photos/600/400?q=1',
    imageHint: 'cargo airplane'
  },
  {
    id: 'sea',
    name: 'Sea Freight',
    description: 'Powerful, economical freight services that can transport bulk shipments to any country. Our sea freight service offers complete visibility of your freight at a lower cost.',
    image: 'https://picsum.photos/600/400?q=2',
    imageHint: 'cargo ship'
  },
  {
    id: 'road',
    name: 'Road Freight',
    description: 'A cost-effective network of ground transport that ensures that your goods reach their destination safely and punctually.',
    image: 'https://picsum.photos/600/400?q=3',
    imageHint: 'cargo truck'
  },
];

const testimonials = [
  {
    quote: "Pandex has been a game-changer for our business. Their real-time tracking and reliable delivery have significantly improved our customer satisfaction.",
    name: 'Jessica Jung',
    title: 'CEO, Chic Boutique',
    avatar: 'https://picsum.photos/100/100?q=5',
    avatarHint: 'woman portrait'
  },
  {
    quote: "The customer service at Pandex is top-notch. They are always available to answer my questions and provide updates on my shipments.",
    name: 'David Kim',
    title: 'Owner, K-Pop Store',
    avatar: 'https://picsum.photos/100/100?q=6',
    avatarHint: 'man portrait'
  },
  {
    quote: "I've been using Pandex for all my international shipping needs, and I couldn't be happier. Their rates are competitive, and my packages always arrive on time.",
    name: 'Emily Chen',
    title: 'E-commerce Seller',
    avatar: 'https://picsum.photos/100/100?q=7',
    avatarHint: 'woman portrait professional'
  },
];

const faqItems = [
    {
        question: "How does real-time tracking work on Pandex?",
        answer: "With our real-time tracking, you simply enter your tracking number on our website or app. You'll get instant updates on your package's location, status, and estimated delivery time. It's transparent and easy to use."
    },
    {
        question: "How does Pandex integrate with my e-commerce store?",
        answer: "Pandex offers seamless integration with major e-commerce platforms. This allows for automated order syncing, real-time shipping rate calculation at checkout, and automatic fulfillment updates, simplifying your logistics."
    },
    {
        question: "How does Pandex handle returns?",
        answer: "We offer a hassle-free returns process. You can initiate a return through our portal, and we'll handle the pickup and shipping back to the sender. We aim to make returns as easy as deliveries."
    },
    {
        question: "How do I calculate shipping costs?",
        answer: "Shipping costs are calculated based on package weight, dimensions, destination, and the shipping service selected. You can get an instant quote using the calculator on our website."
    },
    {
        question: "Can I redirect a package while it's in transit?",
        answer: "Yes, with Pandex, you have the flexibility to redirect your package to a different address or schedule a pickup at a nearby location, even after it has been shipped."
    }
]

const partners = [
  { name: "Logistics", logo: "/logo-placeholder.svg" },
  { name: "Fast Lane", logo: "/logo-placeholder.svg" },
  { name: "DSV Global", logo: "/logo-placeholder.svg" },
  { name: "DHL Logistics", logo: "/logo-placeholder.svg" },
  { name: "TSS Logistics", logo: "/logo-placeholder.svg" },
];


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent">
            <Image
                src="https://picsum.photos/1920/1080?q=8"
                alt="Cargo ship"
                data-ai-hint="cargo ship port"
                fill
                className="object-cover opacity-20"
            />
        </div>
          <div className="container mx-auto max-w-7xl px-4 md:px-6 relative">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 sm:text-5xl md:text-6xl lg:text-7xl">
                  Elevate Your Business with <span className="text-primary">Reliable</span> Shipping Services
                </h1>
                <p className="mx-auto max-w-xl text-muted-foreground md:mx-0 md:text-xl">
                  We provide a seamless and reliable shipping service, with automated customs and a global network to ensure on-time delivery of your packages.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                  <Link href="#quote">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get a Quote
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-8 pt-4 justify-center md:justify-start text-foreground">
                    <div className="text-center">
                        <p className="text-4xl font-bold">100K</p>
                        <p className="text-sm text-muted-foreground">Successful Deliveries</p>
                    </div>
                    <div className="text-center">
                        <p className="text-4xl font-bold">15+</p>
                        <p className="text-sm text-muted-foreground">Years of Experience</p>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="w-full py-12 bg-secondary">
            <div className="container mx-auto max-w-7xl px-4 md:px-6">
                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                    {partners.map(partner => (
                        <div key={partner.name} className="flex items-center gap-2">
                           <p className="font-bold text-xl text-muted-foreground">{partner.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>


        {/* Tracking Section */}
        <section id="tracking" className="w-full py-20 md:py-28">
           <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <div className="grid gap-12 md:grid-cols-2 md:items-center">
                <div className="space-y-4">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">Real Time Tracking for Modern Shipments</h2>
                    <p className="text-muted-foreground md:text-lg">We have created a user-friendly and reliable shipping experience, with real-time tracking and automated customs clearing to ensure your package gets to you.</p>
                </div>
                <RealtimeTracking />
              </div>
           </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28 bg-secondary">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                The Unique Features of Our Shipping Service
              </h2>
              <p className="text-muted-foreground md:text-lg">
              We provide a user-friendly and reliable shipping experience, with real-time tracking and automated customs clearing to ensure your package gets to you on time.
              </p>
               <Button>Learn More</Button>
            </div>
            <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-2">
              <div className="grid gap-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-headline text-xl font-bold mb-2">Global Connectivity</h3>
                    <p className="text-muted-foreground">We offer a vast network of shipping routes, ensuring your package can reach any destination worldwide.</p>
                    <Image src="https://picsum.photos/600/400?q=9" data-ai-hint="globe world map" alt="Global Connectivity" width={600} height={400} className="mt-4 rounded-lg"/>
                </div>
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-headline text-xl font-bold mb-2">Tracking</h3>
                    <p className="text-muted-foreground">Our real-time tracking system gives you complete visibility from departure to arrival.</p>
                    <Image src="https://picsum.photos/300/200?q=10" data-ai-hint="person tracking package" alt="Tracking" width={300} height={200} className="mt-4 rounded-lg"/>
                </div>
              </div>
               <div className="grid gap-8">
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-headline text-xl font-bold mb-2">Versatile Fleet Options</h3>
                    <p className="text-muted-foreground">Our diverse fleet of vehicles can handle any type of shipment, from small parcels to large cargo.</p>
                </div>
                 <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                    <h3 className="font-headline text-xl font-bold mb-2">Secure Handling</h3>
                    <p className="text-muted-foreground">Your package is handled with the utmost care, with multiple security checks to ensure its safety.</p>
                </div>
                 <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
                   <Image src="https://picsum.photos/600/400?q=11" data-ai-hint="shipping containers" alt="Containers" width={600} height={400} className="rounded-lg"/>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Selection Section */}
        <section id="solutions" className="w-full py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Choosing the Right Vehicle for Your Package
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="mt-12 space-y-8">
              {vehicles.map((vehicle, index) => (
                <Card key={vehicle.id} className="p-4 bg-secondary border-border/50">
                  <div className={`grid gap-8 md:grid-cols-2 md:items-center ${index % 2 !== 0 ? 'md:grid-flow-col-dense' : ''}`}>
                    <div className={`relative h-64 w-full overflow-hidden rounded-lg md:h-80 ${index % 2 !== 0 ? 'md:col-start-2' : ''}`}>
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        data-ai-hint={vehicle.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className={`space-y-4 ${index % 2 !== 0 ? 'md:col-start-1' : ''}`}>
                      <h3 className="font-headline text-2xl font-bold">{vehicle.name}</h3>
                      <p className="text-muted-foreground">{vehicle.description}</p>
                      <Button variant="outline">Learn More <ChevronDown className="h-4 w-4 transform -rotate-90 ml-2" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="w-full bg-secondary py-20 md:py-28">
            <div className="container mx-auto max-w-4xl px-4 md:px-6">
                <h2 className="font-headline text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <p className="text-center text-muted-foreground mb-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {faqItems.map((item, index) => (
                        <AccordionItem value={`item-${index}`} key={index} className="border rounded-lg mb-4 px-6 bg-card border-border/50">
                            <AccordionTrigger className="font-headline font-semibold text-lg hover:no-underline text-card-foreground">{item.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Testimonial
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Don't just take our word for it - our clients are our biggest advocates. Here's what they have to say about their experience working with us.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="flex flex-col bg-card border-border/50">
                    <CardContent className="flex flex-1 flex-col justify-between p-6">
                      <blockquote className="text-lg leading-snug text-muted-foreground">
                        &ldquo;{testimonial.quote}&rdquo;
                      </blockquote>
                      <div className="mt-6 flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint={testimonial.avatarHint} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-secondary text-gray-400">
        <div className="container mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-4 md:px-6">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">Pandex</span>
            </Link>
            <p className="text-sm">
            Join our newsletter to stay up to date on features and releases.
            </p>
            <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="bg-background border-border/50 text-foreground" />
                <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-gray-500">By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company.</p>

          </div>
          <div className="space-y-2 md:text-right">
            <h4 className="font-headline font-semibold text-white">Follow Us</h4>
             <div className="flex gap-4 md:justify-end">
              <Link href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-primary" />
              </Link>
            </div>
          </div>
           <div className="space-y-2">
            <h4 className="font-headline font-semibold text-white">About</h4>
            <ul className="space-y-1">
              <li><Link href="#" className="text-sm hover:text-primary">Home</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">Services</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">About Us</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold text-white">Info</h4>
            <ul className="space-y-1">
              <li><Link href="#" className="text-sm hover:text-primary">Contact</Link></li>
               <li><Link href="#" className="text-sm hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm hover:text-primary">Blog</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50">
          <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row md:px-6">
            <p className="text-sm">
              © {new Date().getFullYear()} Pandex. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
