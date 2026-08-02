import { ReactNode } from "react";
import {
  Home,
  Users,
  BarChart3,
  Settings
} from "lucide-react";


interface Props {
  children: ReactNode;
}


export default function AppLayout({
  children
}: Props) {


  return (
    <div className="min-h-screen bg-black text-white">

      <div className="
        fixed
        inset-0
        bg-gradient-to-br
        from-purple-900/30
        via-black
        to-pink-900/30
        -z-10
      " />


      <header className="
        p-4
        border-b
        border-white/10
        flex
        items-center
        justify-between
      ">

        <h1 className="
          text-xl
          font-bold
          bg-gradient-to-r
          from-purple-400
          via-pink-500
          to-orange-400
          bg-clip-text
          text-transparent
        ">
          Insights
        </h1>


        <nav className="
          flex
          gap-4
          text-gray-300
        ">

          <Home size={20}/>
          <Users size={20}/>
          <BarChart3 size={20}/>
          <Settings size={20}/>

        </nav>

      </header>


      <main className="
        p-4
        max-w-6xl
        mx-auto
      ">
        {children}
      </main>


    </div>
  );
}
