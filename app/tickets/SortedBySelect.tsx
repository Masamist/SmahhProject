import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search } from '@/interface/search'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

 
export function SortedBySelect({searchParams}: Search) {
  const router = useRouter()

  const handleValueChange = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('sortedBy', value)
    router.push(`?${newSearchParams.toString()}`)
    router.refresh()
  };
  
  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sorted By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Alphabetic</SelectLabel>
          <SelectItem value="asc">Assending (A-Z)</SelectItem>
          <SelectItem value="desc">Descending (Z-A)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Date</SelectLabel>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectGroup>
        {/* <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
          <SelectItem value="network">Network</SelectItem>
          <SelectItem value="data">Data</SelectItem>
          <SelectItem value="IT">IT</SelectItem>
        </SelectGroup> */}
      </SelectContent>
    </Select>
  )
}