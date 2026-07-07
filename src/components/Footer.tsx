import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-gray-500">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="h-4 w-4 text-green-700" />
          <span className="font-semibold text-green-800">Sin Herbal</span>
        </div>
        <p>Herbal alami berkualitas untuk hidup sehat.</p>
        <p className="mt-1">&copy; {new Date().getFullYear()} Sin Herbal. All rights reserved.</p>
      </div>
    </footer>
  );
}
