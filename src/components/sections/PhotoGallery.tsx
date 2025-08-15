"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const photos = [
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 1",
    hint: "couple laughing",
  },
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 2",
    hint: "couple holding hands",
  },
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 3",
    hint: "romantic scenery",
  },
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 4",
    hint: "engagement photo",
  },
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 5",
    hint: "couple vacation",
  },
  {
    src: "https://placehold.co/400x500.png",
    alt: "Couple photo 6",
    hint: "couple smiling",
  },
];

export default function PhotoGallery() {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12 text-secondary-foreground"
        >
          Our Moments
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <CardContent className="flex aspect-[4/5] items-center justify-center p-0">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        data-ai-hint={photo.hint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-primary-foreground bg-primary hover:bg-primary/80 border-none" />
          <CarouselNext className="text-primary-foreground bg-primary hover:bg-primary/80 border-none" />
        </Carousel>
      </div>
    </section>
  );
}
