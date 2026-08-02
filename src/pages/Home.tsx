import { useRef } from "react";

import {
  Users,
  UserMinus,
  UserX,
  Upload
} from "lucide-react";

import { useInstagramAnalyzer } from "../hooks/useInstagramAnalyzer";

import UserList from "../components/lists/UserList";
import CollapsibleCard from "../components/ui/CollapsibleCard";


export default function Home() {

  const fileInput =
    useRef<HTMLInputElement>(null);


  const {
    analysis,
    loading,
    error,
    uploadZip
  } = useInstagramAnalyzer();



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

    <div className="space-y-5">


      <div>

        <h1 className="
          text-2xl
          font-bold
        ">
          Instagram Insights
        </h1>


        <p className="
          text-gray-400
          text-sm
        ">
          Analisi followers e following
        </p>

      </div>




      <div className="
        grid
        grid-cols-2
        gap-3
      ">

        <StatCard
          title="Followers"
          value={
            analysis?.followersCount ?? 0
          }
          icon={
            <Users size={18}/>
          }
        />


        <StatCard
          title="Following"
          value={
            analysis?.followingCount ?? 0
          }
          icon={
            <Users size={18}/>
          }
        />

      </div>




      <div className="
        grid
        grid-cols-2
        gap-3
      ">


        <StatCard
          title="Non ricambiano"
          value={
            analysis?.notFollowingBackCount ?? 0
          }
          icon={
            <UserMinus size={18}/>
          }
        />


        <StatCard
          title="Possibili inattivi"
          value={
            analysis?.inactiveCount ?? 0
          }
          icon={
            <UserX size={18}/>
          }
        />


      </div>





      <div className="
        rounded-xl
        border
        border-white/10
        bg-white/5
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

          onClick={openFilePicker}

          className="
            w-full
            flex
            justify-center
            items-center
            gap-2
            rounded-full
            py-3
            bg-gradient-to-r
            from-purple-500
            via-pink-500
            to-orange-400
            font-semibold
          "

        >

          <Upload size={18}/>


          {
            loading
              ? "Analisi..."
              : "Carica ZIP Instagram"
          }


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

          <div className="space-y-3">



            <CollapsibleCard
              title="Non ricambiano"
              count={
                analysis.notFollowingBackCount
              }
            >

              <UserList
                title=""
                users={
                  analysis.notFollowingBack
                }
              />

            </CollapsibleCard>







            <CollapsibleCard
              title="Possibili inattivi"
              count={
                analysis.inactiveCount
              }
            >

              <UserList
                title=""
                users={
                  analysis.possibleInactive
                }
              />

            </CollapsibleCard>







            <CollapsibleCard
              title="Followers"
              count={
                analysis.followersCount
              }
            >

              <UserList
                title=""
                users={
                  analysis.followers
                }
                showDate
              />

            </CollapsibleCard>








            <CollapsibleCard
              title="Following"
              count={
                analysis.followingCount
              }
            >

              <UserList
                title=""
                users={
                  analysis.following
                }
                showDate
              />

            </CollapsibleCard>







            <CollapsibleCard
              title="Richieste ricevute"
              count={
                analysis.receivedRequests.length
              }
            >

              <UserList
                title=""
                users={
                  analysis.receivedRequests
                }
              />

            </CollapsibleCard>







            <CollapsibleCard
              title="Pending requests"
              count={
                analysis.pendingRequests.length
              }
            >

              <UserList
                title=""
                users={
                  analysis.pendingRequests
                }
              />

            </CollapsibleCard>







            <CollapsibleCard
              title="Recently unfollowed"
              count={
                analysis.recentlyUnfollowed.length
              }
            >

              <UserList
                title=""
                users={
                  analysis.recentlyUnfollowed
                }
              />

            </CollapsibleCard>



          </div>

        )
      }



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
      border
      border-white/10
      bg-white/5
      p-3
    ">


      <div className="
        text-pink-400
      ">
        {icon}
      </div>



      <div className="
        text-xl
        font-bold
        mt-2
      ">
        {value}
      </div>



      <div className="
        text-xs
        text-gray-400
      ">
        {title}
      </div>


    </div>

  );

}
