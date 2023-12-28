// ...

function BannerBtn({ carouselState, previous, next }) {
    return (
      <div className="my-custom-button-group ">
        <button
          className='absolute lg:top-[330px] lg:right-20 top-[450px] hover:bg-white hover:text-black font-semibold text-white text-[25px] border-2 border-white h-10 w-10 rounded-full'
          onClick={() => previous()}
        >
          &lt;
        </button>
        <button
          className='absolute lg:top-[330px] lg:right-10 top-[450px] hover:bg-white hover:text-black font-semibold text-white text-[25px] border-2 border-white  h-10 w-10 rounded-full'
          onClick={() => next()}
        >
          &gt;
        </button>
      </div>
    );
  }
  
  export default BannerBtn;
  