import {
  useState
} from "react";

import {
  InstagramUser
} from "../../types/instagram";

import SearchInput from "../ui/SearchInput";



interface Props {

  title:string;

  users:InstagramUser[];

  showDate?:boolean;

}





export default function UserList({

  users,

  showDate = false

}:Props) {



  const [search,setSearch] =
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

    <div className="space-y-3">





      {
        users.length > 8 &&
        (

          <SearchInput

            value={search}

            onChange={setSearch}

          />

        )
      }







      <div className="
        overflow-hidden
        rounded-2xl
        bg-[#1c1c1e]
        divide-y
        divide-white/5
      ">



        {
          filtered.length === 0

          ?

          (

            <div className="
              px-4
              py-5
              text-sm
              text-gray-500
            ">
              Nessun utente trovato
            </div>

          )

          :

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
                  active:bg-white/10
                  transition
                "

              >




                <div>


                  <div className="
                    text-[15px]
                    font-medium
                    text-white
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
                        mt-0.5
                      ">

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

                    )
                  }



                </div>





                <div className="
                  text-gray-500
                  text-lg
                ">
                  ›
                </div>




              </a>

            )

          )

        }



      </div>




    </div>

  );

}
