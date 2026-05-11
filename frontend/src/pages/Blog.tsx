import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BlogSection from "@/components/BlogSection";
import SEO from "@/components/SEO";
import { brand } from "@/lib/brand";

const Blog = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Blog - DevWithSunil"
      description="Read DevWithSunil articles on React, JavaScript, backend APIs, AI tools, UI/UX, and production project development."
      canonical={`${brand.siteUrl}/blog`}
    />
    <Header />
    <main className="pt-16">
      <BlogSection />
    </main>
    <Footer />
    <ScrollToTop />
  </div>
);

export default Blog;
