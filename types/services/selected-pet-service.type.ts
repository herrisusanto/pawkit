import { Service, TimeSlot } from "@/api/graphql/API";

export type SelectedPetServiceType = {
  petId: string | null;
  serviceId: string | null;
  service?: Service;
  date?: string;
  timeSlot?: TimeSlot;
  addons: string[];
};
