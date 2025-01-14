import ScrambleTextEffect from '@/components/typingScrambleEffect';

export default function NotFound() {
  return (
    <ScrambleTextEffect>
      <div className='flex flex-col items-center justify-center text-center gap-4 h-fit text-red-500/80'>
        <h1 className='text-5xl sm:text-7xl md:text-9xl'>Not Found</h1>
        <p className='text-sm sm:text-xl'>Sorry! The dev pulled a &apos;half-baked hero&apos; move and stopped at the home page. Talk about commitment!</p>
      </div>
    </ScrambleTextEffect>
  )
}