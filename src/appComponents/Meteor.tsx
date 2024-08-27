import type { ComponentType } from "react"
import { motion } from "framer-motion"

const easing = "easeOut"
const repeat = Infinity

//change x and y to match your area where you want to display the effect
const x = 780
const y = 325

export function Meteor(Component): ComponentType {
   return (props) => {
      const getRandomValue = (min, max) => Math.random() * (max - min) + min

      const initialOpacity = getRandomValue(0.3, 1)
      const initialScale = getRandomValue(0.5, 1.4)
      const randomDuration = getRandomValue(5, 8)
      const randomDelay = getRandomValue(0.4, 6)

      return (
         <Component
            {...props}
            as={motion.div}
            initial={{
               opacity: initialOpacity,
               scale: initialScale,
               rotate: (Math.atan(y / x) * 180) / Math.PI,
            }}
            animate={{
               opacity: 0.2,
               x: [0, x],
               y: [0, y],
            }}
            transition={{
               duration: randomDuration,
               delay: randomDelay,
               repeat: repeat,
               ease: easing,
            }}
         />
      )
   }
}
