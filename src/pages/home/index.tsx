// pages/home/index.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Navbar from "@/components/ui/navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={`container mx-auto p-4`}>
        <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
        
        <Carousel className={`home-carousel w-full max-w-2xl mx-auto mb-8`}>
          <CarouselPrevious className="absolute left-0 z-10" />
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem className={`flex justify-center`} key={index}>
                <div className="p-1">
                  <Card className="shadow-lg">
                    <CardContent className={`flex aspect-square items-center justify-center p-6`}>
                      <span className="text-4xl font-semibold">Promo {index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="absolute right-0 z-10" />
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
