import "../Pages/PagesStyles/grid.css";
export default function Home() {
  return (
    <div className="grid-bg w-full h-[calc(100dvh-60px)] text-white flex justify-center items-center flex-col gap-3">
      <h1 className="text-5xl md:text-7xl font-bold text-center pb-3">Webverse</h1>
      <p className=" text-gray-500 text-center w-80 ">
        Compiler HTML, CSS, JavaScript Code on the go and share it with your
        friends
      </p>
    </div>
  );
}