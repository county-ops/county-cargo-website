
import Image from 'next/image';
import Link from 'next/link';

type BlogPost = {
    title: string;
    image: string;
    imageHint: string;
    description: string;
    url: string;
};

export function BlogPostCard({ post, index }: { post: BlogPost; index: number }) {
    return (
        <div 
            className="blog-card bg-gray-50 rounded-lg shadow-md overflow-hidden transition-all duration-300 group h-full flex flex-col" 
            data-aos="fade-up" 
            data-aos-delay={`${100 * (index % 3)}`}
        >
            <div className="overflow-hidden">
                <Image 
                    src={post.image} 
                    alt={post.title} 
                    data-ai-hint={post.imageHint} 
                    width={640} 
                    height={384} 
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-secondary mb-3">{post.title}</h3>
                <p className="text-gray-800 mb-4 flex-grow">{post.description}</p>
                <Link href={post.url} className="text-primary font-semibold hover:underline mt-auto">
                    Read More &rarr;
                </Link>
            </div>
        </div>
    );
}
