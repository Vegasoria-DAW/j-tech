import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Process from '../components/Process';
import Transformation from '../components/Transformation';
import Technologies from '../components/Technologies';
import CTASection from '../components/CTASection';
import ContactForm from '../components/ContactForm';
import BlogSection from '../components/BlogSection';
import FAQ from '../components/FAQ';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Transformation />
        <Technologies />
        <CTASection />
        <ContactForm />
        <BlogSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
