



export function MainLayou({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8 pb-12">
        {children}
      </div>
    </>
  )
}
