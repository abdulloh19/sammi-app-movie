import { IMovie } from "@/interfaces/app.interface";
import { create } from "zustand";

interface InfoState {
  modal: boolean;
  CurrentMovie: IMovie;
  setModal: (bool: boolean) => void;
  setCurrentMovie: (movie: IMovie) => void;
}
export const UseInfoStore = create<InfoState>()((set) => ({
  modal: false,
  CurrentMovie: {} as IMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setCurrentMovie: (movie: IMovie) =>
    set((state) => ({ ...state, CurrentMovie: movie })),
}));
