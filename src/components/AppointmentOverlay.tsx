import Overlay from "@/components/Overlay";
import { APPOINTMENT_URL } from "@/lib/site";

type AppointmentOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

/** Booking overlay. Embed URL preserved from the pre-redesign site. */
export default function AppointmentOverlay({
  isOpen,
  onClose,
}: AppointmentOverlayProps) {
  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      label="Book an appointment"
      caption={
        <>
          <span className="text-accent">exec</span> schedule_meeting.sh
        </>
      }
    >
      <iframe
        src={APPOINTMENT_URL}
        title="Book an appointment with Edison Malasan"
        className="h-full w-full border-0 bg-white"
        loading="lazy"
      />
    </Overlay>
  );
}
