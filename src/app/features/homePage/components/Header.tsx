import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
export const Header = () => {
    return (
        <>
        <div className="w-full px-5 flex items-center justify-between h-[68px] bg-black">
        <div className="flex">
        <Image
      src="/logo.png"
      width={50}
      height={50}
      alt="Picture of the author"
    />
    <div>
            <div className="flex">
                <div className="text-white">
                    Nom
                </div>
                <div className="text-red-700">
                    Nom
                </div>
            </div>
            <div className="text-white">
                Swift delivery
            </div>
            </div>

        </div>
        <div className='flex gap-[5px] w-[348px] h-36px'>

        <Button className='flex rounded-2xl w-[281px] h-[36px]' variant="outline">
        <Image
      src="/Location icon.png"
      width={20}
      height={20}
      alt="Picture of the author"
    />
            <div className='text-red-700'>
                Delivery address:
            </div>
            <div>
                Add Location
            </div>
            <Image
      src="/Vector (1).png"
      width={5}
      height={5}
      alt="Picture of the author"
    />

        </Button>

        <Button className='w-[36px] rounded-2xl h-[36px]' variant="outline">
        <Image
      src="/Vector (2).png"
      width={20}
      height={20}
      alt="Picture of the author"
    />
        </Button>
        <DropdownMenu>
  <DropdownMenuTrigger className='w-[36px] h-[36px] rounded-2xl bg-red-700'></DropdownMenuTrigger>
  <DropdownMenuContent >
    <DropdownMenuLabel>Test@gmail.com</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>sign out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>




    </div>
        </div>
        </>
    )
}
export default Header