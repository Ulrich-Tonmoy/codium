import { useRef, useEffect } from "react";

export default function useHorizontalScroll() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = scrollRef.current;
    const onWheel = (e: WheelEvent) => {
      if (!element || e.deltaY === 0) return;

      element.scrollTo({
        left: element.scrollLeft + e.deltaY,
        behavior: "smooth",
      });
    };

    element && element.addEventListener("wheel", onWheel);

    return () => {
      element && element.removeEventListener("wheel", onWheel);
    };
  }, []);

  return scrollRef;
}
