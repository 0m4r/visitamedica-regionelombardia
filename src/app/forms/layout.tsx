import "./print.css";

export default function FormsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="print-root">{children}</div>;
}
