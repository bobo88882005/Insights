import {
  ChevronRight
} from "lucide-react";


interface Props {

  title:string;

  count:number;

  onClick?:()=>void;

}



export default function SettingRow({

  title,

  count,

  onClick

}:Props){


  return (

    <button

      onClick={onClick}

      className="
        w-full
        flex
        items-center
        justify-between
        px-3
        py-3
        rounded-xl
        transition
        active:bg-white/10
      "

    >



      <span
        className="
          text-[15px]
          text-white
        "
      >

        {title}

      </span>





      <div
        className="
          flex
          items-center
          gap-2
        "
      >



        <span

          className="
            min-w-[26px]
            text-center
            text-xs
            text-gray-300
            bg-white/10
            rounded-full
            px-2
            py-1
          "

        >

          {count}

        </span>




        <ChevronRight

          size={17}

          className="
            text-gray-500
          "

        />



      </div>



    </button>

  );

}
