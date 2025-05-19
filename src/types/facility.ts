
export interface HealthFacility {
  id: number;
  name: string;
  type: string;
  category: string;
  specialty: string[];
  coordinates: [number, number];
  address: string;
  phone: string;
  beds: number;
  doctors: number;
  services: string[];
  hasEmergency: boolean;
  hasBloodBank: boolean;
  languages: string[];
  imageUrl?: string; // Optional image URL
  status: string;    // Facility status (Open, Closed, etc.)
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

export interface FilterState {
  type: {
    hopital: boolean;
    clinique: boolean;
    centre: boolean;
  };
  specialty: {
    general: boolean;
    pediatrie: boolean;
    cardiologie: boolean;
    gynecologie: boolean;
    ophtalmologie: boolean;
  };
  services: {
    urgences: boolean;
    maternite: boolean;
    vaccination: boolean;
    bloodBank: boolean;
  };
  languages: {
    francais: boolean;
    anglais: boolean;
    peul: boolean;
    soussou: boolean;
    malinke: boolean;
  };
}
