import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const registries = [
  {
    name: "Zola",
    url: "#",
    logo: "https://placehold.co/150x50.png",
    hint: "brand logo",
  },
  {
    name: "Crate & Barrel",
    url: "#",
    logo: "https://placehold.co/150x50.png",
    hint: "brand logo",
  },
  {
    name: "Williams Sonoma",
    url: "#",
    logo: "https://placehold.co/150x50.png",
    hint: "brand logo",
  },
];

export default function GiftRegistry() {
  return (
    <section id="registry" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-4xl md:text-5xl font-headline font-bold text-center mb-12"
          style={{ color: "hsl(var(--secondary))" }}
        >
          Gift Registry
        </h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="mb-12 text-lg text-card-foreground/80">
            Your presence at our wedding is the greatest gift of all. However,
            if you wish to honor us with a gift, we have registered at the
            following stores.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {registries.map((registry) => (
              <Card
                key={registry.name}
                className="bg-background border-border/50 p-6 flex flex-col items-center justify-between shadow-lg hover:shadow-primary/20 transition-shadow duration-300"
              >
                <Image
                  src={registry.logo}
                  alt={`${registry.name} logo`}
                  width={150}
                  height={50}
                  className="mb-6 object-contain"
                  data-ai-hint={registry.hint}
                />
                <Button
                  asChild
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full"
                >
                  <a
                    href={registry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Registry
                  </a>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
