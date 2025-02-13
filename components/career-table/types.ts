import { Career } from "@/types/coach";
import { Transfer } from "@/types/transfers";

export interface CareerTableProps {
  coach?: boolean;
  career?: Career[];
  transfers?: Transfer[];
}
