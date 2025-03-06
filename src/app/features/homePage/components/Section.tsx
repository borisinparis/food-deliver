import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  
  
export const Section =() => {
    return (
        <>
        <Image
      src="/BG.png"
      width={2000}
      height={2000}
      alt="Picture of the author"
    />
    <div className='bg-gray-800 px-5'>
    <h1 className='text-xl text-white'>Categories</h1>
    <Carousel className='text-white'>
  <CarouselContent>
    <CarouselItem>1</CarouselItem>
    <CarouselItem>2</CarouselItem>
    <CarouselItem>3</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>


    </div>
        
        </>
    )
}
export default Section