import Overlay from "@/components/Overlay";
import { RESUME_URL } from "@/lib/site";

type ResumeOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

/** Resume viewer. Embed URL preserved from the pre-redesign site. */
export default function ResumeOverlay({
  isOpen,
  onClose,
}: ResumeOverlayProps) {
  return (
    <Overlay
      isOpen={isOpen}
      onClose={onClose}
      label="Edison Malasan resume"
      caption={
        <>
          <span className="text-accent">cat</span> resume.pdf
        </>
      }
    >
      <iframe
        src={RESUME_URL}
        title="Edison Malasan resume"
        className="h-full w-full border-0 bg-white"
        loading="lazy"
      />
    </Overlay>
  );
}
