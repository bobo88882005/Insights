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
import Badge from "../components/ui/Badge";
import ProfileScore from "../components/dashboard/ProfileScore";


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

    <div className="
      space-y-5
      pb-10
    ">



      <div>

        <h1 className="
          text-3xl
          font-bold
          tracking-tight
        ">
          Instagram Insights
        </h1>


        <p className="
          text-gray-400
          text-sm
          mt-1
        ">
          Analisi followers e following
        </p>

      </div>






      {
        analysis &&
        (

          <ProfileScore

            score={
              analysis.profileScore
            }

            reciprocal={
              analysis.reciprocalPercentage
            }

            notFollowingBack={
              analysis.notFollowingBackPercentage
            }

          />

        )
      }







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

          subtitle={
            analysis
              ? `${analysis.excludedCount} esclusi`
              : ""
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
        rounded-3xl
        border
        border-white/10
        bg-white/[0.06]
        backdrop-blur-xl
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
            rounded-2xl
            py-4
            bg-gradient-to-r
            from-purple-500
            via-pink-500
            to-orange-400
            font-semibold
            active:scale-[0.98]
            transition
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

          <div className="
            space-y-3
          ">



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

  subtitle,

  icon

}: {

  title:string;

  value:number;

  subtitle?:string;

  icon:React.ReactNode;

}) {


  return (

    <div className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.06]
      backdrop-blur-xl
      p-4
    ">


      <div className="
        text-pink-400
      ">

        {icon}

      </div>




      <div className="
        text-2xl
        font-bold
        mt-3
      ">

        {value}

      </div>




      <div className="
        text-xs
        text-gray-400
      ">

        {title}

      </div>




      {
        subtitle &&
        (

          <div className="
            text-[11px]
            text-gray-500
            mt-1
          ">

            {subtitle}

          </div>

        )
      }



    </div>

  );

}
