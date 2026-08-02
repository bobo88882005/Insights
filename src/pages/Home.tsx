import {
  useRef,
  useState
} from "react";

import {
  Upload,
  Users,
  UserMinus,
  Clock,
  UserCheck
} from "lucide-react";

import {
  useInstagramAnalyzer
} from "../hooks/useInstagramAnalyzer";

import UserList from "../components/lists/UserList";


type Tab =
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



  const [activeTab,setActiveTab] =
    useState<Tab>("followers");





  async function handleFile(
    e:React.ChangeEvent<HTMLInputElement>
  ){

    const file =
      e.target.files?.[0];


    if(file){

      await uploadZip(file);

    }

  }






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








  const tabs = [

    {
      id:"followers",
      label:"Followers",
      count:
        analysis?.followersCount ?? 0,
      icon:
        <Users size={20}/>
    },


    {
      id:"following",
      label:"Following",
      count:
        analysis?.followingCount ?? 0,
      icon:
        <UserCheck size={20}/>
    },


    {
      id:"notFollowingBack",
      label:"Non ricambiano",
      count:
        analysis?.notFollowingBackCount ?? 0,
      icon:
        <UserMinus size={20}/>
    },


    {
      id:"pending",
      label:"Pending",
      count:
        analysis?.pendingRequests.length ?? 0,
      icon:
        <Clock size={20}/>
    }


  ] as const;








  return (

    <main
      className="
        min-h-screen
        px-4
        pb-10
      "
    >




      <header
        className="
          sticky
          top-0
          z-30
          -mx-4
          px-4
          pt-8
          pb-5
          bg-black/40
          backdrop-blur-xl
          border-b
          border-white/10
        "
      >


        <h1
          className="
            text-3xl
            font-bold
            tracking-tight
          "
        >

          Insights

        </h1>



        <p
          className="
            text-sm
            text-gray-400
            mt-1
          "
        >

          Followers · Following · Activity

        </p>


      </header>









      <section
        className="
          grid
          grid-cols-2
          gap-3
          mt-5
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

                rounded-3xl
                p-4
                border
                transition-all
                duration-300
                text-left

                ${
                  activeTab === tab.id

                  ?

                  "
                  bg-gradient-to-br
                  from-pink-500
                  via-purple-500
                  to-orange-400
                  border-transparent
                  shadow-xl
                  "

                  :

                  "
                  bg-white/5
                  border-white/10
                  "

                }

              `}

            >


              <div
                className="
                  mb-4
                "
              >

                {tab.icon}

              </div>



              <div
                className="
                  font-semibold
                  text-sm
                "
              >

                {tab.label}

              </div>




              <div
                className="
                  text-xs
                  opacity-70
                  mt-1
                "
              >

                {tab.count}

              </div>



            </button>


          ))

        }



      </section>









      <section
        className="
          mt-5
          rounded-3xl
          border
          border-white/10
          bg-white/5
          overflow-hidden
          animate-ios-in
        "
      >

        <UserList

          title=""

          users={
            currentUsers()
          }

        />


      </section>









      <section
        className="
          mt-5
          rounded-2xl
          bg-white/[0.03]
          border
          border-white/10
          p-4
        "
      >


        <p
          className="
            text-xs
            uppercase
            tracking-wide
            text-gray-500
            mb-3
          "
        >

          Activity

        </p>



        <div
          className="
            space-y-3
            text-sm
            text-gray-300
          "
        >

          <div>
            Possibili inattivi:
            {" "}
            {analysis?.inactiveCount ?? 0}
          </div>


          <div>
            Richieste ricevute:
            {" "}
            {analysis?.receivedRequests.length ?? 0}
          </div>


          <div>
            Recently unfollowed:
            {" "}
            {analysis?.recentlyUnfollowed.length ?? 0}
          </div>


        </div>


      </section>









      <section
        className="
          mt-5
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

          onClick={() =>
            fileInput.current?.click()
          }


          className="
            w-full
            rounded-2xl
            py-4
            font-semibold
            bg-gradient-to-r
            from-purple-500
            via-pink-500
            to-orange-400
            shadow-lg
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


      </section>



    </main>

  );

}
