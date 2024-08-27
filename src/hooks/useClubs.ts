import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Club {
  ClubId: number;
  ClubName: string;
  Description: string;
  Members:Member[];
}

interface Member {
  ClubId: number;
  Email: string; // Optional, use '?' for optional fields
  FirstName: string;
  LastName: string;
  Role?: string;
  JoinDate?: string; // You can use Date if you prefer to handle date as a Date object
  ProfileImageURL?: string;
}

const fetchUsers = async (): Promise<Club[]> => {
  const { data } = await axios.get("http://localhost:4000/getClubData");
  return data;
};

export const useClubs = () => {
  return useQuery<Club[], Error>({
    queryKey: ["clubs"],
    queryFn: fetchUsers,
  });
};
