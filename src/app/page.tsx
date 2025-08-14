import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import EventDetails from "@/components/sections/EventDetails";
import RsvpFormSection from "@/components/sections/RsvpFormSection";
import GiftRegistry from "@/components/sections/GiftRegistry";
import PhotoGallery from "@/components/sections/PhotoGallery";
import ThankYouNoteGenerator from "@/components/sections/ThankYouNoteGenerator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <EventDetails />
        <RsvpFormSection />
        <GiftRegistry />
        <PhotoGallery />
        <ThankYouNoteGenerator />
      </main>
      <Footer />
    </div>
  );
}
