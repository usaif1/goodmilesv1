import { create } from 'zustand';
import { DEFAULT_VEHICLE, type Vehicle } from '@/mocks';

type State = {
  vehicle: Vehicle;
  setVehicle: (vehicle: Vehicle) => void;
};

/** The car the whole catalogue is priced against. */
export const useVehicle = create<State>()(set => ({
  vehicle: DEFAULT_VEHICLE,
  setVehicle: vehicle => set({ vehicle }),
}));

/** "Maruti Suzuki Swift - Petrol", as C05 shows it. */
export const vehicleLabel = (v: Vehicle) => `${v.make} ${v.model} · ${v.fuel}`;

/** "Swift Petrol", the short form on C08, C10 and C16. */
export const vehicleShort = (v: Vehicle) => `${v.model} ${v.fuel}`;
