import {
  InstagramUser
} from "../../types/instagram";


interface Props {
  title: string;
  users: InstagramUser[];
}


export default function UserList({
  title,
  users
}: Props) {


  return (

    <div className="
      rounded-xl
      border
      border-white/10
      bg-white/5
      p-4
    ">


      <h3 className="
        text-lg
        font-semibold
        mb-4
      ">
        {title}

        <span className="
          text-gray-400
          ml-2
          text-sm
        ">
          ({users.length})
        </span>

      </h3>



      <div className="
        space-y-2
        max-h-96
        overflow-auto
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
                justify-between
                items-center
                p-2
                rounded-lg
                hover:bg-white/10
                transition
              "
            >

              <span>
                @{user.username}
              </span>


              {
                user.followedAt &&
                (
                  <span className="
                    text-xs
                    text-gray-400
                  ">
                    {
                      user.followedAt
                        .toLocaleDateString()
                    }
                  </span>
                )
              }


            </a>

          ))
        }


      </div>


    </div>

  );

}
