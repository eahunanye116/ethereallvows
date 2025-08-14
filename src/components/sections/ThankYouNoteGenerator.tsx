"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { generateNoteAction } from "@/app/actions";
import { Loader2, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const noteGeneratorSchema = z.object({
  guestName: z.string().min(2, { message: "Please enter your name." }),
  relationshipToCouple: z
    .string()
    .min(2, { message: "Please describe your relationship." }),
  giftDescription: z
    .string()
    .min(5, { message: "Please describe your gift." }),
});

export default function ThankYouNoteGenerator() {
  const [generatedNote, setGeneratedNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof noteGeneratorSchema>>({
    resolver: zodResolver(noteGeneratorSchema),
    defaultValues: {
      guestName: "",
      relationshipToCouple: "",
      giftDescription: "",
    },
  });

  async function onSubmit(values: z.infer<typeof noteGeneratorSchema>) {
    setIsLoading(true);
    setError(null);
    setGeneratedNote("");
    const result = await generateNoteAction(values);
    setIsLoading(false);

    if (result.success) {
      setGeneratedNote(result.note!);
    } else {
      setError(result.error!);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNote);
    toast({
      description: "Note copied to clipboard!",
    });
  };

  return (
    <section id="thank-you" className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto bg-background border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              <h2
                className="text-4xl md:text-5xl font-headline font-bold text-center mb-2"
                style={{ color: "hsl(var(--secondary))" }}
              >
                Thank You Note Helper
              </h2>
            </CardTitle>
            <CardDescription className="text-center">
              Struggling with words? Let us help you craft a thank you note for
              the happy couple.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="guestName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jane Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="relationshipToCouple"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Relationship to the Couple</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Friend of Rose, Kim's cousin"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="giftDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gift Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., The beautiful crystal vase"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Generate Note
                </Button>
              </form>
            </Form>
          </CardContent>
          {(isLoading || generatedNote || error) && (
            <CardFooter className="flex-col items-start gap-4">
              {isLoading && (
                <div className="w-full text-center flex items-center justify-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Generating your personal note...</span>
                </div>
              )}
              {error && <p className="text-destructive">{error}</p>}
              {generatedNote && (
                <div className="w-full p-4 border rounded-md bg-muted/50 relative">
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {generatedNote}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          )}
        </Card>
      </div>
    </section>
  );
}
