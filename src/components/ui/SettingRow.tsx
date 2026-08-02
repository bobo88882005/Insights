import {
  ChevronRight
} from "lucide-react";


interface Props {

  title:string;

  count?:number;

  onClick?:()=>void;

  muted?:boolean;

}



export default function SettingRow({

  title,

  count,

  onClick,

  muted = false

}:Props) {


  return (

    <button

      onClick={onClick}

      className="
        w-full
        flex
        items-center
        justify-between
        px-4
        py-3
        text-left
        transition
        active:bg-white/10
      "

    >


      <span
        className={`
          text-[15px]
          font-medium
          ${
            muted
            ?
            "text-gray-400"
            :
            "text-white"
          }
        `}
      >

        {title}

      </span>





      <div className="
        flex
        items-center
        gap-2
      ">


        {
          count !== undefined &&
          (

            <span className="
              text-sm
              text-gray-400
            ">
              {count}
            </span>

          )
        }



        <ChevronRight

          size={18}

          className="
            text-gray-500
          "

        />


      </div>


    </button>

  );

}
