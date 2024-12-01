import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/buttonnew";
import { Separator } from "@radix-ui/react-separator";
import Link from "next/link";
import { ReactNode } from "react";




const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="flex h-16 items-center gap-2 border-b px-4 bg-gray-800 text-white sticky top-0 z-10">
        <Separator orientation="vertical" className="mr-2 h-4" />
        <div className="container mx-auto flex justify-between items-center">
          <div className="logo flex items-center space-x-[30px]">
            <img src="/logo.svg" alt="Logo" className="w-10" />
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 font-bold text-2xl">
              4FROG
            </h1>
          </div>

          <nav>
            <ul className="flex space-x-4">
              <li className="grid place-items-center"><Link href="/">Trang chủ</Link></li>
              <li className="grid place-items-center"><Link href="/about">Giới thiệu</Link></li>
              <li className="grid place-items-center"><Link href="/contact">Liên hệ</Link></li>
              <li className="grid place-items-center"><Link href="/vizualize">
                <CustomButton label="Mô phỏng"/>
              </Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Nội dung chính của trang (được truyền vào từ children) */}
      <main className="flex-1 p-4">{children}</main>

      {/* Footer nếu cần */}
      <footer className="bg-gray-900 z-9999 text-white text-center p-4">
        Footer Content
      </footer>
    </div>
  );
};

export default DashboardLayout;
