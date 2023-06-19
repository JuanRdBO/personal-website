export default function PostTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1
      className="display-5 mb-4 text-center"
      style={{ color: "#362338", fontSize: "2rem", fontWeight: "bold" }}
    >
      {children}
    </h1>
  );
}
