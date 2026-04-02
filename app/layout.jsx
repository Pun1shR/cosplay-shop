export const metadata = {
  title: "House of Purplepaw",
  description: "Find the best foam, paints, fabric, and crafting supplies for your next cosplay.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
