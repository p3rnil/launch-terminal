'use client'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(useGSAP, SplitText, ScrambleTextPlugin);

gsap.defaults({ duration: 2 });

export * from "gsap";
export * from "gsap/SplitText";
export * from "@gsap/react";