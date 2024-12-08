import InfoNav from './components/InfoNav'

export const InfoPageLayout = ({ children }) => {
  return (
    <>
      <InfoNav isStableSwap={false} />
      {children}
    </>
  )
}
