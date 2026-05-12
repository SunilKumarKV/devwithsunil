import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import YoutubeSection from "@/components/YoutubeSection";
import TutorialsSection from "@/components/TutorialsSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEO />
    <Header />
    <main>
      <HeroSection />
      <AboutSection />
      <YoutubeSection />
      <TutorialsSection />
      <ProjectsSection />
      <BlogSection />
      <NewsletterSection />
      <ContactSection />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Index;
