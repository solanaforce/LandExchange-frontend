import { useSingleCallResult } from 'state/multicall/hooks'
import { usePresaleContract } from 'hooks/useContracts'

export function usePublicInfo() {
    const presale = usePresaleContract()

    const totalInvestors = useSingleCallResult({
        contract: presale, 
        functionName: 'totalInvestors', 
    })?.result

    const totalDeposit = useSingleCallResult({
        contract: presale, 
        functionName: 'totalDeposit', 
    })?.result

    const finalized = useSingleCallResult({
        contract: presale, 
        functionName: 'finalized', 
    })?.result

    const paused = useSingleCallResult({
        contract: presale, 
        functionName: 'paused', 
    })?.result

    return {
        totalInvestors,
        totalDeposit,
        paused,
        finalized
    }
  }