import { ReactNode, FC } from "react";
import Link from "next/link";

interface IMainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">Тестовое задание</header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">
        <Link
          href="https://t.me/iMiddle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-200 transition-colors duration-300"
        >
          @iMiddle
        </Link>
      </footer>
    </div>
  );
};
