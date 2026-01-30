interface VideoEmbedProps {
  youtubeId: string;
  title: string;
  className?: string;
}

export function VideoEmbed({ youtubeId, title, className = '' }: VideoEmbedProps) {
  return (
    <div className={`relative aspect-video rounded-lg overflow-hidden ${className}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
