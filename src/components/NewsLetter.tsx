import Container from "./Container"

const NewsLetter = () => {
  return (
    <section className="bg-white">
      <Container className="py-[20px] px-4 sm:px-[70px] flex gap-4 items-center justify-between">
        <h1>Get News & Updates</h1>
        <div className="flex-grow flex items-center gap-4 justify-end gap-[71px]">
          <p className="max-w-[365px]">Get latest developments and exciting news on how we are shaping the future!</p>

          <form className="border-2 flex-grow border-gray-200 flex items-center py-[12px] px-[20px] max-w-[530px] rounded-[4px]">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 outline-none"
            />
            <button
              type="submit"
              className="text-[14px] text-primary font-[600] uppercase flex items-center border-2 border-primary ms-auto px-[24px] py-[14px] rounded-[4px] hover:bg-primary hover:text-white transition-colors duration-300"
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