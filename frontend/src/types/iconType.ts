import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react"

export type IconType = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & {
    title?: string | undefined
    titleId?: string | undefined
  } & RefAttributes<SVGSVGElement>
>