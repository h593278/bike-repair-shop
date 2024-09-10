// src/components/OfflineIndicator.tsx
import useNetworkStatus from '../hooks/useNetWorkStatus';
import { Typography } from '../typography';

const OfflineIndicator: React.FC = () => {
  const isOnline = useNetworkStatus();

  return (
    !isOnline && (
      <div className="bg-red-200 p-2 fixed top-2 left-2">
        <Typography>Offline modus</Typography>
      </div>
    )
  )
}

export default OfflineIndicator
