import { ArrowPathIcon, CogIcon, PauseIcon } from "@heroicons/react/20/solid";
import { ServiceType } from "../types/ServiceType";
import { Typography } from "../components/typography";

const iconStyle = "w-6 h-6"

const serviceIcon: Record<ServiceType, JSX.Element> = {
    [ServiceType.BrakeMaintenance]: <PauseIcon className={iconStyle} />,
    [ServiceType.ChainReplacement]: <CogIcon className={iconStyle} />,
    [ServiceType.WheelAdjustment]: <ArrowPathIcon className={iconStyle} />,
  };


export const ServiceTypeName = (serviceType: ServiceType): string => {
  return ServiceType[serviceType]
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before each uppercase letter
    .toLowerCase() // Convert to lowercase
    .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter;
}
export const ServiceTypeIcon = (serviceType: ServiceType): JSX.Element => {
  return serviceIcon[serviceType];
}
export const ServiceTypeIconAndName = (serviceType: ServiceType): JSX.Element => {
  return (
    <span className="flex gap-1 items-end">
      <Typography>{ServiceTypeName(serviceType)}</Typography>
      {ServiceTypeIcon(serviceType)}
    </span>
  ) 
}