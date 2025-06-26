import Container from "./Container"

const NewsLetter = () => {
  return (
    <section className="bg-white">
      <Container className="flex flex-col lg:flex-row py-[20px] px-4 lg:px-[70px] gap-2 lg:items-center lg:justify-between">
        <h1 className="font-heading text-[21px]">Get News & Updates</h1>
        <div className="flex-grow flex flex-col md:flex-row items-center gap-4 md:justify-end md:gap-[71px]">
          <p className="max-w-[365px] font-body text-secondary text-[16px] leading-[150%]">Get latest developments and exciting news on how we are shaping the future!</p>

          <form className="border-2 gap-4 flex-grow border-gray-200 flex flex-col lg:flex-row w-full lg:items-center py-[12px] px-[20px] max-w-[530px] rounded-[4px]">
            <input
              type="email"
              placeholder="Your email address"
              className="p-4 outline-none text-secondary w-full bg-secondary/10 lg:bg-transparent"
            />
            <button
              type="submit"
              className="news-letter-button w-full justify-center"
            >
              Join the Newsletter
            </button>
          </form>
        </div>
      </Container>
    </section>
  )
}

export default NewsLetter