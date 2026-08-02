interface Props {

  score:number;

  reciprocal:number;

  notFollowingBack:number;

}



export default function ProfileScore({

  score,

  reciprocal,

  notFollowingBack

}:Props) {



  function getStatus() {

    if (score >= 80)
      return "Ottimo";

    if (score >= 60)
      return "Buono";

    if (score >= 40)
      return "Da migliorare";

    return "Da pulire";

  }



  const radius = 42;

  const circumference =
    2 * Math.PI * radius;

  const progress =
    circumference -
    (
      score / 100
    ) *
    circumference;



  return (

    <div className="
      rounded-3xl
      border
      border-white/10
      bg-white/[0.06]
      backdrop-blur-xl
      p-5
      shadow-xl
    ">



      <div className="
        flex
        items-center
        justify-between
      ">


        <div>


          <p className="
            text-sm
            text-gray-400
          ">
            Stato profilo
          </p>


          <h2 className="
            text-xl
            font-bold
            mt-1
          ">
            {getStatus()}
          </h2>


        </div>




        <div className="
          relative
          w-28
          h-28
        ">


          <svg

            className="
              w-full
              h-full
              -rotate-90
            "

            viewBox="0 0 100 100"

          >

            <circle

              cx="50"

              cy="50"

              r={radius}

              stroke="rgba(255,255,255,0.12)"

              strokeWidth="8"

              fill="none"

            />


            <circle

              cx="50"

              cy="50"

              r={radius}

              stroke="url(#gradient)"

              strokeWidth="8"

              fill="none"

              strokeLinecap="round"

              strokeDasharray={circumference}

              strokeDashoffset={progress}

            />



            <defs>

              <linearGradient id="gradient">

                <stop
                  offset="0%"
                  stopColor="#a855f7"
                />

                <stop
                  offset="50%"
                  stopColor="#ec4899"
                />

                <stop
                  offset="100%"
                  stopColor="#fb923c"
                />

              </linearGradient>

            </defs>


          </svg>




          <div className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-2xl
            font-bold
          ">

            {score}

          </div>


        </div>


      </div>





      <div className="
        grid
        grid-cols-2
        gap-3
        mt-5
      ">


        <div className="
          rounded-2xl
          bg-white/5
          p-3
        ">

          <p className="
            text-xs
            text-gray-400
          ">
            Ricambiano
          </p>

          <p className="
            text-lg
            font-bold
          ">
            {reciprocal}%
          </p>

        </div>





        <div className="
          rounded-2xl
          bg-white/5
          p-3
        ">

          <p className="
            text-xs
            text-gray-400
          ">
            Non ricambiano
          </p>

          <p className="
            text-lg
            font-bold
          ">
            {notFollowingBack}%
          </p>

        </div>



      </div>



    </div>

  );

}
