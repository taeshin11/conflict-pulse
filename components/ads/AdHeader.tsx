export default function AdHeader() {
  return (
    <div className="flex justify-center my-2">
      <div className="hidden md:flex items-center justify-center w-[728px] h-[90px] bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-sm">Advertisement 728×90</div>
      <div className="flex md:hidden items-center justify-center w-[320px] h-[50px] bg-gray-100 border border-dashed border-gray-300 text-gray-400 text-sm">Advertisement 320×50</div>
    </div>
  )
}
