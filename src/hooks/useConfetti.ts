import { useContext } from "react";
import { ConfettiContext } from "../components/magicui/confetti"; // Adjust the path accordingly

export function useConfetti() {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error("useConfetti must be used within a ConfettiProvider");
  }
  return context;
}
