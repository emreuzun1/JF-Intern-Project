import React, {FC} from 'react';
import {VirtualizedList, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {Colors} from '../../constants/Colors';
import {SubmissionTitleCard} from '../../components';

interface ITitleProps {
  questionData: any;
}

const StyledHeaderBackground = styled.View({
  backgroundColor: Colors.darkerGrey,
  width: '100%',
});

const Titles: FC<ITitleProps> = ({questionData}) => {
  return (
    <StyledHeaderBackground>
      <VirtualizedList
        keyExtractor={(item: any, index: any) => {
          return `${index}_${item.text}`;
        }}
        contentContainerStyle={styles.headerContainer}
        initialNumToRender={4}
        data={questionData}
        getItem={(data: any, index: number) => ({
          question: data[index],
          index: index,
        })}
        getItemCount={data => data.length}
        renderItem={({item, index}) => (
          <SubmissionTitleCard question={item} index={index} />
        )}
      />
    </StyledHeaderBackground>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
});

export default Titles;
