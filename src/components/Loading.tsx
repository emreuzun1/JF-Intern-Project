import React from 'react';
import {ActivityIndicator} from 'react-native';
import style from 'styled-components/native';

const StyledContainer = style.View({
  flex: 1,
});

const StyledIndicator = style.View({
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface Props {
  isLoading: boolean;
  children: any;
  props?: any;
}

const withLoading = (Comp: any) => {
  const WithLoading: React.FC<Props> = ({isLoading, children, ...props}) => {
    if (isLoading) {
      return (
        <StyledIndicator>
          <ActivityIndicator size="large" color="#fa8900" />
        </StyledIndicator>
      );
    } else {
      return (
        <StyledContainer>
          <Comp {...props}>{children}</Comp>
        </StyledContainer>
      );
    }
  };
  return WithLoading;
};

export default withLoading;
