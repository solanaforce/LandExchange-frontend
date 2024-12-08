import { useCallback } from 'react'
import { migrate } from 'utils/calls/migration'
import { useMigrationContract } from 'hooks/useContracts'

const useMigrate = () => {
  const migration = useMigrationContract()

  const handleMigrate = useCallback(
    async (amount) => {
      return migrate(migration, amount)
    },
    [migration],
  )

  return { onMigrate: handleMigrate }
}

export default useMigrate
