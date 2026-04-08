import './globals.css';

export const metadata = {
  title: 'Nehama — Find Comfort',
  description: 'A guided life architecture experience. Real questions, a concrete plan, your story reflected through scripture.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#FEFCF9" />
      </head>
      <body>{children}</body>
    </html>
  );
}
