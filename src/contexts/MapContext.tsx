import { createContext, useState } from "react";

type MapContextProviderProps = {
  children: React.ReactNode;
};

type MapContextProps = {
    rooms: Room[];
    addRoom: (room: Room) => void;
    desks: Desk[];
    addDesk: (desk: Desk) => void;
};

type Room = {
    x: number;
    y: number;
    length: number;
    width: number;
    name: string
}

type Desk = {
    x: number;
    y: number;
    length: number;
    width: number;
}

export const MapContext = createContext<MapContextProps>({
    rooms: [],
    addRoom: () => {},
    desks: [],
    addDesk: () => {}
});

export const MapContextProvider = (props: MapContextProviderProps) => {
    const [rooms, setRooms] = useState<Room[]>([])
    const [desks, setDesks] = useState<Desk[]>([])

    const addRoom = (room: Room) => {
        setRooms(prev => [...prev, room])
    }

    const addDesk = (desk: Desk) => {
        setDesks(prev => [...prev, desk])
    }

  return <MapContext.Provider 
  value={{
    rooms,
    addRoom,
    desks,
    addDesk
  }}
  >
    {props.children}
  </MapContext.Provider>;
};