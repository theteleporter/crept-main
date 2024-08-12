export default function Loading() {
  return (
    <>
      <div className="flex flex-col justify-center align-middle items-center text-center z-50 h-screen m-0 bg-black w-full fixed top-0">
        <div className="m-auto w-16 h-16">
          <svg
            className="m-auto block duration-300 animate-spin delay-0"
            shapeRendering={"auto"}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <path
              d="M18 50A32 32 0 0 0 82 50A32 34 0 0 1 18 50"
              className="fill-[#fe0000] stroke-none"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
