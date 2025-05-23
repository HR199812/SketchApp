import { SetStateAction } from "react";
import { create } from "zustand";

interface StoreState {
  toolType: string;
  setToolType: (state: string) => void;
  color: SetStateAction<string>;
  setColor: (state: SetStateAction<string>) => void;
  showMessageCard: boolean;
  setShowMessageCard: (state: boolean) => void;
  scaleValue: HTMLElement | null;
  setScaleValue: (state: HTMLElement | null) => void;
}

const useStore = create<StoreState>((set) => ({
  toolType: "",
  setToolType: (state) => set({ toolType: state }),
  color: "#000000",
  setColor: (state) => set({ color: state }),
  showMessageCard: false,
  setShowMessageCard: (state) => set({ showMessageCard: state }),
  scaleValue: null,
  setScaleValue: (state) => set({ scaleValue: state }),
}));

export default useStore;
