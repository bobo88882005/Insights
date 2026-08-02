import {
  ChevronRight
} from "lucide-react";


interface Props {

  title:string;

  count:number;

  active?:boolean;

  onClick?:()=>void;

}



export default function SettingRow({

  title,

  count,

  active = false,

  onClick

}:Props){


  return (

    <button

      onClick={onClick}

      className={`
        w-full
        flex
        items-center
        justify-between
        px-4
        py-3
        rounded-xl
        transition
        ${
          active
          ? "bg-white/10"
          : "hover:bg-white/5"
        }
      `}

    >


      <div className="
        flex
        items-center
        gap-3
      ">


        <span className="
          text-[15px]
          font-medium
          text-white
        ">
          {title}
        </span>


      </div>



      <div className="
        flex
        items-center
        gap-2
      ">


        <span className="
          text-xs
          px-2
          py-1
          rounded-full
          bg-white/10
          text-gray-300
        ">
          {count}
        </span>


        <ChevronRight
          size={16}
          className="
            text-gray-500
          "
        />


      </div>


    </button>

  );

}
