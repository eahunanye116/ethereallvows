"use client";

import { useState, useEffect } from "react";
import { doc, onSnapshot, runTransaction, getFirestore } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExcitementCounter() {
  const [count, setCount] = useState(0);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "wedding", "clicks");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        setCount(doc.data().count);
      }
    });

    // Check local storage to see if the user has already clicked
    if (localStorage.getItem("hasClickedBell")) {
      setIsClicked(true);
    }


    return () => unsubscribe();
  }, []);

  const handleClick = async () => {
    if (isClicked) return;

    const docRef = doc(db, "wedding", "clicks");
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          transaction.set(docRef, { count: 1 });
        } else {
          const newCount = sfDoc.data().count + 1;
          transaction.update(docRef, { count: newCount });
        }
      });
      setIsClicked(true);
      localStorage.setItem("hasClickedBell", "true");
    } catch (e) {
      console.error("Transaction failed: ", e);
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
            className={`rounded-full transition-all duration-300 ${
              isClicked
                ? "bg-primary/80 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90"
            }`}
            disabled={isClicked}
          >
            <Bell className="w-6 h-6 mr-2" />
            {isClicked ? "Thanks!" : "I'm Excited!"}
          </Button>
          <div className="text-2xl font-bold text-foreground py-2 px-4 rounded-lg bg-card border-border/50">
            {count}
          </div>
        </div>
      </div>
    </section>
  );
}