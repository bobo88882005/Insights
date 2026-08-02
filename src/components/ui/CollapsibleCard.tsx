import {
  ReactNode,
  useState
} from "react";

import {
  ChevronDown
} from "lucide-react";


interface Props {

  title: string;

  count: number;

  children: ReactNode;

}



export default function CollapsibleCard({

  title,

  count,

  children

}: Props) {


  const [open, setOpen] =
    useState(false);



  return (

    <div className="
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.06]
      backdrop-blur-xl
      shadow-lg
      transition-all
      duration-300
    ">



      <button

        onClick={() => setOpen(!open)}

        className="
          w-full
          flex
          items-center
          justify-between
          px-5
          py-4
          active:scale-[0.98]
          transition
        "

      >



        <div className="
          flex
          items-center
          gap-3
        ">



          <div className="
            rounded-full
            bg-white/10
            px-3
            py-1
            text-xs
            text-gray-300
          ">

            {count}

          </div>



          <span className="
            font-semibold
            text-base
          ">

            {title}

          </span>



        </div>





        <ChevronDown

          size={20}

          className={`
            text-gray-400
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}

        />



      </button>






      <div

        className={`
          grid
          transition-all
          duration-300
          ease-in-out
          ${
            open
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}

      >

        <div className="
          overflow-hidden
        ">


          <div className="
            border-t
            border-white/10
            px-5
            py-4
          ">

            {children}

          </div>



        </div>


      </div>



    </div>

  );

}
