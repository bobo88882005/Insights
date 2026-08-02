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





type Section =
  | "followers"
  | "following"
  | "notFollowingBack"
  | "pending"
  | "inactive"
  | "received"
  | "recently";







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




  const [section,setSection] =
    useState<Section>("followers");






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







  function getUsers(){


    if(!analysis)
      return [];



    switch(section){


      case "followers":

        return analysis.followers;


      case "following":

        return analysis.following;


      case "notFollowingBack":

        return analysis.notFollowingBack;


      case "pending":

        return analysis.pendingRequests;


      case "inactive":

        return analysis.possibleInactive;


      case "received":

        return analysis.receivedRequests;


      case "recently":

        return analysis.recentlyUnfollowed;


      default:

        return [];

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
          tracking-tight
        ">
          Instagram Insights
        </h1>


        <p className="
          text-sm
          text-gray-400
          mt-1
        ">
          Analisi account
        </p>

      </div>







      <div className="
        rounded-2xl
        overflow-hidden
        bg-[#1c1c1e]
        divide-y
        divide-white/5
      ">


        <SettingRow

          title="Followers"

          count={
            analysis?.followersCount ?? 0
          }

          onClick={()=>
            setSection("followers")
          }

        />



        <SettingRow

          title="Following"

          count={
            analysis?.followingCount ?? 0
          }

          onClick={()=>
            setSection("following")
          }

        />



        <SettingRow

          title="Non ricambiano"

          count={
            analysis?.notFollowingBackCount ?? 0
          }

          onClick={()=>
            setSection("notFollowingBack")
          }

        />



        <SettingRow

          title="Pending requests"

          count={
            analysis?.pendingRequests.length ?? 0
          }

          onClick={()=>
            setSection("pending")
          }

        />



      </div>







      <div className="
        rounded-2xl
        overflow-hidden
        bg-[#141416]
        divide-y
        divide-white/5
      ">


        <div className="
          px-4
          py-2
          text-xs
          text-gray-500
          uppercase
          tracking-wide
        ">
          Altri dati
        </div>




        <SettingRow

          title="Possibili inattivi"

          count={
            analysis?.inactiveCount ?? 0
          }

          muted

          onClick={()=>
            setSection("inactive")
          }

        />




        <SettingRow

          title="Richieste ricevute"

          count={
            analysis?.receivedRequests.length ?? 0
          }

          muted

          onClick={()=>
            setSection("received")
          }

        />




        <SettingRow

          title="Recently unfollowed"

          count={
            analysis?.recentlyUnfollowed.length ?? 0
          }

          muted

          onClick={()=>
            setSection("recently")
          }

        />



      </div>







      <div className="
        rounded-2xl
        bg-[#1c1c1e]
        p-4
      ">


        <input

          ref={fileInput}

          type="file"

          accept=".zip"

          hidden

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
            via-pink-500
            to-orange-400
            font-semibold
            active:scale-95
            transition
          "

        >

          <div className="
            flex
            items-center
            justify-center
            gap-2
          ">

            <Upload size={18}/>

            {
              loading
              ?
              "Analisi..."
              :
              "Carica ZIP Instagram"
            }

          </div>


        </button>




        {
          error &&
          (

            <p className="
              text-red-400
              text-sm
              mt-3
            ">
              {error}
            </p>

          )
        }



      </div>







      {
        analysis &&
        (

          <div>


            <h2 className="
              text-sm
              text-gray-400
              mb-2
            ">

              {
                section === "notFollowingBack"
                ?
                "Non ricambiano"
                :
                section
              }

            </h2>



            <UserList

              title=""

              users={
                getUsers()
              }

              showDate={
                section === "followers" ||
                section === "following"
              }

            />


          </div>

        )
      }




    </div>

  );

}
