'use client'
import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden relative">
      <Image
        src="/try.png"
        alt="Page"
        layout="responsive"
        width={1920}  
        height={480}  
        className="object-cover w-full h-[25vh]"  
      />

    </div>
  );
}
