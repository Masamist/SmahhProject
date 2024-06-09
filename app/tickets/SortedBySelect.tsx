import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 
export function SortedBySelect() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sorted By" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Alphabetic</SelectLabel>
          <SelectItem value="asc">Assending (A-Z)</SelectItem>
          <SelectItem value="disk">Descending (Z-A)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="CYBERSECURITY">Cybersecurity</SelectItem>
          <SelectItem value="NETWORK">NETWORK</SelectItem>
          <SelectItem value="IT">IT</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Date</SelectLabel>
          <SelectItem value="latest">Latest</SelectItem>
          <SelectItem value="old">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}