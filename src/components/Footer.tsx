export default function Footer() {
  return (
    <footer className="bg-background border-t border-border/20 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-primary-foreground/60">
        <p
          className="text-2xl font-headline mb-2"
          style={{ color: "hsl(var(--secondary))" }}
        >
          Rose & Kim Young Wookk
        </p>
        <p>Thank you for being part of our special day.</p>
        <p className="mt-4 text-sm">
          &copy; {new Date().getFullYear()} Ethereal Vows. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
