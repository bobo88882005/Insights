import {
  Search
} from "lucide-react";


interface Props {

  value:string;

  onChange(
    value:string
  ):void;

}



export default function SearchInput({
  value,
  onChange
}:Props) {


  return (

    <div className="
      relative
      mb-3
    ">


      <Search
        size={16}
        className="
          absolute
          left-3
          top-3
          text-gray-500
        "
      />


      <input

        value={value}

        onChange={
          e =>
            onChange(
              e.target.value
            )
        }

        placeholder="Cerca username..."

        className="
          w-full
          rounded-lg
          bg-white/5
          border
          border-white/10
          py-2
          pl-9
          pr-3
          text-sm
          outline-none
          focus:border-pink-500
        "

      />


    </div>

  );

}
