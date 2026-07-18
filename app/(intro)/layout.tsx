export default function IntroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="h-full">{children}</div>;
}
