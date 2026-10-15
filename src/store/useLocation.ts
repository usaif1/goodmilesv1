import { create } from 'zustand';
import { CITIES, DETECTED_CITY_ID, type City } from '@/mocks';

type State = {
  cityId: string;
  setCity: (cityId: string) => void;
};

export const useLocation = create<State>()(set => ({
  cityId: DETECTED_CITY_ID,
  setCity: cityId => set({ cityId }),
}));

export const cityName = (cityId: string): string =>
  CITIES.find((c: City) => c.id === cityId)?.name ?? '';
