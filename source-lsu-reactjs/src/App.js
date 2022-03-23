import './App.css';

function App() {
  return (
    <div class="flex h-screen">
      <div class="m-auto">
        <div className='shadow-2xl	box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);'>
          <div className='flex'>
            <div className='w-80'>
              <img className="w-80 shadow-box" src="/slogan.png" alt="image" />
            </div>
            <div className='w-80 relative'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <img className="h-10 shadow-box" src="/btn_google_signin_dark_pressed_web@2x.png" alt="signin" />
                {/* <p className='text-xs text-neutral-500 text-center mt-0.5'>Login with LSU email</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
