import React from "react";

function RoundTripFlightCard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <section className="">
        <div className="grid grid-cols-12 place-items-center text-sm text-gray-300 font-medium min-w-[400px] w-full bg-stone-100 p-2 rounded mb-4">
          <div className="col-span-3">Airlines</div>
          <div className="col-span-2">Departure</div>
          <div className="col-span-3">Duration</div>
          <div className="col-span-4 w-full">
            <p className="text-right w-full">price</p>
          </div>
        </div>
        <div className="grid grid-cols-12 place-items-center text-gray-300 border border-gray-100 py-4 rounded">
          <div className="col-span-4">
            <div className="flex gap-2 items-center">
              <div className="">
                <img
                  src="https://play-lh.googleusercontent.com/HoSNU1K6pOnd3ZFkUfhyvqF5FzTOttsCOjwXDfaS-UOxYGF4OnKlkvrn4PrSuzwO8Lg"
                  alt=""
                  className="h-[35px]"
                />
              </div>
              <div className="">
                <p className="text-gray-400">Air Asia</p>
                <p className="text-xs uppercase">sg121</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-lg text-gray-400 tracking-tight">19:00</div>
          </div>
          <div className="col-span-3">
            <div className="text-xs">
              <p className="text-center">2h55m</p>
              <hr />
              <p className="text-center">Non-stop</p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-lg text-gray-400 tracking-tight">22:45</div>
          </div>
          <div className="col-span-3">
            <div className="">
              <p className="font-semibold text-gray-400 text-right">305 AED</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="grid grid-cols-12 place-items-center text-sm text-gray-300 font-medium min-w-[400px] w-full bg-stone-100 p-2 rounded mb-4">
          <div className="col-span-2">Airlines</div>
          <div className="col-span-2">Departure</div>
          <div className="col-span-2">Duration</div>
          <div className="col-span-4 w-full">
            <p className="text-right w-full">price</p>
          </div>
        </div>
        <div className="grid grid-cols-12 place-items-center text-gray-300 border border-gray-100 py-4 rounded">
          <div className="col-span-4">
            <div className="flex gap-2 items-center">
              <div className="">
                <img
                  src="https://play-lh.googleusercontent.com/HoSNU1K6pOnd3ZFkUfhyvqF5FzTOttsCOjwXDfaS-UOxYGF4OnKlkvrn4PrSuzwO8Lg"
                  alt=""
                  className="h-[35px]"
                />
              </div>
              <div className="">
                <p className="text-gray-400">Air Asia</p>
                <p className="text-xs uppercase">sg121</p>
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-lg text-gray-400 tracking-tight">19:00</div>
          </div>
          <div className="col-span-3">
            <div className="text-xs">
              <p className="text-center">2h55m</p>
              <hr />
              <p className="text-center">Non-stop</p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="text-lg text-gray-400 tracking-tight">22:45</div>
          </div>
          <div className="col-span-3">
            <div className="">
              <p className="font-semibold text-gray-400 text-right">305 AED</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoundTripFlightCard;
