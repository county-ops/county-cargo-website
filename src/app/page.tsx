import Image from 'next/image';
import Link from 'next/link';
import {
  Truck,
  Timer,
  ShieldCheck,
  Linkedin,
  Twitter,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShippingCostEstimator } from '@/components/shipping-cost-estimator';
import { Header } from '@/components/header';

const features = [
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: 'Nationwide Coverage',
    description:
      'Our vast network ensures fast and efficient delivery to any corner of the country, from bustling cities to remote towns.',
  },
  {
    icon: <Timer className="h-8 w-8 text-primary" />,
    title: 'On-Time Delivery',
    description:
      'We pride ourselves on punctuality. Our logistics are optimized to meet deadlines and deliver your goods exactly when promised.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: 'Secure & Safe',
    description:
      'Your cargo is precious. We handle every package with utmost care and provide real-time tracking for your peace of mind.',
  },
];

const vehicles = [
  {
    id: 'vans',
    name: 'Small Vans',
    description: 'Perfect for urgent, small parcels, and last-mile document deliveries in urban areas.',
    image: 'https://picsum.photos/600/400?q=1',
    imageHint: 'delivery van'
  },
  {
    id: 'trucks',
    name: 'Large Trucks',
    description: 'The workhorse of our fleet, ideal for full container loads, heavy pallets, and inter-city transport.',
    image: 'https://picsum.photos/600/400?q=2',
    imageHint: 'large truck'
  },
  {
    id: 'refrigerated',
    name: 'Refrigerated',
    description: 'Specialized vehicles for temperature-sensitive goods, ensuring your perishables arrive fresh.',
    image: 'https://picsum.photos/600/400?q=3',
    imageHint: 'refrigerated truck'
  },
  {
    id: 'specialized',
    name: 'Specialized',
    description: 'Custom solutions for oversized, hazardous, or high-value materials requiring special handling.',
    image: 'https://picsum.photos/600/400?q=4',
    imageHint: 'flatbed truck'
  },
];

const testimonials = [
  {
    quote: "SwiftCargo transformed our supply chain. Their on-time delivery and professional service are unmatched. We've seen a significant improvement in our operational efficiency.",
    name: 'Sarah Johnson',
    title: 'Operations Manager, TechCorp',
    avatar: 'https://picsum.photos/100/100?q=5',
    avatarHint: 'woman portrait'
  },
  {
    quote: "As a small business, reliable shipping is crucial. SwiftCargo provided an affordable and scalable solution that grew with us. Their team is always responsive and helpful.",
    name: 'David Chen',
    title: 'Founder, Artisan Goods Co.',
    avatar: 'https://picsum.photos/100/100?q=6',
    avatarHint: 'man portrait'
  },
  {
    quote: "The real-time tracking and secure handling gave us complete peace of mind. We trust SwiftCargo with our most valuable shipments, and they have never disappointed.",
    name: 'Maria Garcia',
    title: 'Logistics Head, PharmaSolutions',
    avatar: 'https://picsum.photos/100/100?q=7',
    avatarHint: 'woman portrait professional'
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-b from-blue-50 via-background to-background pt-16 pb-24 md:pt-24 md:pb-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div className="space-y-6 text-center md:text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block text-lg font-medium text-primary sm:text-xl md:text-2xl">
                    Elevate Your Business with
                  </span>
                  Reliable Shipping
                </h1>
                <p className="mx-auto max-w-xl text-muted-foreground md:mx-0 md:text-xl">
                  We deliver your goods on time, every time. Nationwide logistics solutions tailored for your business's growth.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                  <Link href="#quote">
                    <Button size="lg" className="w-full sm:w-auto">
                      Get a Free Quote
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Our Services
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-2xl md:h-96">
                <Image
                  src="https://picsum.photos/800/600"
                  alt="A logistics truck on a highway"
                  data-ai-hint="logistics truck highway"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                The Unique Features of Our Services
              </h2>
              <p className="text-muted-foreground md:text-lg">
                We go the extra mile to ensure your shipments are handled with precision, care, and efficiency.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card key={feature.title} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
                  <CardHeader className="items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Vehicle Selection Section */}
        <section id="solutions" className="w-full bg-muted py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Choosing the Right Vehicle for Your Needs
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Not every shipment is the same. We offer a diverse fleet to match the size, priority, and requirements of your cargo.
              </p>
            </div>
            <Tabs defaultValue={vehicles[0].id} className="mt-12 w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                {vehicles.map((vehicle) => (
                  <TabsTrigger key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {vehicles.map((vehicle) => (
                <TabsContent key={vehicle.id} value={vehicle.id} className="mt-8 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="grid gap-8 md:grid-cols-2 md:items-center">
                    <div className="relative h-64 w-full overflow-hidden rounded-lg md:h-80">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        data-ai-hint={vehicle.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">{vehicle.name}</h3>
                      <p className="text-muted-foreground">{vehicle.description}</p>
                      <Button>Request this Vehicle</Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Cost Estimation Section */}
        <section id="quote" className="w-full py-20 md:py-28">
           <div className="container mx-auto max-w-7xl px-4 md:px-6">
              <ShippingCostEstimator />
           </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="w-full bg-muted py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-4 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Trusted by Businesses Everywhere
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Hear what our satisfied clients have to say about our services.
              </p>
            </div>
            <Carousel
              opts={{ align: 'start', loop: true }}
              className="mt-12 w-full max-w-5xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                          <blockquote className="text-lg font-semibold leading-snug">
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
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="w-full bg-primary py-20 md:py-28">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-6 text-center text-primary-foreground">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Streamline Your Shipping?
              </h2>
              <p className="mx-auto max-w-xl text-primary-foreground/80 md:text-lg">
                Get in touch with our team today for a custom quote and see how we can support your business.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#quote">Contact Us Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-muted">
        <div className="container mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SwiftCargo</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your reliable partner in logistics and shipping.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-1">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-primary">Services</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#quote" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="#contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>hello@swiftcargo.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Logistics St., Anytown, USA</li>
            </ul>
          </div>
        </div>
        <div className="border-t">
          <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row md:px-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SwiftCargo. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
              <Link href="#" className="hover:text-primary">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
