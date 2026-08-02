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



  return (

    <div>



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

          <p className="
            text-sm
            text-gray-500
          ">
            Nessun utente trovato
          </p>

        )

        :

        (

          <div className="
            space-y-1
            max-h-80
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
                      justify-between
                      items-center
                      rounded-lg
                      px-2
                      py-2
                      hover:bg-white/10
                      transition
                    "

                  >



                    <span className="
                      text-sm
                      font-medium
                    ">
                      @{user.username}
                    </span>





                    {
                      showDate &&
                      user.followedAt &&
                      (

                        <span className="
                          text-xs
                          text-gray-500
                        ">
                          {
                            user.followedAt.toLocaleDateString(
                              "it-IT",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                              }
                            )
                          }
                        </span>

                      )
                    }




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
