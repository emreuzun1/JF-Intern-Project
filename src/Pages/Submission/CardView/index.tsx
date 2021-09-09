import React, {FC} from 'react';
import {RefreshControl, VirtualizedList} from 'react-native';
import style from 'styled-components/native';

import {CardViewCard} from '../../../components';
import {Colors} from '../../../constants/Colors';
import {QuestionInterface} from '../../../Interfaces/QuestionInterface';
import {SubmissionInterface} from '../../../Interfaces/SubmissionInterface';
import {SubmissionPageProps} from '../../../Interfaces/SubmissionPageProps';

const StyledContainer = style.View({
  flex: 1,
  backgroundColor: Colors.black,
});

interface Props {
  props: SubmissionPageProps;
  visibleQuestions: QuestionInterface[];
  orderedQuestions: QuestionInterface[];
  submissions: SubmissionInterface[];
  sheetRef: any;
  refreshing: boolean;
  selectSubmission: (id: string, answer: any) => void;
  onRefresh: () => void;
}

const CardView: FC<Props> = ({
  visibleQuestions,
  submissions,
  sheetRef,
  refreshing,
  selectSubmission,
  onRefresh,
}) => {
  return (
    <StyledContainer>
      <VirtualizedList
        data={submissions}
        initialNumToRender={4}
        getItem={(data: any, index: number) => ({
          item: data[index],
        })}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        getItemCount={data => data.length}
        keyExtractor={item => item.item.id}
        renderItem={({item}) => {
          return (
            <CardViewCard
              submission={item.item}
              questions={visibleQuestions}
              sheetRef={sheetRef}
              selectSubmission={selectSubmission}
            />
          );
        }}
      />
    </StyledContainer>
  );
};

export default CardView;
