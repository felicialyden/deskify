import { MapContext } from "@/contexts/MapContext";
import { Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import RoomInfoForm from "./RoomInfoForm";
import { Button } from "./ui/button";


const BookDeskPopup = () => {
    const { focusElement, updateFocusElement, bookDesk, bookRoom } = useContext(MapContext)
    const [ popupHeight, setPopupHeight] = useState(0)
    const canvas = document.querySelector('#BookDeskStage')
    const offsetLeft = (canvas as HTMLDivElement)?.offsetLeft
    const offsetTop =  (canvas as HTMLDivElement)?.offsetTop
    const popupElement = document.querySelector('#bookDeskPopup') as HTMLDivElement

    useEffect(() => {
      if(popupElement){
        setPopupHeight(popupElement.offsetHeight)
      }
    }, [popupElement, focusElement])

    const handleBooking = () => {
      if(focusElement?.type === 'Room') {
        bookRoom(focusElement?.id)
      }
      if(focusElement?.type === 'Desk') {
        bookDesk(focusElement?.id)
      }
    }
  return (
    <div
    style={{
        position: "absolute",
        maxWidth: 180,
        top: (focusElement?.y || 10) + offsetTop - (popupHeight + 3),
        left: (focusElement?.x || 10) + offsetLeft,
        padding: "5px 5px",
        borderRadius: "3px",
        boxShadow: "0 0 3px grey",
        zIndex: 10,
        backgroundColor: "white",
      }}
      className={popupHeight? 'popup-visible' : 'popup-hidden'}
      id="bookDeskPopup"
    >
      <div className="flex flex-col gap-1">
      <p className="text-sm">{`${focusElement?.type} ${focusElement?.id}: `} <span className={focusElement?.booked? 'text-red-600': 'text-green-600'}>{focusElement?.booked? 'Booked': 'Available'}</span></p>
      {focusElement?.seats && <p className="text-xs"><span className="font-semibold">Number of seats:</span> {focusElement.seats}</p>}
      {focusElement?.additionalInfo && <p className="text-xs"><span className="font-semibold">Additional information:</span> {focusElement.additionalInfo}</p>}
      <div className="flex gap-2 justify-end">
      <Button className="mt-2" size='xs' variant='secondary' onClick={() => updateFocusElement(undefined)}>Close</Button>
      <Button disabled={focusElement?.booked? true : false} className="mt-2" size='xs' onClick={handleBooking}>Book</Button>
      </div>
      </div>
    </div>
  );
};

export default BookDeskPopup;
