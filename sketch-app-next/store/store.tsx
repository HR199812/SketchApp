import { SetStateAction } from "react";
import { create } from "zustand";

interface StoreState {
  toolType: string;
  setToolType: (state: string) => void;
  color: SetStateAction<string>;
  setColor: (state: SetStateAction<string>) => void;
  strokeWidth: number;
  setStrokeWidth: (state: number) => void;
  showMessageCard: boolean;
  setShowMessageCard: (state: boolean) => void;
  scaleValue: HTMLElement | null;
  setScaleValue: (state: HTMLElement | null) => void;
}

const useStore = create<StoreState>((set) => ({
  toolType: "pencil",
  setToolType: (state) => set({ toolType: state }),
  color: "#000000",
  setColor: (state) => set({ color: state }),
  strokeWidth: 1,
  setStrokeWidth: (state) => set({ strokeWidth: state }),
  showMessageCard: false,
  setShowMessageCard: (state) => set({ showMessageCard: state }),
  scaleValue: null,
  setScaleValue: (state) => set({ scaleValue: state }),
}));

export default useStore;
