"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, runTransaction, increment, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExcitementCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const docRef = doc(db, "wedding", "clicks");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setCount(doc.data().count);
      } else {
        // If the document doesn't exist, create it.
        setDoc(docRef, { count: 0 });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    const docRef = doc(db, "wedding", "clicks");
    try {
      // Use atomic increment operation
      await updateDoc(docRef, {
        count: increment(1),
      });
    } catch (e) {
      console.error("Increment failed: ", e);
      // Fallback for if the document doesn't exist, though the snapshot listener should handle it.
      if ((e as any)?.code === 'not-found') {
        await setDoc(docRef, { count: 1 });
      }
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-headline font-bold mb-4 text-foreground">
          Show Your Excitement!
        </h3>
        <p className="text-foreground/80 mb-6">
          Click the bell to let us know you're excited to celebrate with us!
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={handleClick}
            size="lg"
            className="rounded-full transition-all duration-300 bg-primary hover:bg-primary/90"
          >
            <Bell className="w-6 h-6 mr-2" />
            I'm Excited!
          </Button>
          <div className="text-2xl font-bold text-foreground py-2 px-4 rounded-lg bg-card border-border/50">
            {count}
          </div>
        </div>
      </div>
    </section>
  );
}
