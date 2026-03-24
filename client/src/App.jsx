const messages = [
  "Dream big, act bigger", "Make today count fully", "You are your limit",
  "Stay strong, keep going", "Believe and achieve it", "Small steps, big wins",
  "Shine even in darkness", "Keep moving forward", "Success needs patience",
  "Courage creates change", "Hustle beats talent", "Fear less, do more",
  "Growth starts in pain", "Win with your mindset", "Create your own path",
  "Do it with passion", "Be bold, stay humble", "Trust the long journey",
]

function App() {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <div className="flex flex-col items-center justify-center gap-10 h-screen bg-darkBackground">
      {/* <div className="text-[56px] font-bold text-lightBackground blur-[20px]">
        {randomMessage}
      </div> */}
      <div className="relative w-fit">
        <p className="blur-[22px] select-none text-lightBackground text-[56px] font-bold">
          {randomMessage}
        </p>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">
            🔒
          </span>
        </div>
      </div>
      <button className="border-accent border-solid border-[2px] text-[28px] text-accent px-4 py-2 rounded-md transition duration-500 hover:bg-accent hover:text-darkBackground">
        Login to access the hidden message
      </button>
    </div>
  )
}

export default App