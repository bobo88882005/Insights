import { useRef } from "react";

import {
  Users,
  UserMinus,
  UserX,
  Upload,
  UserCheck,
  Clock,
  UserRoundX
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

    <div className="
      max-w-xl
      mx-auto
      px-4
      pb-10
      space-y-6
    ">



      <header className="
        pt-6
      ">

        <h1 className="
          text-3xl
          font-bold
          tracking-tight
        ">
          Instagram Insights
        </h1>


        <p className="
          text-gray-400
          mt-1
        ">
          Analisi intelligente del profilo
        </p>


      </header>





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
            <Users />
          }

        />



        <StatCard

          title="Following"

          value={
            analysis?.followingCount ?? 0
          }

          icon={
            <UserCheck />
          }

        />



        <StatCard

          title="Non ricambiano"

          value={
            analysis?.notFollowingBackCount ?? 0
          }

          icon={
            <UserMinus />
          }

        />



        <StatCard

          title="Possibili inattivi"

          value={
            analysis?.inactiveCount ?? 0
          }

          icon={
            <UserX />
          }

        />


      </div>





      <div className="
        rounded-3xl
        bg-white/5
        border
        border-white/10
        backdrop-blur-xl
        p-5
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
            rounded-2xl
            py-4
            flex
            items-center
            justify-center
            gap-3
            font-semibold
            bg-gradient-to-r
            from-purple-500
            via-pink-500
            to-orange-400
            shadow-lg
            active:scale-95
            transition
          "

        >

          <Upload size={20}/>


          {
            loading
              ? "Analisi in corso..."
              : "Importa archivio Instagram"
          }


        </button>



        {
          error &&
          (

            <p className="
              text-red-400
              text-sm
              mt-4
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
            space-y-4
          ">





            <Section

              title="Non ricambiano"

              count={
                analysis.notFollowingBackCount
              }

              icon={
                <UserMinus size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.notFollowingBack
                }

              />

            </Section>








            <Section

              title="Possibili inattivi"

              count={
                analysis.inactiveCount
              }

              icon={
                <UserX size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.possibleInactive
                }

              />

            </Section>









            <Section

              title="Followers"

              count={
                analysis.followersCount
              }

              icon={
                <Users size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.followers
                }

                showDate

              />

            </Section>









            <Section

              title="Following"

              count={
                analysis.followingCount
              }

              icon={
                <UserCheck size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.following
                }

                showDate

              />

            </Section>









            <Section

              title="Richieste ricevute"

              count={
                analysis.receivedRequests.length
              }

              icon={
                <Clock size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.receivedRequests
                }

              />

            </Section>









            <Section

              title="Pending requests"

              count={
                analysis.pendingRequests.length
              }

              icon={
                <Clock size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.pendingRequests
                }

              />

            </Section>









            <Section

              title="Recently unfollowed"

              count={
                analysis.recentlyUnfollowed.length
              }

              icon={
                <UserRoundX size={18}/>
              }

            >

              <UserList

                title=""

                users={
                  analysis.recentlyUnfollowed
                }

              />

            </Section>





          </div>

        )

      }



    </div>

  );

}







function Section({

  title,

  count,

  icon,

  children

}:{

  title:string;

  count:number;

  icon:React.ReactNode;

  children:React.ReactNode;

}) {


  return (

    <div className="

      rounded-3xl

      overflow-hidden

      bg-white/5

      border

      border-white/10

      backdrop-blur-xl

    ">


      <div className="

        px-5

        py-4

        flex

        items-center

        justify-between

      ">


        <div className="

          flex

          items-center

          gap-3

        ">

          <div className="

            text-pink-400

          ">

            {icon}

          </div>


          <span className="

            font-semibold

          ">

            {title}

          </span>


        </div>



        <span className="

          text-sm

          text-gray-400

        ">

          {count}

        </span>



      </div>



      <CollapsibleCard

        title=""

        count={0}

      >

        {children}

      </CollapsibleCard>


    </div>

  );

}









function StatCard({

  title,

  value,

  icon

}:{

  title:string;

  value:number;

  icon:React.ReactNode;

}) {


  return (

    <div className="

      rounded-3xl

      p-4

      bg-white/5

      border

      border-white/10

      backdrop-blur-xl

    ">


      <div className="

        text-pink-400

      ">

        {icon}

      </div>



      <div className="

        text-3xl

        font-bold

        mt-3

      ">

        {value}

      </div>



      <div className="

        text-sm

        text-gray-400

      ">

        {title}

      </div>


    </div>

  );

}
