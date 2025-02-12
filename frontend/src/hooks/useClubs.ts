import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import axios from "../appComponents/axiosInstance";

interface Club {
  ClubID: number;
  ClubName: string;
  Description: string;
  Email:string,
  Members: Member[];
  HiringSession :HiringSession[]
}

interface Member {
  ClubID: number;
  Email: string; 
  FirstName: string;
  LastName: string;
  Role?: string;
  JoinDate?: string; 
  ProfileImageURL?: string;
}

interface HiringSession {
  SessionID: number;
  ClubID: number;
  Title: string;
  Description?: string;
  StartDate: Date;
  EndDate: Date;
  Club: Club; 
  Positions: HiringPosition[]; 
}

interface HiringPosition {
  PositionID: number;
  SessionID: number;
  Title: string;
  Description?: string;
  Spots: number;
  HiringSession: HiringSession; 
}


const fetchUsers = async (): Promise<Club[]> => {
  const { data } = await axios.get(
    "/api/clubs/getClubData",
  );
  return data;
};

export const useClubs = () => {
  return useQuery<Club[], Error>({
    queryKey: ["clubs"],
    queryFn: fetchUsers,
  });
};
