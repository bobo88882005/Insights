import {
  InstagramUser
} from "../../types/instagram";


interface Props {
  title: string;
  users: InstagramUser[];
}


export default function UserList({
  users
}: Props) {


  if (users.length === 0) {

    return (
      <p className="
        text-sm
        text-gray-500
      ">
        Nessun utente trovato
      </p>
    );

  }



  return (

    <div className="
      space-y-1
      max-h-80
      overflow-y-auto
    ">


      {
        users.map(user => (

          <a
            key={user.username}
            href={user.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="
              flex
              items-center
              justify-between
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
              user.followedAt &&
              (

                <span className="
                  text-xs
                  text-gray-500
                  ml-2
                ">
                  {
                    formatDate(
                      user.followedAt
                    )
                  }
                </span>

              )
            }


          </a>

        ))
      }


    </div>

  );

}




function formatDate(
  date: Date
) {

  return date.toLocaleDateString(
    "it-IT",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  );

}
