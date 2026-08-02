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
      rounded-xl
      border
      border-white/10
      bg-white/5
    ">


      <button
        onClick={() => setOpen(!open)}
        className="
          w-full
          flex
          justify-between
          items-center
          p-4
        "
      >

        <div>

          <span className="
            font-semibold
          ">
            {title}
          </span>

          <span className="
            text-gray-400
            text-sm
            ml-2
          ">
            ({count})
          </span>

        </div>


        <ChevronDown
          className={`
            transition
            ${open ? "rotate-180" : ""}
          `}
        />

      </button>



      {
        open &&
        (
          <div className="
            border-t
            border-white/10
            p-4
          ">
            {children}
          </div>
        )
      }


    </div>

  );

}
