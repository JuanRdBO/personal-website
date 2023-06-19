import { parseISO, format } from "date-fns";

export default function DateFormatter({
  dateString,
  fontSize = "20px",
}: {
  dateString: string;
  fontSize?: string;
}) {
  if (!dateString) return <></>;

  const date = parseISO(dateString);
  return (
    <time dateTime={dateString} style={{ fontSize: fontSize }}>
      {format(date, "LLLL	d, yyyy")}
    </time>
  );
}
