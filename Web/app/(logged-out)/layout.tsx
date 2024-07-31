"use client";
// app/layout.tsx
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";
import { Provider } from "react-redux";
import store from "../../redux/store";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <Provider store={store}>
      <div className="flex flex-col gap-5 min-h-screen items-center justify-center p-24">
        {children}
      </div>
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </Provider>
  );
}
