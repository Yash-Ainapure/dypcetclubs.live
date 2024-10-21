import React, { useEffect, useState } from "react";
import axios from "../appComponents/axiosInstance";
import { useParams } from "react-router-dom";

// Define interfaces
interface Member {
  MemberID: number;
  ClubID: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Role: string;
  JoinDate: string;
  ProfileImageURL: string;
}

interface Club {
  ClubID: number;
  ClubName: string;
  Description: string;
  FoundedDate: string;
  Email: string;
  LogoURL: string;
  Members: Member[];
}

interface FilteredMembers {
  [role: string]: Member[];
}

const ClubDetails: React.FC = () => {
  const { clubId } = useParams<{ clubId: string }>();
  const [club, setClub] = useState<Club | null>(null);
  const [filteredMembers, setFilteredMembers] = useState<FilteredMembers>({});

  useEffect(() => {
    const fetchClubDetails = async () => {
      try {
        const response = await axios.get(`/api/clubs/${clubId}`);
        setClub(response.data);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClubDetails();
  }, [clubId]);

  useEffect(() => {
    if (club?.Members) {
      const filteredMembers1: FilteredMembers = {};
      club.Members.forEach((member) => {
        if (!filteredMembers1[member.Role]) {
          filteredMembers1[member.Role] = [member];
        } else {
          filteredMembers1[member.Role].push(member);
        }
      });
      setFilteredMembers(filteredMembers1);
    }
  }, [club?.Members]);

  if (!club) return <div className="text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6 h-[60vh] bg-black">
          <img
            src={club.LogoURL}
            alt={`${club.ClubName} Logo`}
            className="w-32 h-32 rounded-full mb-4"
          />
          <h1 className="text-4xl font-bold text-white">{club.ClubName}</h1>
          <p className="text-lg text-white mt-2">{club.Description}</p>
          <p className="text-sm text-white">Founded on: {new Date(club.FoundedDate).toLocaleDateString()}</p>
          <p className="text-sm text-white">Contact: <a href={`mailto:${club.Email}`} className="text-blue-500">{club.Email}</a></p>
        </div>
        {
          Object.entries(filteredMembers).map(([role, members]) => {
            const name = role[0].toUpperCase() + role.slice(1);
            return (
              <div className="p-6" key={role}>
                <div className="text-center mb-16">
                  <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
                    {name} TEAM
                  </p>
                  <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
                    Meet Our <span className="text-indigo-600">Team</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {members.length > 0 ? (
                    members.map((member) => (
                      <div key={member.MemberID} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <img
                          src={member.ProfileImageURL}
                          alt={`${member.FirstName} ${member.LastName}`}
                          className="w-16 h-16 rounded-full mb-2"
                        />
                        <h3 className="text-lg font-bold">{`${member.FirstName} ${member.LastName}`}</h3>
                        <p className="text-sm text-gray-500">{member.Role}</p>
                        <p className="text-sm text-gray-500">Joined on: {new Date(member.JoinDate).toLocaleDateString()}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No members yet.</p>
                  )}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ClubDetails;
