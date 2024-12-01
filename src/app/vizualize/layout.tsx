import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: 'hsl(142.4 71.8% 29.2%)' }}>
      {children}
    </div>
  );
};

export default DashboardLayout;