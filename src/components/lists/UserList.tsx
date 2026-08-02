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

}:Props){



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

    <div
      className="
        p-3
      "
    >



      {
        users.length > 10 &&

        <div className="mb-3">

          <SearchInput

            value={search}

            onChange={setSearch}

          />

        </div>

      }






      <div
        className="
          max-h-[420px]
          overflow-y-auto
          divide-y
          divide-white/10
        "
      >



        {
          filtered.length === 0

          ?

          (

            <div
              className="
                py-10
                text-center
                text-sm
                text-gray-500
              "
            >

              Nessun utente

            </div>

          )


          :


          filtered.map(user => (

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
                py-3
                px-2
                transition
                active:bg-white/10
              "

            >



              <span
                className="
                  text-[15px]
                  font-medium
                  text-white
                "
              >

                @{user.username}

              </span>




              <span
                className="
                  text-gray-500
                  text-xl
                "
              >

                ›

              </span>



            </a>


          ))

        }



      </div>


    </div>

  );

}
