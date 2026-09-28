import { Link } from 'react-router-dom';
import { PiCalendarBlank, PiClock, PiArrowRight } from 'react-icons/pi';

export default function BlogCard({ post }) {
  const Icon = post.icon;

  return (
    <article className="blog-card">
      <Link to={`/blog/${post.slug}`} className="blog-card__link" aria-label={`Leer artículo: ${post.title}`}>
        <div className="blog-card__top">
          <span className="blog-card__icon" aria-hidden="true">
            <Icon size={24} />
          </span>
          <span className="blog-card__tag">{post.tag}</span>
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__desc">{post.excerpt}</p>
        <div className="blog-card__footer">
          <div className="blog-card__meta">
            <span>
              <PiCalendarBlank size={14} aria-hidden="true" />
              {post.dateLabel}
            </span>
            <span>
              <PiClock size={14} aria-hidden="true" />
              {post.readTime}
            </span>
          </div>
          <span className="blog-card__read" aria-hidden="true">
            Leer
            <PiArrowRight size={16} />
          </span>
        </div>
      </Link>
    </article>
  );
}
