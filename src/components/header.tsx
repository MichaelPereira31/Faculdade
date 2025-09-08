"use client";
import { BookOpen, Home, Info, LogOut, Mail, Menu, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useAuth } from "@/context/auth-context";

interface UserData {
  id: string;
  name: string;
  email: string;
  type: string;
}

export default function Header() {
  const { user, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    checkAuth();
  }, []);

  const checkAuth = () => {
    try {
      if (typeof window === "undefined") return;

      const userData = localStorage.getItem("user");
      const token = localStorage.getItem("accessToken");

      if (userData && token) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isMounted) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "accessToken") {
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isMounted]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiresAt");
    localStorage.removeItem("rememberMe");

    setUser(null);
    window.location.href = "/";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="h-8 w-32 animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-blue-600 transition-colors hover:text-blue-700"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800">
              <span className="text-sm font-semibold text-white">E</span>
            </div>
            <span className="hidden sm:block">EducaPlus</span>
          </Link>

          <nav className="hidden items-center space-x-8 lg:flex">
            <Link
              href="/"
              className="group flex items-center space-x-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <Home className="h-4 w-4" />
              <span>Início</span>
            </Link>

            <Link
              href="/sobre"
              className="group flex items-center space-x-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <Info className="h-4 w-4" />
              <span>Sobre</span>
            </Link>

            <Link
              href="/cursos"
              className="group flex items-center space-x-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <BookOpen className="h-4 w-4" />
              <span>Cursos</span>
            </Link>

            <Link
              href="/contato"
              className="group flex items-center space-x-1 font-medium text-gray-700 transition-colors hover:text-blue-600"
            >
              <Mail className="h-4 w-4" />
              <span>Contato</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isLoading ? (
              <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
            ) : user ? (
              <div className="hidden items-center space-x-4 md:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full border-2 border-transparent transition-all hover:border-blue-100"
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" alt={user.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-700 font-semibold text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-64 rounded-xl border border-gray-200 shadow-lg"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="border-b border-gray-100 p-4">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>

                    <div className="p-2">
                      {user.type === "ADMIN" && (
                        <DropdownMenuItem
                          asChild
                          className="cursor-pointer rounded-lg"
                        >
                          <Link
                            href="/administrador"
                            className="flex items-center space-x-2 p-2"
                          >
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-sm">
                              Painel Administrador
                            </span>
                          </Link>
                        </DropdownMenuItem>
                      )}
                    </div>

                    <DropdownMenuSeparator className="bg-gray-100" />

                    <div className="p-2">
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="cursor-pointer rounded-lg text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600"
                      >
                        <div className="flex items-center space-x-2 p-2">
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm font-medium">Sair</span>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden items-center space-x-3 md:flex">
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  <Link href="/autenticacao">Entrar</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
                >
                  <Link href="/autenticacao">Cadastrar</Link>
                </Button>
              </div>
            )}

            <Sheet>
              <SheetTrigger className="rounded-lg p-2 transition-colors hover:bg-gray-100 lg:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 border-l border-gray-200 sm:w-96"
              >
                <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>

                <div className="mt-8 space-y-6">
                  <nav className="space-y-4">
                    <Link
                      href="/"
                      className="flex items-center space-x-3 rounded-lg p-3 text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Início</span>
                    </Link>

                    <Link
                      href="/sobre"
                      className="flex items-center space-x-3 rounded-lg p-3 text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <Info className="h-5 w-5" />
                      <span className="font-medium">Sobre</span>
                    </Link>

                    <Link
                      href="/cursos"
                      className="flex items-center space-x-3 rounded-lg p-3 text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span className="font-medium">Cursos</span>
                    </Link>

                    <Link
                      href="/contato"
                      className="flex items-center space-x-3 rounded-lg p-3 text-gray-900 transition-colors hover:bg-gray-50"
                    >
                      <Mail className="h-5 w-5" />
                      <span className="font-medium">Contato</span>
                    </Link>
                  </nav>

                  {user ? (
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <div className="px-3">
                        <p className="text-sm font-semibold text-gray-900">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>

                      {user.type === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-3 rounded-lg p-3 text-gray-900 transition-colors hover:bg-gray-50"
                        >
                          <User className="h-5 w-5" />
                          <span className="font-medium">Painel Admin</span>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-3 rounded-lg p-3 text-red-600 transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sair</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 border-t border-gray-200 pt-6">
                      <Link
                        href="/autenticacao"
                        className="block w-full rounded-lg border-2 border-blue-600 px-4 py-3 text-center font-medium text-blue-600 transition-colors hover:bg-blue-50"
                      >
                        Entrar
                      </Link>
                      <Link
                        href="/autenticacao"
                        className="block w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-center font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-blue-800"
                      >
                        Cadastrar
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
