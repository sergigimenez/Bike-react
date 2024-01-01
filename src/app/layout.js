import "../variables.scss";
import "@fontsource/roboto";
import "material-icons/iconfont/material-icons.css";
import "bootstrap/dist/css/bootstrap.css";
import { Providers } from "./StoreProvider";

export const metadata = {
  title: "My App",
  description: "My App is a...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
