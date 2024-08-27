import ClubCard from './ClubCard';
import { useClubs } from '../hooks/useClubs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function Clubs() {
  const { data: clubs, error, isLoading } = useClubs();

  if (isLoading) return <div className='min-h-screen px-6 py-12 bg-white'>
    <div className="pb-10 text-center">
      <h1 className="pb-4 text-3xl font-semibold">Our Clubs</h1>
      <p className="text-base text-slate-600">Explore the diverse range of clubs at our college and discover your passions.</p>
    </div>

    <div className="flex flex-1">
      <div className="flex flex-col flex-1 w-full h-full gap-2 p-2 bg-white md:p-10 rounded-tl-2xl border-neutral-200 dark:border-neutral-700 dark:bg-neutral-900">
        <div className="flex gap-8">
          {[...new Array(3)].map((_, index) => (
            <div
              key={`first-array-${index}`} // Ensure unique key
              className="relative w-full h-40 bg-gray-200 rounded-lg dark:bg-neutral-800 animate-pulse"
            >
              <button className="absolute px-4 py-2 text-sm font-bold transition-all duration-500 transform bg-white rounded-md text-slate-700 bottom-6 right-4 hover:scale-105">loading...</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  if (error) return <div>Error loading users: {error.message}</div>;

  console.log("club data: ")
  console.log(clubs)

  return (
    <div className="min-h-screen px-6 py-12 bg-white">
      {/* Heading 1 */}
      <div className="pb-10 text-center">
        <h1 className="pb-4 text-3xl font-semibold">Our Clubs</h1>
        <p className="text-base text-slate-600">Explore the diverse range of clubs at our college and discover your passions.</p>
      </div>
      {/* Clubs Grid */}
      <div className="z-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Club Box 1 */}
        {clubs?.map((club) => (
          <ClubCard key={club.ClubId} memberCount={club.Members.length} name={club.ClubName} description={club.Description} />
        ))}
      </div>
    </div >
  );
}
