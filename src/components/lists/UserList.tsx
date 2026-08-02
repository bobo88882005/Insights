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

  showDate=false

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

    <div>


      {
        users.length > 8 &&
        <SearchInput

          value={search}

          onChange={setSearch}

        />
      }




      <div className="
        mt-3
        rounded-xl
        overflow-hidden
        border
        border-white/10
      ">


      {
        filtered.length === 0

        ?

        <div className="
          p-4
          text-center
          text-sm
          text-gray-500
        ">
          Nessun utente
        </div>


        :


        filtered.map(
          (user,index)=>(


            <a

              key={user.username}

              href={user.profileUrl}

              target="_blank"

              rel="noreferrer"

              className={`
                flex
                items-center
                justify-between
                px-4
                py-3
                bg-black/20
                transition
                hover:bg-white/5
                ${
                  index !== filtered.length-1
                  ? "border-b border-white/5"
                  : ""
                }
              `}

            >


              <span className="
                text-sm
                text-white
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
                          day:"2-digit",
                          month:"2-digit",
                          year:"numeric"
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


    </div>

  );

}
