import React, { FC } from "react";

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">Заголовок</header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4">Футер</footer>
    </div>
  );
};
