import { MagicCard } from "@/components/magicui/magic-card";
import NumberTicker from "@/components/magicui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import Meteors from "@/components/magicui/meteors";

const Demo = () => {
   return (
      <div className='min-h-screen bg-blackbg'>
         <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-blackbg md:shadow-xl">
            <Meteors number={40} />
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
               Meteors
            </span>
         </div>
         <div
            className={
               "flex h-[500px] w-1/2 flex-col gap-4 lg:h-[250px] lg:flex-row"
            }
         >
            <MagicCard
               className="bg-black text-white cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
               gradientColor="#262626"
            >
               Magic
            </MagicCard>
            <MagicCard
               className="bg-black text-white cursor-pointer flex-col items-center justify-center shadow-2xl whitespace-nowrap text-4xl"
               gradientColor="#262626"
            >
               Card
            </MagicCard>
         </div>
         <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker className="text-white" value={79} />
         </p>
         <div className="f pl-8 flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>{" "}
         <div className=" pl-8 mt-6 flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>
      </div>
   )
}

export default Demo