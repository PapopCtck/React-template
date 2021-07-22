import { ReactElement } from 'react';

import { ISkeleton } from './Skeleton.interfaces';
import { SkeletonWrapper } from './Skeleton.styles';

export const Skeleton = ({ type = 'rectangle', loading = true, duration = 1.75,delay = 0.5 ,...rest }: ISkeleton): ReactElement => (
  <SkeletonWrapper type={type} loading={loading} duration={duration} delay={delay} {...rest} />
);
