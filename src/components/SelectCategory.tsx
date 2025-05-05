import * as React from "react"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectCategory() {
    const router = useRouter()
    const pathname = usePathname()
    const [selectedCategory, setSelectedCategory] = React.useState<string>("")
    
    // Reset selection when on root path
    React.useEffect(() => {
      if (pathname === '/') {
        setSelectedCategory("")
      }
    }, [pathname])
    
    const categories: string[] = [
        "General",
        "Health",
        "Science",
        "Sports",
        "Technology",
        "Politics",
      ];

  return (
    <div className='w-full bg-transparent'>
        <Select 
          value={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value)
            router.push(`/top-headlines/${value}`)
          }} 
        >
        <SelectTrigger className="bg-transparent dark:bg-darkprimary w-full text-white font-normal text-md select-none focus:outline-none focus-visible:ring-0 focus:border-0 border-0 focus:ring-0 cursor-pointer">
            <SelectValue className="text-white bg-transparent" placeholder="More" />
        </SelectTrigger>
        <SelectContent className="border-0 bg-darkprimary text-white">
            {categories.map((category, index) => (
                <SelectItem key={index} value={category} className="focus-within:bg-white/10 hover:bg-white/10 focus:bg-white/5 focus:text-white cursor-pointer"> 
                    <span className="flex gap-3 capitalize text-white">
                        {category}
                    </span>
                </SelectItem>
            ))}
        </SelectContent>
        </Select>
    </div>
  )
}
