import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { ReactNode } from "react";
import "./vizualize.css"

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'hsl(222.2 84% 4.9%)' }}>
      {children}
    </div>
  );
};

export default DashboardLayout;