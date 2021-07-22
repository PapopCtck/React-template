import { RefObject, useLayoutEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import liff from '@line/liff';

// import { setProfile } from '../stores/actions';
// import commonConstant from '../common/commonConstant';

// export function useLineLiff(): void {
//   const dispatch = useDispatch();
//   useLayoutEffect(() => {
//     if (commonConstant.liffId) {
//       liff.init({ liffId: commonConstant.liffId }, () => {
//         if (!liff.isLoggedIn()) {
//           liff.login();
//         }
//         liff.getProfile()
//           .then(profile => {
//             dispatch(setProfile(profile));
//           });
//       }, () => {
//         alert('Something went wrong, Please try again later');
//       });
//     }
//   }, []);
// }


function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions(): { width: number, height: number } {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useLayoutEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
}: {
  target: RefObject<Element>,
  onIntersect: IntersectionObserverCallback,
  threshold?: number,
  rootMargin?: string,
}): void => {
  useLayoutEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });
    const current = target.current as Element;
    observer.observe(current);
    return () => {
      observer.unobserve(current);
    };
  });
};
