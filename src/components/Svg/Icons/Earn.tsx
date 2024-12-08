import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => (
  <Svg viewBox="0 0 204 225" {...props}>
    <g transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)">
      <path d="M997 2243 c-10 -3 -235 -135 -500 -294 -315 -189 -484 -296 -489
      -310 -4 -11 -4 -28 1 -38 10 -18 991 -611 1011 -611 20 0 1001 593 1011 611 5
      10 5 27 1 39 -8 22 -949 593 -993 602 -13 3 -32 3 -42 1z m350 -424 c175 -105
      319 -192 321 -193 4 -5 -636 -386 -648 -386 -6 0 -156 86 -331 192 -206 123
      -315 194 -307 199 7 4 153 91 323 193 171 102 313 186 317 186 4 0 150 -86
      325 -191z"/>
      <path d="M90 1210 c-83 -51 -98 -71 -76 -104 9 -15 224 -150 511 -322 l495
      -297 495 297 c276 165 502 308 511 321 22 34 7 55 -75 104 l-70 41 -424 -255
      c-234 -140 -430 -255 -437 -255 -7 0 -203 115 -437 255 -233 140 -425 255
      -426 255 -1 -1 -31 -18 -67 -40z"/>
      <path d="M86 705 c-38 -23 -72 -49 -77 -57 -23 -40 -3 -55 489 -350 404 -242
      491 -291 522 -291 31 0 118 49 522 291 494 297 511 309 488 351 -10 20 -140
      97 -154 93 -6 -2 -200 -117 -433 -257 l-422 -254 -408 246 c-224 135 -419 251
      -433 258 -23 11 -31 8 -94 -30z"/>
    </g>
  </Svg>
);

export default Icon;
