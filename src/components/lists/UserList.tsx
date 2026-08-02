import {
  useState
} from "react";

import {
  InstagramUser
} from "../../types/instagram";

import SearchInput from "../ui/SearchInput";


interface Props {

  title: string;

  users: InstagramUser[];

  showDate?: boolean;

}



export default function UserList({

  users,

  showDate = false

}: Props) {



  const [search, setSearch] =
    useState("");



  const filtered =
    users.filter(
      user =>
        user.username
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );




  function getInitial(
    username:string
  ) {

    return username
      .charAt(0)
      .toUpperCase();

  }





  return (

    <div className="
      space-y-3
    ">



      {
        users.length > 5 &&
        (

          <SearchInput

            value={search}

            onChange={setSearch}

          />

        )
      }





      {
        filtered.length === 0

        ?

        (

          <div className="
            py-6
            text-center
          ">

            <p className="
              text-sm
              text-gray-500
            ">
              Nessun utente trovato
            </p>

          </div>

        )

        :

        (

          <div className="
            rounded-2xl
            overflow-hidden
            border
            border-white/10
            bg-black/10
            divide-y
            divide-white/10
            max-h-96
            overflow-y-auto
          ">



            {
              filtered.map(

                user =>

                (

                  <a

                    key={
                      user.username
                    }

                    href={
                      user.profileUrl
                    }

                    target="_blank"

                    rel="noreferrer"

                    className="
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      transition
                      active:bg-white/10
                      hover:bg-white/5
                    "

                  >




                    <div className="
                      flex
                      items-center
                      gap-3
                    ">



                      <div className="
                        w-10
                        h-10
                        rounded-full
                        bg-gradient-to-br
                        from-purple-500
                        via-pink-500
                        to-orange-400
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                        text-white
                      ">

                        {
                          getInitial(
                            user.username
                          )
                        }

                      </div>





                      <div>


                        <div className="
                          text-sm
                          font-semibold
                        ">

                          @{user.username}

                        </div>





                        {
                          showDate &&
                          user.followedAt &&
                          (

                            <div className="
                              text-xs
                              text-gray-500
                              mt-1
                            ">

                              Seguito il&nbsp;

                              {
                                user.followedAt.toLocaleDateString(
                                  "it-IT",
                                  {
                                    day:"2-digit",
                                    month:"short",
                                    year:"numeric"
                                  }
                                )
                              }

                            </div>

                          )
                        }



                      </div>



                    </div>





                    <div className="
                      text-gray-500
                      text-xl
                    ">

                      ›

                    </div>



                  </a>

                )

              )

            }



          </div>

        )

      }



    </div>

  );

}
