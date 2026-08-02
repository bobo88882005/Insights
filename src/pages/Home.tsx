import {
  useRef
} from "react";

import {
  Users,
  UserMinus,
  UserX,
  Upload
} from "lucide-react";

import { useInstagramAnalyzer } from "../hooks/useInstagramAnalyzer";


export default function Home() {

  const fileInput =
    useRef<HTMLInputElement>(null);


  const {
    analysis,
    loading,
    error,
    uploadZip
  } =
    useInstagramAnalyzer();



  function openFilePicker() {

    fileInput.current?.click();

  }



  async function handleFile(
    event: React.ChangeEvent<HTMLInputElement>
  ) {

    const file =
      event.target.files?.[0];


    if (!file)
      return;


    await uploadZip(file);

  }



  return (

    <div className="space-y-6">


      <section>

        <h2 className="text-3xl font-bold">
          Instagram Insights
        </h2>

        <p className="text-gray-400 mt-2">
          Analizza followers e following dal tuo export Instagram.
        </p>

      </section>



      <section className="
        grid
        grid-cols-2
        md:grid-cols-4
        gap-4
      ">


        <StatCard
          title="Followers"
          value={
            analysis?.followersCount ?? 0
          }
          icon={<Users />}
        />


        <StatCard
          title="Following"
          value={
            analysis?.followingCount ?? 0
          }
          icon={<Users />}
        />


        <StatCard
          title="Non ricambiano"
          value={
            analysis?.notFollowingBackCount ?? 0
          }
          icon={<UserMinus />}
        />


        <StatCard
          title="Possibili inattivi"
          value={
            analysis?.inactiveCount ?? 0
          }
          icon={<UserX />}
        />


      </section>




      <section className="
        rounded-xl
        border
        border-white/10
        bg-white/5
        p-6
      ">


        <input
          ref={fileInput}
          type="file"
          accept=".zip"
          hidden
          onChange={handleFile}
        />


        <div className="
          flex
          flex-col
          items-center
          gap-4
        ">


          <Upload size={40}/>


          <h3 className="text-xl font-semibold">
            Carica il tuo export Instagram
          </h3>


          <button
            onClick={openFilePicker}
            className="
              px-5
              py-3
              rounded-full
              bg-gradient-to-r
              from-purple-500
              via-pink-500
              to-orange-400
              font-semibold
            "
          >

            {
              loading
                ? "Analisi..."
                : "Seleziona ZIP"
            }

          </button>


          {
            error &&
            (
              <p className="text-red-400">
                {error}
              </p>
            )
          }


        </div>


      </section>


    </div>

  );

}




function StatCard({
  title,
  value,
  icon
}: {
  title:string;
  value:number;
  icon:React.ReactNode;
}) {


  return (

    <div className="
      rounded-xl
      bg-white/5
      border
      border-white/10
      p-4
    ">


      <div className="
        text-pink-400
        mb-3
      ">
        {icon}
      </div>


      <div className="text-2xl font-bold">
        {value}
      </div>


      <div className="text-sm text-gray-400">
        {title}
      </div>


    </div>

  );

}
