import React, {FC} from 'react';
import {VirtualizedList} from 'react-native';
import style from 'styled-components/native';

import GridViewCard from '../../../components/GridViewCard';
import {Colors} from '../../../constants/Colors';
import {ColorInterface} from '../../../Interfaces/ColorInterface';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {SubmissionInterface} from '../../../Interfaces/SubmissionInterface';
import {SubmissionPageProps} from '../../../Interfaces/SubmissionPageProps';

const StyledContainer = style.View({
  flex: 1,
  backgroundColor: Colors.jotformGrey,
});

interface Props {
  props: SubmissionPageProps;
  visibleQuestions: QuestionInterface[];
  orderedQuestions: QuestionInterface[];
  submissions: SubmissionInterface[];
  color: ColorInterface;
}

const GridView: FC<Props> = ({orderedQuestions, submissions}) => {
  return (
    <StyledContainer>
      <VirtualizedList
        data={submissions}
        initialNumToRender={4}
        getItem={(data: any, index: number) => ({
          item: data[index],
        })}
        getItemCount={data => data.length}
        keyExtractor={item => item.item.id}
        renderItem={({item}) => {
          return (
            <GridViewCard submission={item.item} questions={orderedQuestions} />
          );
        }}
      />
    </StyledContainer>
  );
};

export default GridView;
