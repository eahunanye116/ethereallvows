import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.postimg.cc/htjxgCbx/Be-Funky-collage.jpg"
          alt="Rose and Kim Young Wookk"
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          data-ai-hint="wedding couple romance"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>
      <div className="relative z-10 flex flex-col items-center p-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-extrabold tracking-tight">
          <span
            className="block text-secondary-foreground"
          >
            Rose
          </span>
          <span className="block text-4xl md:text-6xl text-primary-foreground my-4">
            &
          </span>
          <span
            className="block text-secondary-foreground"
          >
            Kim Young Wookk
          </span>
        </h1>
        <p className="mt-8 text-xl md:text-2xl font-light text-primary-foreground/80">
          ARE GETTING MARRIED
        </p>
        <p className="mt-4 text-2xl md:text-3xl font-headline font-semibold text-primary">
          DECEMBER 24, 2025
        </p>
      </div>
    </section>
  );
}
