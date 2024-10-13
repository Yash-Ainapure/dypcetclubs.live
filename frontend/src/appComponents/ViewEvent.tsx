import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';



const ViewEvent = () => {
  const { id } = useParams<{ id: string }>();
  const [eventData, setEventData] = useState<any>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosInstance.get(`/api/events/getSingleEventData?EventID=${id}`);
        console.log('Event data:', response.data);
        setEventData(response.data);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);
  if (eventData === null) return <div>Loading...</div>
  return (
    <div className='rounded-tl-2xl p-2 w-full min-h-screen bg-emerald-500'>
      <button onClick={() => {
        navigate('/clubAdmin/events')
      }} className='absolute top-6 right-8 p-2 bg-white text-black font-semibold rounded-md block'>{"<-- Back"}</button>

      ViewEvent
      <p>ID:{eventData.EventID}</p>
      <p> name: {eventData.EventName}</p>
      <p>Description: {eventData.Description}</p>
      <p>Location: {eventData.Location}</p>
    </div>
  )
}

export default ViewEvent