import Hero from "@/components/sections/Hero";
import EventDetails from "@/components/sections/EventDetails";
import ExcitementCounter from "@/components/sections/ExcitementCounter";
import RsvpFormSection from "@/components/sections/RsvpFormSection";
import PhotoGallery from "@/components/sections/PhotoGallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <Hero />
        <EventDetails />
        <ExcitementCounter />
        <RsvpFormSection />
        <PhotoGallery />
      </main>
      <Footer />
    </div>
  );
}
