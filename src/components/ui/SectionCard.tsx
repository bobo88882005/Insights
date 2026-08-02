import { ReactNode } from "react";

interface Props {
  title: string;
  count?: number;
  children: ReactNode;
}


export default function SectionCard({
  title,
  count,
  children
}: Props) {

  return (

    <section className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      p-4
    ">

      <div className="
        flex
        justify-between
        items-center
        mb-4
      ">

        <h3 className="
          font-semibold
        ">
          {title}
        </h3>


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

      </div>


      {children}

    </section>

  );

}
