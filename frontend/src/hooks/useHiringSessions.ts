import { useQuery } from "@tanstack/react-query";
import axios from "../appComponents/axiosInstance";

interface HiringSession {
  SessionID: number;
  ClubID: number;
  Title: string;
  Description?: string;
  StartDate: Date;
  EndDate: Date;
  Positions: HiringPosition[];
}

interface HiringPosition {
  PositionID: number;
  SessionID: number;
  Title: string;
  Description?: string;
  Spots: number;
}

const fetchHiringSessions = async (): Promise<HiringSession[]> => {
  const { data } = await axios.get("/api/hiring/hiringSessions/all");
  return data;
};

export const useHiringSessions = () => {
  return useQuery<HiringSession[], Error>({
    queryKey: ["hiringSessions"],
    queryFn: fetchHiringSessions,
  });
};
