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



  const filteredUsers =
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
        users.length > 8 &&

        <div className="mb-3">

          <SearchInput
            value={search}
            onChange={setSearch}
          />

        </div>
      }




      {
        filteredUsers.length === 0

        ?

        <div
          className="
            py-8
            text-center
            text-sm
            text-gray-500
          "
        >
          Nessun utente trovato
        </div>


        :


        <div
          className="
            rounded-2xl
            overflow-hidden
            border
            border-white/10
            bg-black/20
          "
        >


          {
            filteredUsers.map(
              (user, index) => (

                <a

                  key={user.username}

                  href={user.profileUrl}

                  target="_blank"

                  rel="noreferrer"

                  className={

                    "flex items-center justify-between px-4 py-3 transition active:bg-white/10 " +

                    (
                      index !== filteredUsers.length - 1
                      ? "border-b border-white/5"
                      : ""
                    )

                  }

                >


                  <div>


                    <div
                      className="
                        text-[15px]
                        font-medium
                        text-white
                      "
                    >

                      @{user.username}

                    </div>




                    {
                      showDate &&
                      user.followedAt &&

                      <div
                        className="
                          mt-1
                          text-xs
                          text-gray-500
                        "
                      >

                        Seguito il{" "}

                        {
                          user.followedAt.toLocaleDateString(
                            "it-IT",
                            {
                              day:"2-digit",
                              month:"2-digit",
                              year:"numeric"
                            }
                          )
                        }

                      </div>

                    }


                  </div>




                  <div
                    className="
                      text-gray-600
                      text-lg
                    "
                  >
                    ›
                  </div>


                </a>

              )
            )
          }


        </div>

      }


    </div>

  );

}
