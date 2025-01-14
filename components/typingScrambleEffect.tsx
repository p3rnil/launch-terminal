'use client'
import React, { useRef, useState, useMemo, ReactNode, ReactElement } from "react";
import { gsap, useGSAP, SplitText } from '@/gsap'
import { cn } from '@/utils'

interface typingScrambleEffectProps {
  children: ReactNode
}

interface IText {
  original: string[];
  splitted: SplitText;
}

const TypingScrambleEffect: React.FC<typingScrambleEffectProps> = ({ children }) => {
  const lettersAndSymbols = useMemo(() => ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '+', '=', ';', ':', '<', '>', ','], []);
  const wrapper = useRef<HTMLElement>(null)
  const references = useRef<HTMLElement[]>([]);
  const [texts, setTexts] = useState<IText[]>([])

  const reset = () => {
    texts.forEach((element) => {
      element.splitted.chars.forEach((el, index) => {
        gsap.killTweensOf(el)
        el.innerHTML = element.original[index];
      });
    });
  };

  const play = (chars: Element[] = []) => {
    if (!chars) return;

    gsap.to(wrapper.current, { opacity: 1, duration: 0.1 })
    chars.forEach((char, position) => {
      const initialHTML = char.innerHTML;
      let repeatCount = 0;


      gsap.fromTo(char,
        { opacity: 0 },
        {
          duration: 0.03,
          onStart: () => {
            gsap.set(char, { '--opa': 1 });
          },
          onComplete: () => {
            gsap.set(char, { innerHTML: initialHTML, delay: 0.03 });
          },
          repeat: 3,
          onRepeat: () => {
            repeatCount++;
            if (repeatCount === 1) {
              gsap.set(char, { '--opa': 0 });
            }
          },
          repeatRefresh: true,
          repeatDelay: 0.04,
          delay: (position + 1) * 0.07,
          innerHTML: () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
          opacity: 1
        });
    });
  };

  const onHover = () => {
    reset();
    texts.forEach(element => {
      play(element.splitted.chars);
    });
  };

  const init = () => {
    references.current.forEach((element) => {
      const splitted = new SplitText(element, { type: "words,chars", wordsClass: "word", charsClass: "char" })
      setTexts(prev => {
        return [...prev, {
          splitted: splitted,
          original: splitted.chars.map(char => char.innerHTML)
        }]
      })
    })
  };

  useGSAP(() => {
    init();
  }, []);

  const addRefsToChildren = (nodes: ReactNode): ReactNode => {
    // Get the child, make sure its just one child only
    const children = React.Children.map(nodes, (child) => {
      return (child as ReactElement<{ children: ReactNode }>).props.children;
    })

    const childCount = React.Children.count(nodes);
    if (childCount !== 1) {
      throw new Error("TypingScrambleEffect requires only child. Only one child was provided.");
    }

    const childrenArray = React.Children.toArray(children)
    const childrenWithRef = [] as ReactNode[]

    childrenArray.forEach((element) => {
      if (React.isValidElement(element)) {

        const newChildWithRef = React.cloneElement(element as React.JSX.Element,
          {
            ref: (el: HTMLElement) => references.current.push(el),
          })
        childrenWithRef.push(newChildWithRef)
      }
    });

    return React.cloneElement(
      nodes as React.JSX.Element,
      {
        ref: (el: HTMLElement) => wrapper.current = el,
        onMouseEnter: () => onHover(),
        className: cn((nodes as React.JSX.Element).props.className, 'hover-effect--cursor-square'),
        children: [...childrenWithRef]
      })
  }

  return (addRefsToChildren(children));
};

export default TypingScrambleEffect;