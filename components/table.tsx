import { ILaunch } from '@/models';
import ScrambleTextEffect from "@/components/typingScrambleEffect";

interface TableProps {
  data: ILaunch[];
}

export default function Table({ data }: TableProps) {
  return (
    <div className="grid w-full md:gap-y-4 text-[0.8rem]">
      {/* Header */}
      <div className="hidden font-bold md:pb-6 md:grid md:grid-cols-[1fr__190px_100px_150px] lg:grid-cols-[1fr_200px_100px_160px_60px_65px] text-left uppercase">
        <span>Mission name</span>
        <span>Mission type</span>
        <span>Date</span>
        <span>Rocket</span>
        <span className="hidden lg:block">Status</span>
        <span className="hidden lg:block">Orbit</span>
      </div>

      {/* Rows */}
      {data.map((item, index) => (
        <ScrambleTextEffect key={index}>
          <div className="grid grid-cols-[1fr] mb-4 md:mb-0 text-right md:text-left md:grid md:grid-cols-[1fr__190px_100px_150px] lg:grid-cols-[1fr_200px_100px_160px_60px_65px] md:gap-0 gap-y-2 md:items-center">
            <span data-label="Mission name" className="before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {item.mission_name}
            </span>
            <span data-label="Mission type" className="before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {item.mission_type}
            </span>
            <span data-label="Launch date" className="before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {(new Date(item.net)).toLocaleDateString('en-US')}
            </span>
            <span data-label="Rocket" className="before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {item.rocket}
            </span>
            <span data-label="Status" className="hidden lg:block before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {item.status}
            </span>
            <span data-label="Orbit" className="hidden lg:block before:content-[attr(data-label)] before:mr-4 before:float-left before:uppercase before:font-bold md:before:content-none">
              {item.orbit}
            </span>
          </div>
        </ScrambleTextEffect>
      ))}
    </div>
  );
}
