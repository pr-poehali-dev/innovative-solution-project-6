import PhotoViewer from "@/components/ui/PhotoViewer";

export interface FleetLightboxData {
  src: string;
  alt: string;
  title: string;
  images?: string[];
  index?: number;
}

interface FleetLightboxProps {
  data: FleetLightboxData | null;
  onClose: () => void;
}

const FleetLightbox = ({ data, onClose }: FleetLightboxProps) => {
  const images = data?.images?.length ? data.images : data ? [data.src] : [];
  return (
    <PhotoViewer
      open={!!data}
      images={images}
      startIndex={data?.index ?? 0}
      title={data?.title}
      alt={data?.alt}
      onClose={onClose}
    />
  );
};

export default FleetLightbox;
