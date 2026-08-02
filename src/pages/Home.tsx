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


    if(file)
      await uploadZip(file);

  }





  function users(){


    if(!analysis)
      return [];



    if(activeTab==="followers")
      return analysis.followers;


    if(activeTab==="following")
      return analysis.following;


    if(activeTab==="notFollowingBack")
      return analysis.notFollowingBack;


    return analysis.pendingRequests;

  }








  const tabs = [

    {
      id:"followers",
      label:"Followers",
      count:
        analysis?.followersCount ?? 0,
      icon:
        <Users size={18}/>
    },


    {
      id:"following",
      label:"Following",
      count:
        analysis?.followingCount ?? 0,
      icon:
        <UserCheck size={18}/>
    },


    {
      id:"notFollowingBack",
      label:"Non ricambiano",
      count:
        analysis?.notFollowingBackCount ?? 0,
      icon:
        <UserMinus size={18}/>
    },


    {
      id:"pending",
      label:"Pending",
      count:
        analysis?.pendingRequests.length ?? 0,
      icon:
        <Clock size={18}/>
    }

  ] as const;








  return (

    <main
      className="
        min-h-screen
        px-4
        pb-8
      "
    >



      <header
        className="
          pt-8
          pb-5
        "
      >

        <h1
          className="
            text-4xl
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
          Instagram followers analysis
        </p>


      </header>









      <section
        className="
          grid
          grid-cols-2
          gap-3
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
                rounded-2xl
                p-4
                text-left
                border
                transition-all
                duration-300

                ${
                  activeTab===tab.id

                  ?

                  "
                  bg-gradient-to-br
                  from-pink-500
                  via-purple-500
                  to-orange-400
                  border-transparent
                  shadow-lg
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
                  mb-3
                "
              >

                {tab.icon}

              </div>



              <div
                className="
                  text-sm
                  font-semibold
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
        "
      >


        <UserList

          title=""

          users={
            users()
          }

        />


      </section>









      <section
        className="
          mt-5
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-3
        "
      >


        <p
          className="
            text-xs
            text-gray-500
            mb-2
            px-2
          "
        >
          Altro
        </p>



        <div
          className="
            text-sm
            text-gray-300
            space-y-3
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
              text-red-400
              text-sm
              mt-3
            "
          >
            {error}
          </p>

        }


      </section>



    </main>

  );

}
