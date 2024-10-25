import Tag from "./atom/Tag";

const Card = () => {
  function limitText(text: string, maxLength = 70) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div className="flex flex-col text-sm rounded-lg brdr shadow relative group duration-300 bg-slate-900">
      <div className="flex flex-col p-4 py-8">
        <p>5 menit yang lalu</p>
        <h1 className="text-4xl text-yellow-500 font-bold">Judul Catatan</h1>
        <div className="flex gap-2 mt-2">
          <Tag text="folder" />
          <Tag text="folder" />
        </div>
        <div className="mt-4">
          {
            limitText("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quia deserunt impedit? ")
          }
        </div>
      </div>
      <hr />
      <div className="flex w-full justify-end p-4">
        <button className="button">edit catatan</button>
      </div>

      <div className="absolute brdr rounded-lg rounded-tr-none top-full translate-y-0 p-4 opacity-0 duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit quia deserunt impedit?
      </div>
    </div>
  );
};

export default Card;
