import { IMovie } from "@/interfaces/app.interface";
import { create } from "zustand";

interface InfoState {
  modal: boolean;
  movies: IMovie;
  setModal: (bool: boolean) => void;
  setMovie: (movies: IMovie) => void;
}
export const UseInfoStore = create<InfoState>()((set) => ({
  modal: false,
  movies: {} as IMovie,
  setModal: (bool: boolean) => set((state) => ({ ...state, modal: bool })),
  setMovie: (movies: IMovie) => set((state) => ({ ...state, movies: movies })),
}));
