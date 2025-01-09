import DarkModeToggle from "../ui/DarkModeToggle";

function Header() {
  return (
    <div className="h-12 flex items-center justify-center gap-x-4 bg-secondary-800 mb-6 sticky top-0">
      <DarkModeToggle />
      <h1 className="md:text-xl text-sm font-bold text-slate-300">
        Invertory App using Tailwind & React.js
      </h1>
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 border-2 border-slate-300 font-bold text-slate-300">
        0
      </span>
    </div>
  );
}

export default Header;
