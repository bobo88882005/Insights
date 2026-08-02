interface Props {
  children: React.ReactNode;
}


export default function Badge({
  children
}: Props) {

  return (

    <span className="
      text-[11px]
      px-2
      py-1
      rounded-full
      bg-white/10
      text-gray-400
    ">
      {children}
    </span>

  );

}
