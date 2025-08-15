"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { MapPin, Calendar, Clock, Shirt } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const events = [
  {
    title: "Wedding Ceremony",
    date: "Wednesday, December 24, 2025",
    time: "2:00 PM",
    location: "St. Regis Hotel, San Francisco",
    address: "125 3rd St, San Francisco, CA 94103",
    dressCode: "Black Tie Optional",
  },
  {
    title: "Reception Dinner",
    date: "Wednesday, December 24, 2025",
    time: "5:00 PM",
    location: "The Garden Court, Palace Hotel",
    address: "2 New Montgomery St, San Francisco, CA 94105",
    dressCode: "Black Tie Optional",
  },
];

const EventCard = ({ event, delay }: { event: typeof events[0], delay: number }) => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div ref={ref} className="w-full">
      <Card
        className={`bg-card border-border/50 shadow-lg hover:shadow-primary/20 transition-all duration-300 ${isVisible ? 'animate-slide-in' : 'opacity-0'}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-card-foreground/80">
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-4">
            <Clock className="w-5 h-5 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="font-semibold text-card-foreground">
                {event.location}
              </p>
              <p>{event.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Shirt className="w-5 h-5 text-primary" />
            <span>{event.dressCode}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


export default function EventDetails() {
  return (
    <section id="events" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 text-secondary-foreground"
        >
          Event Details
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
             <EventCard key={event.title} event={event} delay={index * 200} />
          ))}
        </div>
      </div>
    </section>
  );
}
