"use client";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const rsvpFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  attending: z.enum(["yes", "no"], {
    required_error: "Please select an option.",
  }),
  guestCount: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

export default function RsvpFormSection() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof rsvpFormSchema>>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      guestCount: "1",
      dietaryRestrictions: "",
    },
  });

  const isAttending = form.watch("attending") === "yes";

  async function onSubmit(values: z.infer<typeof rsvpFormSchema>) {
    try {
      await addDoc(collection(db, "rsvps"), values);
      toast({
        title: "RSVP Submitted!",
        description:
          "Thank you for your response. We can't wait to celebrate with you!",
      });
      form.reset();
    } catch (e) {
      console.error("Error adding document: ", e);
      toast({
        title: "Error",
        description: "There was an error submitting your RSVP. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <section id="rsvp" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto bg-card border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">
              <h2
                className="text-4xl md:text-5xl font-headline font-bold text-center text-foreground"
              >
                RSVP
              </h2>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-card-foreground/80 mb-8">
              Please respond by November 30, 2025
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attending"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Will you be attending?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Joyfully Accept
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Regretfully Decline
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {isAttending && (
                  <>
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select number of guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1</SelectItem>
                              <SelectItem value="2">2</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dietaryRestrictions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Dietary Restrictions or Allergies
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Let us know about any dietary needs..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <Button type="submit" className="w-full" size="lg">
                  Submit RSVP
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
