export default function YouTube({ id, height, width }: { id: string; height?: string; width?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <iframe
        width={width || "100%"}
        height={height || "100%"}
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; modestbranding; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
