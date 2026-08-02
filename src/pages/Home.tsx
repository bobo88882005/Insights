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



export default function Home() {


  const fileInput =
    useRef<HTMLInputElement>(null);


  const {
    analysis,
    loading,
    error,
    uploadZip
  } = useInstagramAnalyzer();



  const [activeTab, setActiveTab] =
    useState<MainTab>("followers");





  function openPicker() {

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





  const tabs = [

    {
      id: "followers",
      title: "Followers",
      count:
        analysis?.followersCount ?? 0
    },


    {
      id: "following",
      title: "Following",
      count:
        analysis?.followingCount ?? 0
    },


    {
      id: "notFollowingBack",
      title: "Non ricambiano",
      count:
        analysis?.notFollowingBackCount ?? 0
    },


    {
      id: "pending",
      title: "Pending",
      count:
        analysis?.pendingRequests.length ?? 0
    }

  ] as const;






  function currentUsers() {


    if (!analysis)
      return [];



    switch (activeTab) {


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

    <div
      className="
        space-y-5
        pb-10
      "
    >




      <div>

        <h1
          className="
            text-2xl
            font-bold
            tracking-tight
          "
        >
          Instagram Insights
        </h1>


        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Analisi followers e following
        </p>

      </div>








      <div
        className="
          rounded-2xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          p-1
        "
      >


        <div
          className="
            grid
            grid-cols-4
            gap-1
          "
        >


          {
            tabs.map(tab => (

              <button

                key={tab.id}

                onClick={() =>
                  setActiveTab(tab.id)
                }


                className={`
                  rounded-xl
                  py-3
                  text-[11px]
                  transition-all

                  ${
                    activeTab === tab.id

                    ?

                    "
                    bg-white/15
                    text-white
                    "

                    :

                    "
                    text-gray-400
                    "

                  }

                `}

              >

                <div>
                  {tab.title}
                </div>


                <div
                  className="
                    mt-1
                    opacity-70
                  "
                >
                  {tab.count}
                </div>


              </button>

            ))
          }


        </div>


      </div>









      <div

        key={activeTab}

        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-4
          animate-ios-in
        "

      >

        <UserList

          title=""

          users={
            currentUsers()
          }

        />

      </div>









      <div

        className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          p-2
        "

      >



        <p
          className="
            px-3
            py-2
            text-[11px]
            uppercase
            tracking-wider
            text-gray-500
          "
        >
          Secondari
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









      <div

        className="
          rounded-2xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-4
        "

      >


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
            transition
            active:scale-95
          "

        >

          <Upload
            size={18}
            className="
              inline
              mr-2
            "
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

          <p
            className="
              mt-3
              text-sm
              text-red-400
            "
          >
            {error}
          </p>

        }


      </div>



    </div>

  );

}
