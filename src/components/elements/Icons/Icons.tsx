import type { JSX } from "react";
import type { Props } from "./Icons.type";

const Icons = (props: Props) => {
  const { icon, onClick, className, size=24, fill } = props;
  const LIST_ICONS: { [key in Props['icon']]: JSX.Element } = {
    'info': (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
        <path d="M12 9h.01" /><path d="M11 12h1v4h1" />
      </>
    ),
    'chevron-bottom': (
      <>
        <path xmlns="http://www.w3.org/2000/svg" stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path xmlns="http://www.w3.org/2000/svg" d="M6 9l6 6l6 -6"/>
      </>
    ),
    'copy': (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
      </>
    ),
    'lock-open': (
      <>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M5 11m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
        <path d="M12 16m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M8 11v-5a4 4 0 0 1 8 0" />
      </>
    )
  };

  return (
    <svg onClick={onClick} className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={fill ?? 'currentColor'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      {LIST_ICONS[icon]}
    </svg>
  )
}

export default Icons;
