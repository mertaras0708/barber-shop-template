import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import SignatureExperience from '@/components/SignatureExperience';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Pricing from '@/components/Pricing';
import BookingSection from '@/components/BookingSection';
import Testimonials from '@/components/Testimonials';
import LocationContact from '@/components/LocationContact';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import MobileStickyCTA from '@/components/MobileStickyCTA';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';

export default function Home() {
  return (
    <>
      <JsonLd />
      <Header />
      <main className="relative">
        <Hero />
        <TrustBar />
        <Services />
        <SignatureExperience />
        <Team />
        <Gallery />
        <Pricing />
        <BookingSection />
        <Testimonials />
        <LocationContact />
        <FAQ />
      </main>
      <Footer />
      <MobileStickyCTA />
      <CookieBanner />
    </>
  );
}
