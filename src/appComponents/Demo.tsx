import { MagicCard } from "@/components/magicui/magic-card";
import NumberTicker from "@/components/magicui/number-ticker";
import { Skeleton } from "@/components/ui/skeleton";
import Meteors from "@/components/magicui/meteors";
import { Meteor } from "./Meteor";

import { motion } from 'framer-motion';

// Define a basic component to apply the Meteor effect to
const BasicComponent = (props) => (
   <motion.div {...props} style={{ width: '50px', height: '4px', backgroundColor: '#bababa' }} />
);

// Wrap the BasicComponent with Meteor
const MeteorComponent = Meteor(BasicComponent);

const Demo = () => {
   return (
      <div className='min-h-screen bg-blackbg'>

         <div className="min-h-screen">
            <MeteorComponent />
         </div>

         <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-blackbg md:shadow-xl">
            <Meteors number={40} />
            <span className="text-5xl font-semibold leading-none text-center text-transparent whitespace-pre-wrap pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text md:text-8xl dark:from-white dark:to-slate-900/10">
               Meteors
            </span>
         </div>
         <div
            className={
               "flex h-[500px] w-1/2 flex-col gap-4 lg:h-[250px] lg:flex-row"
            }
         >
            <MagicCard
               className="flex-col items-center justify-center text-4xl text-white bg-black shadow-2xl cursor-pointer whitespace-nowrap"
               gradientColor="#262626"
            >
               Magic
            </MagicCard>
            <MagicCard
               className="flex-col items-center justify-center text-4xl text-white bg-black shadow-2xl cursor-pointer whitespace-nowrap"
               gradientColor="#262626"
            >
               Card
            </MagicCard>
         </div>
         <p className="font-medium tracking-tighter text-black whitespace-pre-wrap text-8xl dark:text-white">
            <NumberTicker className="text-white" value={79} />
         </p>
         <div className="flex flex-col pl-8 space-y-3 f">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>{" "}
         <div className="flex items-center pl-8 mt-6 space-x-4 ">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
               <Skeleton className="h-4 w-[250px]" />
               <Skeleton className="h-4 w-[200px]" />
            </div>
         </div>
      </div>
   )
}

export default Demo