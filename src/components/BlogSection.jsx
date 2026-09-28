import SectionHeading from './SectionHeading';
import BlogCard from './BlogCard';
import Reveal, { edgeVariant } from './Reveal';
import { posts } from '../data/blog';

export default function BlogSection() {
  return (
    <section id="blog" className="section blog">
      <div className="container">
        <SectionHeading
          eyebrow="Blog"
          title="Consejos prácticos para tu negocio."
          subtitle="Guías cortas y directas para que tu empresa se haga más visible online, con especial foco en Cádiz y provincia."
        />
      </div>
      <div className="container blog__grid">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 80} variant={edgeVariant(index, posts.length)} className="blog__item">
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
