import {
  useRef,
  useState
} from "react";

import {
  Upload
} from "lucide-react";

import {
  useInstagramAnalyzer
} from "../hooks/useInstagramAnalyzer";

import UserList from "../components/lists/UserList";
import SettingRow from "../components/ui/SettingRow";



type MainTab =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending";



export default function Home(){


  const fileInput =
    useRef<HTMLInputElement>(null);



  const {
    analysis,
    loading,
    error,
    uploadZip
  } = useInstagramAnalyzer();



  const [activeTab,setActiveTab] =
    useState<MainTab>("followers");





  function openPicker(){

    fileInput.current?.click();

  }





  async function handleFile(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(file){

      await uploadZip(file);

    }

  }





  const tabs = [

    {
      id:"followers",
      title:"Followers",
      count:analysis?.followersCount ?? 0
    },

    {
      id:"following",
      title:"Following",
      count:analysis?.followingCount ?? 0
    },

    {
      id:"notFollowingBack",
      title:"Non ricambiano",
      count:analysis?.notFollowingBackCount ?? 0
    },

    {
      id:"pending",
      title:"Pending",
      count:analysis?.pendingRequests.length ?? 0
    }

  ] as const;





  function currentUsers(){

    if(!analysis)
      return [];


    switch(activeTab){

      case "followers":
        return analysis.followers;


      case "following":
        return analysis.following;


      case "notFollowingBack":
        return analysis.notFollowingBack;


      case "pending":
        return analysis.pendingRequests;


    }

  }







  return (

    <div className="
      space-y-5
      pb-10
    ">


      <div>

        <h1 className="
          text-2xl
          font-bold
        ">
          Instagram Insights
        </h1>


        <p className="
          text-sm
          text-gray-500
        ">
          Analisi account
        </p>

      </div>





      <div className="
        rounded-2xl
        bg-white/5
        border
        border-white/10
        p-1
      ">


        <div className="
          grid
          grid-cols-4
          gap-1
        ">


        {
          tabs.map(tab=>(


            <button

              key={tab.id}

              onClick={()=>
                setActiveTab(tab.id)
              }

              className={`
                rounded-xl
                py-3
                px-1
                text-xs
                transition

                ${
                  activeTab===tab.id
                  ?
                  "bg-white/15 text-white"
                  :
                  "text-gray-400"
                }

              `}

            >

              <div>
                {tab.title}
              </div>


              <div className="
                text-[11px]
                mt-1
              ">
                {tab.count}
              </div>


            </button>


          ))
        }


        </div>


      </div>







      <div className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      ">


        <UserList

          title=""

          users={currentUsers()}

        />


      </div>








      <div className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-2
      ">


        <p className="
          px-3
          pt-2
          pb-1
          text-xs
          uppercase
          text-gray-500
        ">
          Altri dati
        </p>



        <SettingRow

          title="Possibili inattivi"

          count={
            analysis?.inactiveCount ?? 0
          }

        />



        <SettingRow

          title="Richieste ricevute"

          count={
            analysis?.receivedRequests.length ?? 0
          }

        />



        <SettingRow

          title="Recently unfollowed"

          count={
            analysis?.recentlyUnfollowed.length ?? 0
          }

        />


      </div>








      <div className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-4
      ">


        <input

          ref={fileInput}

          hidden

          type="file"

          accept=".zip"

          onChange={handleFile}

        />


        <button

          onClick={openPicker}

          className="
            w-full
            rounded-xl
            py-3
            bg-gradient-to-r
            from-purple-500
            to-pink-500
            font-semibold
          "

        >

          <Upload
            size={18}
            className="inline mr-2"
          />

          {
            loading
            ?
            "Analisi..."
            :
            "Carica ZIP Instagram"
          }


        </button>



        {
          error &&
          <p className="
            mt-3
            text-sm
            text-red-400
          ">
            {error}
          </p>
        }


      </div>


    </div>

  );

}
