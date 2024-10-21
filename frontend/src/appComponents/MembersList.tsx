import { Icon12Hours } from '@tabler/icons-react'

function MembersList() {
    return (
        <div className="p-20">
            <div className="text-center mb-16">
                <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                    THE TEAM
                </p>
                <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Meet Our <span className="text-indigo-600">Team</span>
                </h3>
            </div>


            <div className="sm:grid grid-cols-2 md:grid-cols-4 col-gap-10 mx-auto">

                <div className="text-center">
                    <a href="#">
                        <img className="mb-3 rounded-xl mx-auto h-32 w-32" src="https://loremflickr.com/320/320/girl" /></a>

                    <a href="#" className="hover:text-indigo-500 text-gray-900 font-semibold">john doe</a>
                    <p className="text-gray-500 uppercase text-sm">Web Developer</p>

                    <div className="my-4 flex justify-center items-center">
                        <a href="#">
                            <svg className="mr-3" width="18px" height="18px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <g data-name="Layer 2">
                                    <g data-name="facebook">
                                        <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"></rect>
                                        <path
                                            d="M17 3.5a.5.5 0 0 0-.5-.5H14a4.77 4.77 0 0 0-5 4.5v2.7H6.5a.5.5 0 0 0-.5.5v2.6a.5.5 0 0 0 .5.5H9v6.7a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-6.7h2.62a.5.5 0 0 0 .49-.37l.72-2.6a.5.5 0 0 0-.48-.63H13V7.5a1 1 0 0 1 1-.9h2.5a.5.5 0 0 0 .5-.5z">
                                        </path>
                                    </g>
                                </g>
                            </svg></a>
                        <a href="#">
                            <Icon12Hours className="flex-shrink-0 w-5 h-5 text-neutral-700 dark:text-neutral-200" />


                        </a>

                        <a href="#">hello</a>


                    </div>

                </div>



            </div>


        </div >
    )
}

export default MembersList