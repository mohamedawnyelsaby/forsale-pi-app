"use client"

import { useState } from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CartSidebar } from './cart-sidebar';
import { initiatePiPayment } from '../lib/pi-network-integration';

interface HeaderProps {
  categories: string[];
}

export function Header({ categories }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handlePiPayment = () => {
    // مثال على استخدام وظيفة دفع باي نتورك
    initiatePiPayment(10, "Pi-Store Item", "12345");
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md dark:bg-gray-900 dark:shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {/* زر القائمة المنسدلة (للموبايل) */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          {/* شعار المتجر */}
          <a href="#" className="text-2xl font-bold text-gray-900 dark:text-white">
            متجر Pi
          </a>

          {/* قائمة التصفح (للدسك توب) */}
          <nav className="hidden md:flex space-x-4">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
              >
                {category}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* شريط البحث */}
          <div className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="search"
              placeholder="البحث عن منتجات..."
              className="w-[300px] pl-10"
            />
          </div>

          {/* زر Pi Network Payment - مثال */}
          <Button onClick={handlePiPayment} variant="default" className="bg-green-600 hover:bg-green-700 text-white">
            الدفع بـ Pi
          </Button>

          {/* زر سلة التسوق */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(true)}
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              3
            </span>
          </Button>
        </div>
      </div>

      {/* القائمة الجانبية (للموبايل) */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-3 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="البحث عن منتجات..."
                className="w-full pl-10"
              />
            </div>
            {categories.map((category) => (
              <a
                key={category}
                href={`#${category.toLowerCase()}`}
                className="block text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* السلة الجانبية */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}
