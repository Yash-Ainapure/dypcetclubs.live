import { Card, CardContent } from "@/components/magicui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Users, Award, Calendar, Zap } from 'lucide-react'
import {motion} from 'framer-motion'
import { Accordion,AccordionContent,AccordionItem, AccordionTrigger } from "@/components/magicui/accordion"
import { Input } from "@/components/magicui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


const About =()=>{

    const [email,setEmail]=useState('')
    const route= useNavigate()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        
        console.log('Signed up with:', email)
        setEmail('')
      }
    return(
        <div className="min-h-screen bg-gray-50 text-gray-800">

            <div className="relative bg-gray-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-gradient"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Welcome to DYPCET Clubs</h1>
                    <p className="text-xl mb-8">Where Passion Meets Purpose</p>
                    <Button 
                    onClick={()=>route('/')}
                    className="bg-white text-gray-900 hover:bg-gray-200">Explore Out Clubs</Button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

                <section className="mb-20"> 
                    <h2 className="text-3xl font-bold mb-6">Discover Your Community</h2>
                    <p className="text-lg text-gray-600 mb-8">
                     At DYPCET, we believe that education extends far beyond the classroom. Our vibrant club ecosystem is the heart of student life, offering a diverse array of opportunities for personal growth, skill development, and unforgettable experiences. Whether you're passionate about technology, arts, sports, or social causes, there's a place for you to thrive and make lasting connections.
                    </p>
                    <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
                        {[
                            { icon: Users, title: "50+ Active Clubs", desc: "Catering to diverse interests and passions" },
                            { icon: Award, title: "Leadership Opportunities", desc: "Develop crucial skills for your future career" },
                            { icon: Calendar, title: "200+ Annual Events", desc: "From workshops to competitions and social gatherings" },
                            { icon: Zap, title: "Innovation Hub", desc: "Where ideas come to life through collaborative projects" }
                        ].map((item,index)=>(
                            <motion.div 
                            key={index} 
                            className="bg-white rounded-lg border bg-card text-card-foreground shadow-sm"
                            initial={{scale:0}}
                            animate={{ rotate:360, scale:1}}
                            whileHover={{scale:1.04}}
                            transition={{
                                type:"spring",
                                stiffness:30,
                                damping:20
                            }}
                            >
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <item.icon className="w-12 h-12 text-gray-700 mb-4"/>
                                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.desc}</p>
                                </CardContent>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-6">Our Journey of Excellence</h2>
                    <div className="relative">
                        {[
                            { year: 2018, title: "Clubs Initiative Launched", desc: "DYPCET introduced the official clubs program" },
                            { year: 2019, title: "First Inter-College Tech Fest", desc: "Our tech clubs organized a successful regional event" },
                            { year: 2020, title: "Virtual Adaptation", desc: "Clubs seamlessly transitioned to online activities during the pandemic" },
                            { year: 2021, title: "National Recognition", desc: "DYPCET Robotics Club won the All India Robotics Challenge" },
                            { year: 2022, title: "Expansion and Growth", desc: "Number of active clubs doubled, reaching 50+" },
                            { year: 2023, title: "Community Impact Award", desc: "Recognized for outstanding community service initiatives" }
                        ].map((item,index)=>(
                            <div key={index} className={`flex ${index%2==0 ?'flex-row' :'flex-row-reverse'} items-center mb-8`}>
                                <div className="w-1/2 px-4">
                                    <motion.div 
                                    className="bg-white rounded-lg border bg-card text-card-foreground shadow-sm"
                                    initial={{x:index%2==0?-600:600,opacity:0}}
                                    animate={{x:0,opacity:1}}
                                    transition={{
                                        type:"spring",
                                        duration:5,
                                        ease:"easeInOut"

                                    }}
                                    whileHover={{
                                        scale:1.04,
                                    }}
                                    >
                                        <CardContent className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{item.year}:{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                        </CardContent>
                                    </motion.div>
                                </div>
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>
                        ))}
                        <div className="absolute top-0 bottom-0 left-1/2 -ml-px bg-gray-300 w-0.5"></div>
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-6">Voice of Community</h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            { name: "Priya Sharma", role: "President, Coding Club", quote: "Being part of the Coding Club has not only enhanced my technical skills but also opened doors to amazing internship opportunities." },
                            { name: "Rahul Desai", role: "Member, Environmental Club", quote: "Through our club initiatives, I've learned that even small actions can make a big difference in our community and environment." },
                            { name: "Ananya Patel", role: "Organizer, Cultural Fest", quote: "Organizing our annual cultural fest taught me invaluable lessons in teamwork, time management, and leadership." }
                        ].map((item,index)=>(
                            <motion.div 
                            key={index} 
                            className="bg-white rounded-lg border bg-card text-card-foreground shadow-sm"
                            initial={{ scale: 0.5, rotate: Math.random() * 180 - 90, opacity: 0 }}  
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}  
                            transition={{ duration: 1.5, ease: "easeInOut", delay: index * 0.2 }} 
                            whileHover={{scale:1.04}}
                            
                            >
                                <CardContent className="p-6">
                                    <p className="text-gray-600 mb-4">{item.quote}</p>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </CardContent>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="text-3xl font-bold mb-6">Frequently Asked  Questions</h2>
                    <Accordion type="single" collapsible>
                        {[
                            { question: "How can I join a club?", answer: "Joining a club is easy! Browse our list of clubs, find one that interests you, and reach out to the club leader or attend their next meeting. Most clubs welcome new members throughout the year." },
                            { question: "Can I start my own club?", answer: "If you have a unique idea for a club, gather a group of interested students and submit a proposal to the Student Activities Office. They'll guide you through the process of officially establishing your club." },
                            { question: "Are there any fees to join clubs?", answer: "Most clubs are free to join. Some specialized clubs may have minimal fees to cover equipment or event costs, but this information is always provided upfront." },
                            { question: "How much time commitment is required?", answer: "Time commitment varies by club and your level of involvement. Generally, clubs meet weekly or bi-weekly, with additional time for events or projects. You can always discuss expectations with club leaders." }
                        ].map((item,index)=>(
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger>{item.question}</AccordionTrigger>
                                <AccordionContent>{item.answer}</AccordionContent>

                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>

                <section className="mb-20">
                    <Card className="bg-gray-100">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
                            <p className="text-gray-600 mb-4">Subscribe to our newsletter for the latest updates on club activites, events, and acchievements</p>
                            <form onSubmit={handleSubmit} className="flex gap-4">
                                <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="flex-grow"
                                />
                                <Button type="submit">Subscribe</Button>
                            </form>
                        </CardContent>
                    </Card>
                </section>

                <section className="text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Embark on Your Club Journey</h2>
                    <p className="text-lg text-gray-600 mb-8"> 
                        Explore our diverse range of clubs, find your passion, and become part of our vibrant community today!
                    </p>
                    <Button 
                    onClick={()=>route('/')}
                    className="bg-gray-800 text-white hover:bg-gray-700">
                        Explore Clubs <ChevronRight className="ml-2"/>
                    </Button>

                </section>



            </div>
           
        </div>
    )
}

export default About