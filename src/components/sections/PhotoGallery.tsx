"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function PhotoGallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 text-foreground"
        >
          Our Moment
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardContent className="p-0">
              <Image
                src="https://placehold.co/800x600.png"
                alt="Rose and Kim Young Wookk"
                width={800}
                height={600}
                className="w-full h-full object-cover"
                data-ai-hint="couple smiling"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
