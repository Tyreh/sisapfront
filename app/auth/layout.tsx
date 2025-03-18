interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-primary' />
        <div className='relative z-20 flex items-center text-lg font-medium'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          SISAP
        </div>

        {/* <img
          src={ViteLogo}
          className='relative m-auto'
          width={301}
          height={60}
          alt='Vite'
        /> */}

        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <footer className='text-sm'>Universidad El Bosque</footer>
          </blockquote>
        </div>
      </div>

      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>

          <div className="lg:hidden mb-4 flex items-center justify-center gap-2">
            {/* <img src={TermomaqIcon} alt="" className={` h-12 w-12`} /> */}
            <div
              className={`flex flex-col justify-end`}
            >
              <span className='font-medium'>SISAP</span>
              <span className='text-xs'>Universidad El Bosque</span>
            </div>
          </div>
          {children}
          <div className='lg:hidden text-muted-foreground text-xs mt-4 text-center'>&copy;</div>

        </div>
      </div>
    </div>
  )
}